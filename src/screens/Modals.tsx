import React, { useState } from "react";
import { useApp } from "../store";
import { Sheet, Button } from "../components/ui";
import { IconClose, IconInfo, IconCheck } from "../components/icons";
import { Category, fmtMoney, QUOTES } from "../data";

export default function Modals() {
  const { state } = useApp();
  if (state.modal === "quoteDetails") return <QuoteDetailsSheet />;
  if (state.modal === "categoryDiscount") return <CategoryDiscountSheet />;
  if (state.modal === "filter") return <FilterSheet />;
  if (state.modal === "sort") return <SortSheet />;
  if (state.modal === "approveConfirm") return <DecisionConfirmSheet kind="approve" />;
  if (state.modal === "disapproveConfirm")
    return <DecisionConfirmSheet kind="disapprove" />;
  return null;
}

/* ---------------- Quote details ---------------- */
function QuoteDetailsSheet() {
  const { activeQuote: q, closeModal } = useApp();
  return (
    <Sheet onClose={closeModal}>
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-ink">Quote details</h2>
        <button onClick={closeModal} className="text-mute p-1">
          <IconClose size={20} />
        </button>
      </div>

      <div className="mt-3 flex items-end gap-2">
        <span className="text-[32px] font-extrabold text-ink leading-none">
          {fmtMoney(q.netTotal)}
        </span>
        <span className="text-[14px] font-medium text-mute mb-0.5">net</span>
      </div>
      <div className="text-[12px] text-mute mt-1">
        Quote #{q.quoteId} · Deal {q.dealId}
      </div>

      <div className="mt-4 flex items-center">
        <Metric value={q.totalQty.toLocaleString()} label="Total qty" />
        <div className="w-px h-8 bg-hair mx-4" />
        <Metric value={`${q.avgDiscountPct}%`} label="Avg discount" />
        <div className="w-px h-8 bg-hair mx-4" />
        <Metric value={String(q.totalLines)} label="Lines" />
      </div>

      <div className="mt-4 border-t border-hair pt-4 grid grid-cols-2 gap-y-4 gap-x-3">
        <Field label="EXPIRY DATE" value={q.expiry} />
        <Field label="PRICE LIST" value={q.priceList} />
        <Field label="END CUSTOMER" value={q.customer} />
        <Field label="DISCOUNT TYPE" value={q.discountType} />
        <Field label="QUOTE NUMBER" value={q.quoteId} />
        <Field label="US FED GOV QUOTE" value={q.usFedGov ? "Yes" : "No"} />
      </div>

      <Button className="mt-5 w-full" onClick={closeModal}>
        Done
      </Button>
    </Sheet>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[18px] font-extrabold text-ink leading-tight">
        {value}
      </div>
      <div className="text-[10.5px] font-medium text-mute">{label}</div>
    </div>
  );
}
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold tracking-wide text-mute">
        {label}
      </div>
      <div className="text-[13.5px] font-semibold text-ink mt-0.5">{value}</div>
    </div>
  );
}

/* ---------------- Category discount ---------------- */
const defaultPct: Record<Category, number> = {
  Products: 15,
  Services: 10,
  Subscriptions: 12,
};

