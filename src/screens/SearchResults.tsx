import React, { useState } from "react";
import { useApp } from "../store";
import { StatusBar, TabBar, TalkFab, StatusPill, SearchField } from "../components/ui";
import { IconChevron } from "../components/icons";
import { QUOTES } from "../data";

export default function SearchResults() {
  const { current, nav, setVoice } = useApp();
  const [q, setQ] = useState<string>(current.params?.q ?? "96043504");

  const query = q.trim().toLowerCase();
  // Home search matches on Deal ID and Quote ID only.
  const matches = QUOTES.filter(
    (item) =>
      !query ||
      item.dealId.toLowerCase().includes(query) ||
      item.quoteId.toLowerCase().includes(query)
  );
  const deals = matches;
  const quotes = matches;

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pb-[110px]">
        <h1 className="text-[30px] font-extrabold text-ink mt-3 mb-4 tracking-tight">
          Find a deal
        </h1>
        <SearchField
          value={q}
          onChange={setQ}
          onMic={() => setVoice(true)}
          placeholder="Search by Deal ID or Quote ID"
        />

        <div className="mt-4 text-[13px] font-semibold text-mute">
          {matches.length} {matches.length === 1 ? "Result" : "Results"}
        </div>

        {deals.length > 0 && (
          <>
            <div className="mt-4 text-[11px] font-semibold tracking-wide text-mute">
              DEALS · {deals.length}
            </div>
            <div className="mt-1 divide-y divide-hair border-b border-hair">
              {deals.map((d) => (
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
                    status={
                      d.status === "Approval in progress"
                        ? "Needs Approval"
                        : d.status
                    }
                  />
                  <IconChevron size={18} className="text-mute" />
                </button>
              ))}
            </div>
          </>
        )}

        {quotes.length > 0 && (
          <>
            <div className="mt-5 text-[11px] font-semibold tracking-wide text-mute">
              QUOTES · {quotes.length}
            </div>
            <div className="mt-1 divide-y divide-hair border-b border-hair">
              {quotes.map((d) => (
                <button
                  key={d.quoteId}
                  onClick={() => nav("dealDetails", { dealId: d.dealId })}
                  className="w-full py-3.5 flex items-center gap-3 text-left active:bg-soft"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-bold text-ink">
                      Quote {d.quoteId}
                    </div>
                    <div className="text-[13px] text-mute truncate">
                      Deal <span className="font-semibold text-ink">{d.dealId}</span>{" "}
                      · {d.discountType}
                    </div>
                  </div>
                  <IconChevron size={18} className="text-mute" />
                </button>
              ))}
            </div>
          </>
        )}

        {matches.length === 0 && (
          <div className="mt-16 text-center text-[14px] text-mute">
            No deals match “{q}”.
          </div>
        )}
      </div>

      <TalkFab />
      <TabBar active="home" />
    </div>
  );
}
