import React, { useMemo, useState } from "react";
import { useApp } from "../store";
import {
  StatusBar,
  TopBar,
  TabBar,
  TalkFab,
  StatusPill,
  Button,
} from "../components/ui";
import { IconChevron, IconSearch } from "../components/icons";
import {
  PROXY_DELEGATES,
  PROXY_TEAMS,
  PROXY_QUOTES,
} from "../data";

/* ------------------------------ Change proxy ------------------------------ */
export function ProxyChoose() {
  const { back, nav } = useApp();
  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <TopBar title="Change proxy" onBack={back} />
      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pb-6">
        <p className="mt-4 text-[13px] text-mute leading-snug">
          Act on someone else’s behalf. Choose how you want to proxy:
        </p>

        <ChooseCard
          title="Colleague"
          desc="Act as a colleague from your reporting hierarchy (e.g. someone who’s out of office)."
          onClick={() => nav("proxyDelegate")}
        />
        <ChooseCard
          title="Account team"
          desc="Act for a specific customer account you’re assigned to as part of the account team."
          onClick={() => nav("proxyTeam")}
        />

        <div className="mt-4 rounded-2xl bg-soft p-4">
          <p className="text-[12.5px] text-mute leading-snug">
            While proxying you’ll see and act on their quotes with a persistent
            “Acting as…” banner. Same view and edit actions as your own.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChooseCard({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="mt-4 w-full rounded-2xl border border-hair p-4 flex items-start gap-3 text-left active:bg-soft"
    >
      <div className="flex-1">
        <div className="text-[16px] font-bold text-ink">{title}</div>
        <div className="text-[12.5px] text-mute mt-1 leading-snug">{desc}</div>
      </div>
      <IconChevron size={18} className="text-mute mt-1 shrink-0" />
    </button>
  );
}

/* --------------------------- Search input (shared) ------------------------ */
function ProxySearch({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="mt-4 h-12 px-4 flex items-center gap-2.5 rounded-xl bg-soft">
      <IconSearch size={18} className="text-mute shrink-0" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[14px] text-ink placeholder:text-mute outline-none"
      />
    </div>
  );
}

function Radio({ selected }: { selected: boolean }) {
  return (
    <span
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
        selected ? "border-ink" : "border-hair"
      }`}
    >
      {selected && <span className="w-2.5 h-2.5 rounded-full bg-ink" />}
    </span>
  );
}

/* ----------------------------- Select colleague --------------------------- */
export function ProxyDelegate() {
  const { back, setActing, nav } = useApp();
  const [query, setQuery] = useState("");
  const [pick, setPick] = useState(PROXY_DELEGATES[0].name);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROXY_DELEGATES;
    return PROXY_DELEGATES.filter((d) =>
      [d.name, d.userId, d.email].some((f) => f.toLowerCase().includes(q))
    );
  }, [query]);

  const start = () => {
    setActing(pick, "colleague");
    nav("proxyActing");
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <TopBar title="Select colleague" onBack={back} />
      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pb-4">
        <p className="mt-4 text-[13px] text-mute">Users you can be proxy for.</p>
        <ProxySearch value={query} onChange={setQuery} placeholder="Search" />

        <div className="mt-4 space-y-3">
          {results.map((d) => {
            const selected = pick === d.name;
            return (
              <button
                key={d.name}
                onClick={() => setPick(d.name)}
                className={`w-full text-left rounded-2xl border p-4 flex items-start gap-3 active:bg-soft ${
                  selected ? "border-ink" : "border-hair"
                }`}
              >
                <div className="flex-1">
                  <div className="text-[10px] font-semibold tracking-wide text-mute">
                    CONTACT
                  </div>
                  <div className="text-[16px] font-bold text-ink">{d.name}</div>
                  <div className="mt-2 grid grid-cols-2 gap-y-2">
                    <Cell label="CISCO.COM USER ID" value={d.userId} />
                    <Cell label="CC ON EMAILS" value={d.cc ? "Yes" : "No"} />
                    <Cell label="E-MAIL ID" value={d.email} />
                  </div>
                </div>
                <Radio selected={selected} />
              </button>
            );
          })}
          {results.length === 0 && (
            <p className="text-[13px] text-mute text-center py-8">
              No colleagues match “{query}”.
            </p>
          )}
        </div>
      </div>

      <div className="px-[22px] pb-6 pt-2 border-t border-hair">
        <Button className="w-full" disabled={!pick} onClick={start}>
          Start acting as {pick.split(" ")[0]}
        </Button>
      </div>
    </div>
  );
}

/* --------------------------- Select account team -------------------------- */
export function ProxyTeam() {
  const { back, setActing, nav } = useApp();
  const [query, setQuery] = useState("");
  const [pick, setPick] = useState(PROXY_TEAMS[0].name);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROXY_TEAMS;
    return PROXY_TEAMS.filter((t) => t.name.toLowerCase().includes(q));
  }, [query]);

  const start = () => {
    setActing(pick, "team");
    nav("proxyActing");
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <TopBar title="Select account team" onBack={back} />
      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pb-4">
        <p className="mt-4 text-[13px] text-mute">
          Account teams you can act for.
        </p>
        <ProxySearch value={query} onChange={setQuery} placeholder="Search" />

        <div className="mt-4 rounded-2xl border border-hair divide-y divide-hair overflow-hidden">
          {results.map((t) => {
            const selected = pick === t.name;
            return (
              <button
                key={t.name}
                onClick={() => setPick(t.name)}
                className="w-full p-4 flex items-center gap-3 text-left active:bg-soft"
              >
                <div className="flex-1">
                  <div className="text-[15px] font-bold text-ink">{t.name}</div>
                  <div className="text-[12.5px] text-mute mt-0.5">
                    {t.openQuotes} open quotes
                  </div>
                </div>
                <Radio selected={selected} />
              </button>
            );
          })}
          {results.length === 0 && (
            <p className="text-[13px] text-mute text-center py-8">
              No teams match “{query}”.
            </p>
          )}
        </div>
      </div>

      <div className="px-[22px] pb-6 pt-2 border-t border-hair">
        <Button className="w-full" disabled={!pick} onClick={start}>
          Act as {pick}
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------- Acting as ------------------------------- */
export function ProxyActing() {
  const { state, setActing, reset, nav } = useApp();
  const isTeam = state.actingKind === "team";
  const who = state.actingAs ?? (isTeam ? "Account Team A" : "David Okafor");
  const label = isTeam ? who : `${who.split(" ")[0]}’s quotes`;

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-[22px] py-3 bg-soft border-b border-hair flex items-center justify-between">
        <div>
          <div className="text-[10.5px] font-semibold tracking-wide text-mute">
            ACTING FOR
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
          {label}
        </h1>
        <p className="text-[13px] text-mute">
          Acting for {who} · quotes that need action
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