function CategoryDiscountSheet() {
  const { activeQuote: q, state, editCategory, closeModal, toast } = useApp();
  const category = (state.modalParams?.category ?? "Products") as Category;
  const sum = q.categories.find((c) => c.category === category);
  const [pct, setPct] = useState<number>(
    state.categoryEdits[category] ?? defaultPct[category]
  );
  const [overwrite, setOverwrite] = useState(false);
  const baseNet = sum?.netExt ?? 0;
  const newNet = Math.round(baseNet * (1 - pct / 100));
  const maxStd = sum?.maxStandardPct ?? 67;

  const apply = () => {
    editCategory(category, pct);
    toast(`${category} set to ${pct}% off`);
    closeModal();
  };

  return (
    <Sheet onClose={closeModal}>
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-ink">Edit category discount</h2>
        <button onClick={closeModal} className="text-mute p-1">
          <IconClose size={20} />
        </button>
      </div>

      <div className="mt-4 rounded-xl bg-soft px-4 py-3">
        <div className="text-[11.5px] font-bold tracking-wide text-ink">
          {category === "Products"
            ? "PRODUCTS · HARDWARE & SOFTWARE"
            : category.toUpperCase()}
        </div>
        <div className="text-[12px] text-mute mt-0.5">
          {sum?.lines} lines · {fmtMoney(baseNet)} net
        </div>
      </div>

      <div className="mt-5 text-[10.5px] font-semibold tracking-wide text-mute text-center">
        SET DISCOUNT FOR ALL LINES
      </div>
      <div className="mt-3 flex items-center justify-center gap-8">
        <button
          onClick={() => setPct((p) => Math.max(0, p - 1))}
          className="w-12 h-12 rounded-full border-[1.5px] border-ink flex items-center justify-center text-[24px] text-ink"
        >
          −
        </button>
        <div className="text-[44px] font-extrabold text-ink leading-none w-[120px] text-center">
          {pct}%
        </div>
        <button
          onClick={() => setPct((p) => Math.min(90, p + 1))}
          className="w-12 h-12 rounded-full border-[1.5px] border-ink flex items-center justify-center text-[24px] text-ink"
        >
          +
        </button>
      </div>

      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={90}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          className="w-full"
          style={{ accentColor: "#292A2E" }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-[13px] font-semibold text-ink">
            Overwrite line-level edits
          </div>
          <div className="text-[11px] text-mute">
            Off keeps custom line discounts
          </div>
        </div>
        <button
          onClick={() => setOverwrite((v) => !v)}
          className={`w-[46px] h-7 rounded-full p-[3px] transition ${
            overwrite ? "bg-ink" : "bg-hair"
          }`}
        >
          <span
            className={`block w-[22px] h-[22px] rounded-full bg-white transition ${
              overwrite ? "translate-x-[18px]" : ""
            }`}
          />
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-ink p-3.5 flex gap-2.5 items-start">
        <IconInfo size={17} className="text-ink shrink-0 mt-0.5" />
        <p className="text-[12.5px] text-ink leading-snug">
          Standard max for this category is {maxStd}%. Above needs approval and may
          affect OIP / TIP.
        </p>
      </div>

      <div className="mt-4 rounded-2xl bg-soft p-4 flex items-center justify-between">
        <div>
          <div className="text-[14px] font-semibold text-ink">New category net</div>
          <div className="text-[11px] text-mute">{pct}% off list</div>
        </div>
        <div className="text-[20px] font-extrabold text-ink">{fmtMoney(newNet)}</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={apply}>Apply to category</Button>
      </div>
    </Sheet>
  );
}

/* ---------------- Filter sheet (Quotes) ---------------- */
function FilterSheet() {
  const { closeModal, state, toast } = useApp();
  const options = [
    "All",
    "Needs action",
    "Approved",
    "Disapproved",
    "Drafts",
    "Not submitted",
  ];
  const [sel, setSel] = useState(state.modalParams?.value ?? "All");
  return (
    <Sheet onClose={closeModal} maxH="70%">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-ink">Filters</h2>
        <button onClick={closeModal} className="text-mute p-1">
          <IconClose size={20} />
        </button>
      </div>
      <div className="mt-3 text-[10.5px] font-semibold tracking-wide text-mute">
        STATUS
      </div>
      <div className="mt-1 divide-y divide-hair">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => setSel(o)}
            className="w-full py-3.5 flex items-center justify-between"
          >
            <span className="text-[15px] text-ink">{o}</span>
            {sel === o && <IconCheck size={20} className="text-ink" />}
          </button>
        ))}
      </div>
      <Button
        className="mt-4 w-full"
        onClick={() => {
          toast(`Filter: ${sel}`);
          closeModal();
        }}
      >
        Apply
      </Button>
    </Sheet>
  );
}

