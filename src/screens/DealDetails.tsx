import React from "react";
import { useApp } from "../store";
import { StatusBar, TopBar, StatusPill, Button } from "../components/ui";
import { IconChevron } from "../components/icons";
import { QUOTES, fmtMoney } from "../data";
import { isColor } from "../theme";

export default function DealDetails() {
  const { current, nav, back, openModal } = useApp();
  const dealId = current.params?.dealId ?? "96043504";
  const q = QUOTES.find((d) => d.dealId === dealId) ?? QUOTES[0];

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <TopBar title="Quote details" onBack={back} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pb-4">
        <div className="mt-5 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-semibold tracking-wide text-mute">
              DEAL ID
            </div>
            <div className="text-[30px] font-extrabold text-ink leading-tight">
              {q.dealId}
            </div>
          </div>
          <div className="mt-2">
            <StatusPill
              status={q.status === "Approval in progress" ? "Needs Approval" : q.status}
            />
          </div>
        </div>

        <div className="mt-5 text-[11px] font-semibold tracking-wide text-mute">
          QUOTE DETAILS
        </div>
        <div className="mt-2 rounded-2xl border border-hair p-4 grid grid-cols-2 gap-y-4 gap-x-3">
          <Field label="QUOTE NUMBER" value={q.quoteId} />
          <Field label="DISCOUNT TYPE" value={q.discountType} />
          <Field label="EXPIRY DATE" value={q.expiry} />
          <Field label="PRICE LIST" value={q.priceList} />
          <Field label="END CUSTOMER" value={q.customer} />
          <Field label="US FED GOV QUOTE" value={q.usFedGov ? "Yes" : "No"} />
        </div>

        <div className="mt-5 text-[11px] font-semibold tracking-wide text-mute">
          BILL OF MATERIALS
        </div>
        <button
          onClick={() => nav("bom", { dealId: q.dealId })}
          className="mt-2 w-full rounded-2xl border border-hair p-4 flex items-center gap-3 text-left active:bg-soft"
        >
          <div className="flex-1">
            <div className="text-[16px] font-bold text-ink">Bill of materials</div>
            <div className="text-[13px] text-mute">
              {q.totalLines} lines · {fmtMoney(q.netTotal)} net
            </div>
            <div className="text-[13px] text-mute">{q.avgDiscountPct}% Discount</div>
          </div>
          <span
            className={`text-[14px] font-semibold flex items-center gap-1 ${
              isColor ? "text-primary" : "text-ink"
            }`}
          >
            Review &amp; edit <IconChevron size={16} />
          </span>
        </button>
      </div>

      <div className="px-[22px] pb-6 pt-2 grid grid-cols-2 gap-3">
        <Button
          variant={isColor ? "danger" : "secondary"}
          onClick={() => openModal("disapproveConfirm", { dealId: q.dealId })}
        >
          Disapprove
        </Button>
        <Button
          variant="primary"
          onClick={() => openModal("approveConfirm", { dealId: q.dealId })}
        >
          Approve
        </Button>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10.5px] font-semibold tracking-wide text-mute">
        {label}
      </div>
      <div className="text-[14px] font-bold text-ink mt-0.5">{value}</div>
    </div>
  );
}
