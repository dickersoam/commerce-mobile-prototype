import React from "react";
import { useApp } from "../store";
import { StatusBar, TabBar, TalkFab, StatusPill } from "../components/ui";
import { IconSearch, IconMic, IconChevron, IconArrowDown } from "../components/icons";
import { QUOTES, RECENT_SEARCHES } from "../data";
import { isColor } from "../theme";

export default function Home() {
  const { nav, setVoice } = useApp();
  const actionDeals = QUOTES.filter((q) =>
    ["Needs Approval", "Approval in progress", "More info required"].includes(
      q.status
    )
  ).slice(0, 2);

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pb-[110px]">
        <h1 className="text-[30px] font-extrabold text-ink mt-3 mb-4 tracking-tight">
          Find a deal
        </h1>

        <button
          onClick={() => nav("searchResults")}
          className={`w-full h-14 px-4 flex items-center gap-3 rounded-2xl bg-white text-left border ${
            isColor ? "border-line" : "border-ink/80"
          }`}
        >
          <IconSearch size={20} className="text-mute" />
          <span className="flex-1 text-[15px] text-mute truncate">
            Search by Deal ID, quote, SKU, customer…
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              setVoice(true);
            }}
            className={isColor ? "text-primary" : "text-ink"}
          >
            <IconMic size={20} />
          </span>
        </button>

        <div className="mt-6">
          <div className="text-[11px] font-semibold tracking-wide text-mute mb-2.5">
            RECENT SEARCHES
          </div>
          <div className="flex gap-2 flex-wrap">
            {RECENT_SEARCHES.map((r) => (
              <button
                key={r}
                onClick={() => nav("searchResults", { q: r })}
                className="px-3.5 py-1.5 rounded-full border border-hair text-[13px] font-semibold text-ink active:bg-soft"
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <div className="text-[11px] font-semibold tracking-wide text-mute">
            NEEDS YOUR ACTION
          </div>
          <button className="px-3 py-1.5 rounded-full border border-hair text-[12px] font-medium text-ink flex items-center gap-1">
            Sort · Expiry <IconArrowDown size={13} />
          </button>
        </div>

        <div className="mt-3 divide-y divide-hair border-b border-hair">
          {actionDeals.map((d) => (
            <button
              key={d.dealId}
              onClick={() => nav("dealDetails", { dealId: d.dealId })}
              className="w-full py-3.5 flex items-center gap-3 text-left active:bg-soft"
            >
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-bold text-ink">
                  Deal {d.dealId}
                </div>
                <div className="text-[13px] text-mute truncate">
                  {d.customer} · Exp {d.expiry}
                </div>
              </div>
              <StatusPill
                status={d.status === "Approval in progress" ? "Needs Approval" : d.status}
              />
              <IconChevron size={18} className="text-mute" />
            </button>
          ))}
        </div>
      </div>

      <TalkFab />
      <TabBar active="home" />
    </div>
  );
}
