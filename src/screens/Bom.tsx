import React, { useState } from "react";
import { useApp } from "../store";
import { StatusBar, TopBar, TalkFab, Button, Chip } from "../components/ui";
import { IconChevron, IconSearch, IconMic } from "../components/icons";
import { Category, BomLine, fmtMoney } from "../data";
import { isColor } from "../theme";

const TOP_N = 10;

export default function Bom() {
  const { activeQuote, state, nav, back, openModal, setVoice, toast } = useApp();
  const q = activeQuote;
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [search, setSearch] = useState("");

  const cats: Category[] = ["Products", "Services", "Subscriptions"];
  const chipCount = (c: Category) =>
    q.categories.find((x) => x.category === c)?.lines ?? 0;

  const searchLc = search.trim().toLowerCase();
  const searching = searchLc.length > 0;

  const base = q.bom.filter((l) => filter === "All" || l.category === filter);
  const matched = base.filter(
    (l) =>
      !searchLc ||
      l.name.toLowerCase().includes(searchLc) ||
      l.sku.toLowerCase().includes(searchLc)
  );
  // Default view surfaces only the top lines; the full BOM is reachable via search.
  const visible = searching ? matched : matched.slice(0, TOP_N);
  const hiddenCount = base.length - visible.length;

  const message = searching
    ? `${matched.length} ${matched.length === 1 ? "result" : "results"}`
    : base.length > TOP_N
    ? `Showing top ${TOP_N} of ${base.length} lines · search by SKU or product name to find the rest`
    : `${base.length} ${base.length === 1 ? "line" : "lines"}`;

  const saveBom = () => {
    toast("BOM saved");
    nav("dealDetails", { dealId: q.dealId });
  };

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
          <div
            className={`h-14 px-4 flex items-center gap-3 rounded-2xl bg-white border ${
              isColor ? "border-line" : "border-ink/80"
            }`}
          >
            <IconSearch size={20} className="text-mute shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by SKU or product name"
              className="flex-1 bg-transparent outline-none text-[15px] text-ink placeholder:text-mute"
            />
            <button
              onClick={() => setVoice(true)}
              className={`shrink-0 ${isColor ? "text-primary" : "text-ink"}`}
            >
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

      <div className="px-[22px] pt-2 pb-1">
        <div className="text-[11px] font-semibold tracking-wide text-mute">
          BILL OF MATERIALS
        </div>
        <div className="text-[12px] text-mute mt-0.5">{message}</div>
      </div>

      {/* list */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[168px]">
        {visible.map((l) => (
          <LineRow
            key={l.id}
            line={l}
            edit={state.lineEdits[l.id]}
            onClick={() => nav("lineDiscount", { lineId: l.id })}
          />
        ))}

        {visible.length === 0 && (
          <div className="px-[22px] py-14 text-center text-[14px] text-mute">
            No lines match “{search}”.
          </div>
        )}

        {!searching && hiddenCount > 0 && (
          <div className="px-[22px] py-4 text-center text-[12.5px] text-mute">
            {hiddenCount} more {hiddenCount === 1 ? "line" : "lines"} · search to
            find a specific SKU or product
          </div>
        )}
      </div>

      {/* footer */}
      <div className="absolute left-0 right-0 bottom-0 bg-white border-t border-hair px-[22px] pt-3 pb-6 grid grid-cols-2 gap-3 z-20">
        <Button variant="secondary" onClick={back}>
          Cancel
        </Button>
        <Button onClick={saveBom}>Save BOM</Button>
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
      className={`w-full px-[22px] py-3 flex items-center gap-3 text-left border-b border-hair ${
        edited ? "bg-edit" : "active:bg-soft"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-bold text-ink truncate">
          {line.name}
        </div>
        <div className="text-[12px] text-mute mt-0.5 truncate">
          {line.sku} · Qty {line.qty}
          {line.desc ? ` · ${line.desc}` : ""}
        </div>
        {edited && (
          <span
            className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${
              isColor ? "bg-primary text-white" : "bg-ink text-white"
            }`}
          >
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
      {/* Affordance: tap a line to edit its discount */}
      <IconChevron size={22} className="text-mute shrink-0 -mr-1" />
    </button>
  );
}
