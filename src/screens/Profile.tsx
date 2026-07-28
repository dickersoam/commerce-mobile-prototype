import React from "react";
import { useApp } from "../store";
import { StatusBar, TabBar, TalkFab } from "../components/ui";
import { IconChevron } from "../components/icons";
import { USER } from "../data";

export default function Profile() {
  const { nav, state, toast } = useApp();
  const proxyValue = state.actingAs
    ? `Acting as ${state.actingAs}`
    : "Acting as yourself";

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-1">
        <h1 className="text-[24px] font-extrabold text-ink tracking-tight">
          Profile
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pb-[110px]">
        <div className="mt-3 rounded-2xl bg-soft p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center text-[18px] font-bold">
            {USER.initials}
          </div>
          <div>
            <div className="text-[18px] font-bold text-ink">{USER.name}</div>
            <div className="text-[13px] text-mute">{USER.role}</div>
          </div>
        </div>

        <Group label="PROXY">
          <Item
            title="Change proxy"
            sub={proxyValue}
            onClick={() => nav("proxyChoose")}
          />
        </Group>

        <Group label="PREFERENCES">
          <Item
            title="Notification preferences"
            sub="Alerts by trigger & frequency"
            onClick={() => toast("Notification preferences")}
          />
          <Item
            title="Language & region"
            sub="English · United States"
            onClick={() => toast("Language & region")}
          />
        </Group>

        <Group label="SUPPORT">
          <Item title="Help & feedback" onClick={() => toast("Help & feedback")} />
          <Item title="Sign out" onClick={() => toast("Signed out")} />
        </Group>
      </div>

      <TalkFab />
      <TabBar active="profile" />
    </div>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="text-[11px] font-semibold tracking-wide text-mute mb-2">
        {label}
      </div>
      <div className="rounded-2xl border border-hair divide-y divide-hair overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function Item({
  title,
  sub,
  onClick,
}: {
  title: string;
  sub?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3.5 flex items-center gap-3 text-left active:bg-soft"
    >
      <div className="flex-1">
        <div className="text-[15px] font-semibold text-ink">{title}</div>
        {sub && <div className="text-[12.5px] text-mute mt-0.5">{sub}</div>}
      </div>
      <IconChevron size={18} className="text-mute" />
    </button>
  );
}
