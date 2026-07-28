import React, { useState } from "react";
import { useApp } from "../store";
import { StatusBar, TabBar, TalkFab, Chip } from "../components/ui";
import { NOTIFICATIONS, AppNotification } from "../data";
import { isColor } from "../theme";

const FILTERS = ["All", "Approvals", "Proxy", "Status", "Discounts"] as const;
type Filter = (typeof FILTERS)[number];
const typeFor: Record<Exclude<Filter, "All">, AppNotification["type"]> = {
  Approvals: "approval",
  Proxy: "proxy",
  Status: "status",
  Discounts: "discount",
};

export default function Notifications() {
  const { markAllRead, state } = useApp();
  const [filter, setFilter] = useState<Filter>("All");

  const list = NOTIFICATIONS.filter(
    (n) => filter === "All" || n.type === typeFor[filter]
  );
  const today = list.filter((n) => n.bucket === "TODAY");
  const earlier = list.filter((n) => n.bucket === "EARLIER");
  const allRead = state.readIds.length > 0;

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-[22px] pt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-extrabold text-ink tracking-tight">
            Notifications
          </h1>
          <button
            onClick={markAllRead}
            className={`text-[13px] font-semibold active:opacity-60 ${
              isColor ? "text-primary" : "text-ink"
            }`}
          >
            Mark all read
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
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-[110px] mt-2">
        {today.length > 0 && <SectionLabel>TODAY</SectionLabel>}
        {today.map((n) => (
          <NotifRow key={n.id} n={n} read={allRead} />
        ))}
        {earlier.length > 0 && <SectionLabel>EARLIER</SectionLabel>}
        {earlier.map((n) => (
          <NotifRow key={n.id} n={n} read={allRead} />
        ))}
      </div>

      <TalkFab />
      <TabBar active="notifications" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-[22px] py-2 text-[11px] font-semibold tracking-wide text-mute border-b border-hair bg-white">
      {children}
    </div>
  );
}

function NotifRow({ n, read }: { n: AppNotification; read: boolean }) {
  const unread = n.unread && !read;
  return (
    <div
      className={`px-[22px] py-3.5 flex gap-3 border-b border-hair ${
        unread ? "bg-soft" : ""
      }`}
    >
      <div className="w-9 h-9 rounded-lg bg-soft border border-hair flex items-center justify-center text-[16px] font-bold text-ink shrink-0">
        {n.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold text-ink">{n.title}</div>
        <div className="text-[13px] text-mute leading-snug">{n.body}</div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {unread && <span className="w-2 h-2 rounded-full bg-ink" />}
        <span className="text-[12px] text-mute">{n.when}</span>
      </div>
    </div>
  );
}
