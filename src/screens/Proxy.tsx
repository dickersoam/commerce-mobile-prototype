import React from "react";
import { useApp } from "../store";
import { StatusBar, TopBar, TabBar, TalkFab, StatusPill } from "../components/ui";
import { IconChevron, IconCheck } from "../components/icons";
import { PROXY_DELEGATES, PROXY_QUOTES } from "../data";

export function ProxyChoose() {
  const { back, state, setActing, nav } = useApp();
  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <TopBar title="Change proxy" onBack={back} />
      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pb-6">
        <p className="mt-4 text-[13px] text-mute">
          Act on behalf of a colleague. You’ll have the same actions as in your own
          workspace.
        </p>

        <button
          onClick={() => {
            setActing(null);
            back();
          }}
          className="mt-4 w-full rounded-2xl border border-hair p-4 flex items-center gap-3 text-left active:bg-soft"
        >
          <div className="w-11 h-11 rounded-full bg-soft flex items-center justify-center text-[14px] font-bold text-ink">
            You
          </div>
          <div className="flex-1">
            <div className="text-[15px] font-semibold text-ink">Yourself</div>
            <div className="text-[12.5px] text-mute">Maria Smith · your workspace</div>
          </div>
          {!state.actingAs && <IconCheck size={20} className="text-ink" />}
        </button>

        <div className="mt-5 text-[11px] font-semibold tracking-wide text-mute mb-2">
          DELEGATES
        </div>
        <div className="rounded-2xl border border-hair divide-y divide-hair overflow-hidden">
          {PROXY_DELEGATES.map((d) => (
            <button
              key={d.name}
              onClick={() => {
                setActing(d.name);
                nav("proxyActing");
              }}
              className="w-full p-4 flex items-center gap-3 text-left active:bg-soft"
            >
              <div className="w-11 h-11 rounded-full bg-ink text-white flex items-center justify-center text-[14px] font-bold">
                {d.initials}
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-semibold text-ink">{d.name}</div>
                <div className="text-[12.5px] text-mute">{d.role}</div>
              </div>
              {state.actingAs === d.name ? (
                <IconCheck size={20} className="text-ink" />
              ) : (
                <IconChevron size={18} className="text-mute" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProxyActing() {
  const { state, setActing, reset, nav } = useApp();
  const who = state.actingAs ?? "David Okafor";
  const firstName = who.split(" ")[0];
  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-[22px] py-3 bg-soft border-b border-hair flex items-center justify-between">
        <div>
          <div className="text-[10.5px] font-semibold tracking-wide text-mute">
            ACTING AS
          </div>
          <div className="text-[15px] font-bold text-ink">{who}</div>
        </div>
        <button
          onClick={() => {
            setActing(null);
            reset("profile");
          }}
          className="text-[14px] font-semibold text-ink active:opacity-60"
        >
          Switch back
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pb-[110px]">
        <h1 className="text-[24px] font-extrabold text-ink mt-4 tracking-tight">
          Colleague quotes
        </h1>
        <p className="text-[13px] text-mute">
          Viewing {firstName}’s workspace · same actions as your own
        </p>

        <div className="mt-5 text-[11px] font-semibold tracking-wide text-mute mb-2">
          NEEDS ACTION
        </div>
        <div className="space-y-3">
          {PROXY_QUOTES.map((q) => (
            <button
              key={q.dealId}
              onClick={() => nav("dealDetails", { dealId: "96043504" })}
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
                <StatusPill status={q.status} upper />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-y-3">
                <Cell label="QUOTE ID" value={q.quoteId} />
                <Cell label="EXPIRY DATE" value={q.expiry} />
                <Cell label="DISCOUNT TYPE" value={q.discountType} />
                <Cell label="END CUSTOMER" value={q.customer} />
              </div>
            </button>
          ))}
        </div>
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
