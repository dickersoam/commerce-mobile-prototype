import React from "react";
import { useApp } from "../store";
import { StatusBar, TabBar, TalkFab, StatusPill } from "../components/ui";
import { IconSearch, IconMic, IconChevron, IconArrowDown } from "../components/icons";
import {
  QUOTES,
  RECENT_SEARCHES,
  RECENTLY_VIEWED,
  fmtMoneyShort,
} from "../data";
import { isColor } from "../theme";

const APPROVAL = ["Needs Approval", "Approval in progress"];

export default function Home() {
  const { nav, reset, setVoice } = useApp();

  const actionDeals = QUOTES.filter((q) =>
    ["Needs Approval", "Approval in progress", "More info required"].includes(
      q.status
    )
  );
  const topActions = actionDeals.slice(0, 2);

  const needApproval = QUOTES.filter((q) => APPROVAL.includes(q.status)).length;
  const needInfo = QUOTES.filter((q) => q.status === "More info required").length;
  const pendingValue = actionDeals.reduce((s, q) => s + q.netTotal, 0);

  const stats: { value: string; label: string; tone: "bad" | "warn" | "primary" }[] =
    [
      { value: String(needApproval), label: "Need approval", tone: "bad" },
      { value: String(needInfo), label: "Need info", tone: "warn" },
      { value: fmtMoneyShort(pendingValue), label: "Pending value", tone: "primary" },
    ];

  const statTone = (tone: "bad" | "warn" | "primary") => {
    if (!isColor) return "text-ink";
    return tone === "bad"
      ? "text-bad"
      : tone === "warn"
      ? "text-warntx"
      : "text-primary";
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pb-[110px]">
        <h1 className="text-[28px] font-extrabold text-ink mt-3 tracking-tight leading-tight">
          Welcome back
        </h1>
        <p className="text-[14px] text-mute mt-1 mb-4">
          Here's what needs your attention today.
        </p>

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

        <div className="mt-5">
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

        {/* Stats strip */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-hair px-3 py-3"
            >
              <div className={`text-[22px] font-extrabold leading-none ${statTone(s.tone)}`}>
                {s.value}
              </div>
              <div className="text-[11px] text-mute mt-1.5 leading-tight">
                {s.label}
              </div>
            </div>
          ))}
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
          {topActions.map((d) => (
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

        <button
          onClick={() => reset("quotes")}
          className={`mt-3 text-[13px] font-semibold flex items-center gap-1 ${
            isColor ? "text-primary" : "text-ink"
          }`}
        >
          View all deals ({QUOTES.length}) <IconChevron size={15} />
        </button>

        {/* Recently viewed */}
        <div className="mt-7 text-[11px] font-semibold tracking-wide text-mute">
          RECENTLY VIEWED
        </div>
        <div className="mt-2 divide-y divide-hair">
          {RECENTLY_VIEWED.map((r) => {
            const q = QUOTES.find((x) => x.dealId === r.dealId);
            if (!q) return null;
            return (
              <button
                key={r.dealId + r.when}
                onClick={() => nav("dealDetails", { dealId: q.dealId })}
                className="w-full py-3 flex items-center gap-3 text-left active:bg-soft"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-ink">
                    Deal {q.dealId}
                  </div>
                  <div className="text-[12px] text-mute truncate">
                    {q.customer} · {q.status}
                  </div>
                </div>
                <span className="text-[12px] text-mute shrink-0">{r.when}</span>
                <IconChevron size={16} className="text-mute shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      <TalkFab />
      <TabBar active="home" />
    </div>
  );
}
