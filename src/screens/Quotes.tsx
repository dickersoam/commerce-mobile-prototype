import React, { useState } from "react";
import { useApp } from "../store";
import { StatusBar, TabBar, TalkFab, StatusPill, Chip } from "../components/ui";
import { IconSearch, IconSliders, IconArrowDown } from "../components/icons";
import { QUOTES, DealStatus } from "../data";
import { isColor } from "../theme";

const FILTERS = ["All", "Needs action", "Approved", "Disapproved", "Drafts"] as const;
type Filter = (typeof FILTERS)[number];

const needsAction: DealStatus[] = [
  "Needs Approval",
  "Approval in progress",
  "More info required",
  "Not submitted",
];

export default function Quotes() {
  const { nav, openModal, setVoice } = useApp();
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");

  const list = QUOTES.filter((q) => {
    if (filter === "Needs action") return needsAction.includes(q.status);
    if (filter === "Approved") return q.status === "Approved";
    if (filter === "Disapproved") return q.status === "Disapproved";
    if (filter === "Drafts") return q.status === "Draft";
    return true;
  }).filter((q) => {
    const s = search.trim().toLowerCase();
    return (
      !s ||
      q.dealId.toLowerCase().includes(s) ||
      q.quoteId.toLowerCase().includes(s) ||
      q.customer.toLowerCase().includes(s)
    );
  });

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-[22px] pt-2">
        <h1 className="text-[26px] font-extrabold text-ink tracking-tight">
          Quotes
        </h1>
        <div className="mt-3 flex gap-2.5">
          <div className="flex-1 h-11 px-3.5 flex items-center gap-2.5 rounded-xl bg-soft">
            <IconSearch size={18} className="text-mute" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Deal ID, quote, SKU,…"
              className="flex-1 bg-transparent outline-none text-[14px] text-ink placeholder:text-mute"
            />
          </div>
          <button
            onClick={() => openModal("filter")}
            className={`h-11 px-4 rounded-xl text-white text-[14px] font-semibold flex items-center gap-2 ${
              isColor ? "bg-primary" : "bg-ink"
            }`}
          >
            <IconSliders size={16} className="text-white" /> Filters
          </button>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              tone="neutral"
              active={filter === f}
              onClick={() => setFilter(f)}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[13px] text-mute">
            Showing {list.length} {list.length === 1 ? "quote" : "quotes"}
          </span>
          <button
            onClick={() => openModal("sort")}
            className="px-3 py-1.5 rounded-full border border-hair text-[12px] font-medium text-ink flex items-center gap-1"
          >
            Sort · Expiry <IconArrowDown size={13} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pt-3 pb-[110px] space-y-3">
        {list.map((q) => (
          <button
            key={q.dealId}
            onClick={() => nav("dealDetails", { dealId: q.dealId })}
            className="w-full text-left rounded-2xl border border-hair p-4 shadow-card active:bg-soft"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10.5px] font-semibold tracking-wide text-mute">
                  DEAL ID
                </div>
                <div className="text-[22px] font-extrabold text-ink leading-tight">
                  {q.dealId}
                </div>
              </div>
              <StatusPill status={q.status} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-y-3">
              <Cell label="QUOTE ID" value={q.quoteId} />
              <Cell label="EXPIRY DATE" value={q.expiry} />
              <Cell label="DISCOUNT TYPE" value={q.discountType} />
              <Cell label="END CUSTOMER" value={q.customer} />
            </div>
          </button>
        ))}
        {list.length === 0 && (
          <div className="text-center text-[14px] text-mute mt-16">
            No quotes in this view.
          </div>
        )}
      </div>

      <TalkFab />
      <TabBar active="quotes" />
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold tracking-wide text-mute">
        {label}
      </div>
      <div className="text-[14px] font-bold text-ink mt-0.5">{value}</div>
    </div>
  );
}
