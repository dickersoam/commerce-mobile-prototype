import React, { useState } from "react";
import { useApp } from "../store";
import { StatusBar, TopBar, TalkFab, Button, Chip } from "../components/ui";
import { IconChevron, IconSearch, IconMic } from "../components/icons";
import { Category, BomLine, fmtMoney } from "../data";

const CAT_LABEL: Record<Category, string> = {
  Products: "PRODUCTS · HARDWARE & SOFTWARE",
  Services: "SERVICES",
  Subscriptions: "SUBSCRIPTIONS",
};

export default function Bom() {
  const { activeQuote, state, nav, back, openModal, setVoice } = useApp();
  const q = activeQuote;
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [search, setSearch] = useState("");

  const hasEdits =
    Object.keys(state.lineEdits).length > 0 ||
    Object.keys(state.categoryEdits).length > 0;

  const cats: Category[] = ["Products", "Services", "Subscriptions"];
  const shownCats = filter === "All" ? cats : [filter];

  const searchLc = search.trim().toLowerCase();
  const linesFor = (c: Category) =>
    q.bom
      .filter((l) => l.category === c)
      .filter(
        (l) =>
          !searchLc ||
          l.name.toLowerCase().includes(searchLc) ||
          l.sku.toLowerCase().includes(searchLc)
      );

  const chipCount = (c: Category) =>
    q.categories.find((x) => x.category === c)?.lines ?? 0;

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <TopBar
        title="Bill of materials"
        onBack={back}
        info
        onInfo={() => openModal("quoteDetails")}
      />

      {/* sticky search + chips */}
      <div className="px-[22px] pt-3 pb-2 bg-white">
        <div className="h-13 py-1">
          <div className="h-14 px-4 flex items-center gap-3 rounded-2xl border border-ink/80 bg-white">
            <IconSearch size={20} className="text-mute shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Deal ID, quote, SKU, customer…"
              className="flex-1 bg-transparent outline-none text-[15px] text-ink placeholder:text-mute"
            />
            <button onClick={() => setVoice(true)} className="text-ink shrink-0">
              <IconMic size={20} />
            </button>
          </div>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          <Chip
            label={`All ${q.totalLines}`}
            active={filter === "All"}
            onClick={() => setFilter("All")}
          />
          {cats.map((c) => (
            <Chip
              key={c}
              label={`${c} ${chipCount(c)}`}
              active={filter === c}
              onClick={() => setFilter(c)}
            />
          ))}
        </div>
      </div>

      <div className="px-[22px] pt-2 pb-1 text-[11px] font-semibold tracking-wide text-mute">
        BILL OF MATERIALS
      </div>

      {/* list */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[168px]">
        {shownCats.map((c) => {
          const sum = q.categories.find((x) => x.category === c);
          const lines = linesFor(c);
          if (lines.length === 0) return null;
          return (
            <div key={c}>
              <button
                onClick={() => openModal("categoryDiscount", { category: c })}
                className="w-full sticky top-0 bg-soft/95 backdrop-blur px-[22px] py-2.5 flex items-center justify-between border-y border-hair"
              >
                <span className="text-[11.5px] font-bold tracking-wide text-ink">
                  {CAT_LABEL[c]}
                </span>
                <span className="text-[11px] text-mute flex items-center gap-2">
                  {sum ? `${sum.lines} · ${fmtMoney(sum.netExt)}` : ""}
                  <span className="text-ink font-semibold flex items-center">
                    Edit % <IconChevron size={13} />
                  </span>
                </span>
              </button>
              {lines.map((l) => (
                <LineRow
                  key={l.id}
                  line={l}
                  edit={state.lineEdits[l.id]}
                  onClick={() => nav("lineDiscount", { lineId: l.id })}
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div className="absolute left-0 right-0 bottom-0 bg-white border-t border-hair px-[22px] pt-3 pb-6 grid grid-cols-2 gap-3 z-20">
        <Button variant="secondary" onClick={back}>
          Cancel
        </Button>
        <Button disabled={!hasEdits} onClick={() => nav("submit")}>
          Review
        </Button>
      </div>

      <TalkFab />
    </div>
  );
}

function LineRow({
  line,
  edit,
  onClick,
}: {
  line: BomLine;
  edit?: { discountPct: number; netExt: number };
  onClick: () => void;
}) {
  const pct = edit?.discountPct ?? line.discountPct;
  const net = edit?.netExt ?? line.netExt;
  const edited = !!edit;
  return (
    <button
      onClick={onClick}
      className={`w-full px-[22px] py-3 flex items-start gap-3 text-left border-b border-hair ${
        edited ? "bg-edit" : "active:bg-soft"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[15px] font-bold text-ink truncate">
            {line.name}
          </span>
          <IconChevron size={14} className="text-mute shrink-0" />
        </div>
        <div className="text-[12px] text-mute mt-0.5 truncate">
          {line.sku} · Qty {line.qty}
          {line.desc ? ` · ${line.desc}` : ""}
        </div>
        {edited && (
          <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-ink text-white text-[10.5px] font-semibold">
            ✎ Edited
          </span>
        )}
      </div>
      <div className="text-right shrink-0">
        <div className={`text-[15px] ${edited ? "font-extrabold" : "font-bold"} text-ink`}>
          {fmtMoney(net)}
        </div>
        <div className={`text-[12px] ${edited ? "font-bold text-ink" : "text-mute"}`}>
          {pct}% OFF
        </div>
      </div>
    </button>
  );
}