/* ---------------- Approve / Disapprove confirmation ---------------- */
function DecisionConfirmSheet({ kind }: { kind: "approve" | "disapprove" }) {
  const { state, closeModal, nav } = useApp();
  const approve = kind === "approve";
  const dealId = state.modalParams?.dealId ?? "96043504";
  const q = QUOTES.find((d) => d.dealId === dealId) ?? QUOTES[0];

  // Per-category discounts, reflecting any live edits (falls back to defaults).
  const discounts =
    q.categories.length > 0
      ? q.categories
          .map((c) => state.categoryEdits[c.category] ?? defaultPct[c.category])
          .map((p) => `${p}%`)
          .join(" / ")
      : `${q.avgDiscountPct}%`;

  const [note, setNote] = useState("");
  const [reason, setReason] = useState("");
  const canConfirm = approve || reason.trim().length > 0;

  const confirm = () => {
    if (!canConfirm) return;
    nav("decision", {
      dealId: q.dealId,
      outcome: approve ? "approved" : "disapproved",
      reason: approve ? note : reason,
    });
  };

  return (
    <Sheet onClose={closeModal} maxH={approve ? "70%" : "72%"}>
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-bold text-ink">
          {approve ? "Approve this quote?" : "Disapprove this quote?"}
        </h2>
        <button onClick={closeModal} className="text-mute p-1">
          <IconClose size={20} />
        </button>
      </div>

      <div className="mt-4 rounded-xl bg-soft px-4 py-3 divide-y divide-hair">
        <SummaryRow label="Deal ID" value={q.dealId} />
        <SummaryRow label="End customer" value={q.customer} />
        <SummaryRow label="Quote total" value={fmtMoney(q.netTotal)} />
        <SummaryRow label="Discounts" value={discounts} />
      </div>

      {approve ? (
        <>
          <p className="mt-4 text-[13px] text-mute leading-snug">
            You’re approving the current discounts ({discounts}). Your decision
            will be submitted and the requester notified.
          </p>
          <div className="mt-4">
            <label className="text-[13px] font-semibold text-ink">
              Comments (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note for the requester…"
              rows={3}
              className="mt-2 w-full rounded-xl bg-soft p-3 text-[14px] text-ink placeholder:text-mute outline-none resize-none focus:ring-1 focus:ring-ink"
            />
          </div>
        </>
      ) : (
        <>
          <div className="mt-4">
            <label className="text-[10.5px] font-semibold tracking-wide text-mute">
              REASON (REQUIRED)
            </label>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Discount exceeds policy threshold"
              className="mt-2 w-full rounded-xl bg-soft px-3.5 py-3 text-[14px] text-ink placeholder:text-mute outline-none focus:ring-1 focus:ring-ink"
            />
          </div>
          <p className="mt-3 text-[13px] text-mute leading-snug">
            Add a reason so the requester knows what to revise. Your decision
            will be submitted once confirmed.
          </p>
        </>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant={approve ? "primary" : "danger"}
          disabled={!canConfirm}
          onClick={confirm}
        >
          {approve ? "Confirm approval" : "Confirm disapproval"}
        </Button>
      </div>
    </Sheet>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-2 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
      <span className="text-[13px] text-mute shrink-0">{label}</span>
      <span className="text-[13px] font-bold text-ink text-right">{value}</span>
    </div>
  );
}

/* ---------------- Sort sheet ---------------- */
function SortSheet() {
  const { closeModal, toast } = useApp();
  const options = [
    "Expiry (soonest)",
    "Expiry (latest)",
    "Net total (high→low)",
    "Net total (low→high)",
    "Discount %",
    "Recently updated",
  ];
  const [sel, setSel] = useState("Expiry (soonest)");
  return (
    <Sheet onClose={closeModal} maxH="70%">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-ink">Sort by</h2>
        <button onClick={closeModal} className="text-mute p-1">
          <IconClose size={20} />
        </button>
      </div>
      <div className="mt-2 divide-y divide-hair">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => {
              setSel(o);
              toast(`Sorted by ${o}`);
              closeModal();
            }}
            className="w-full py-3.5 flex items-center justify-between"
          >
            <span className="text-[15px] text-ink">{o}</span>
            {sel === o && <IconCheck size={20} className="text-ink" />}
          </button>
        ))}
      </div>
    </Sheet>
  );
}
