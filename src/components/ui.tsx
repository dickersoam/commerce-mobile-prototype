import React from "react";
import { useApp, ScreenKey } from "../store";
import {
  IconHome,
  IconDoc,
  IconBell,
  IconUser,
  IconSpark,
  IconWave,
  IconBack,
  IconInfo,
  IconSearch,
  IconMic,
} from "./icons";
import { DealStatus } from "../data";
import { isColor } from "../theme";

/* ---------- Status bar ---------- */
export function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "text-white" : "text-ink";
  return (
    <div className={`h-10 px-6 flex items-center justify-between ${c}`}>
      <span className="text-[14px] font-semibold tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[12px] font-medium">5G</span>
        <div className="flex items-end gap-[3px] h-3">
          <span className={`w-[3px] h-2 ${dark ? "bg-white" : "bg-ink"}`} />
          <span className={`w-[3px] h-2.5 ${dark ? "bg-white" : "bg-ink"}`} />
          <span className={`w-[3px] h-3 ${dark ? "bg-white" : "bg-ink"}`} />
        </div>
        <div
          className={`w-6 h-3 rounded-[3px] border ${
            dark ? "border-white" : "border-ink"
          } relative`}
        >
          <div
            className={`absolute inset-[1.5px] right-1.5 rounded-[1px] ${
              dark ? "bg-white" : "bg-ink"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Top nav bar ---------- */
export function TopBar({
  title,
  subtitle,
  onBack,
  info,
  onInfo,
  dimmed = false,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  info?: boolean;
  onInfo?: () => void;
  dimmed?: boolean;
}) {
  return (
    <div className={`border-b border-hair ${dimmed ? "opacity-100" : ""}`}>
      <div className="h-[58px] px-5 flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="-ml-1 p-1 text-ink active:opacity-60">
            <IconBack size={24} />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[19px] font-bold text-ink leading-tight truncate">
            {title}
          </div>
          {subtitle && (
            <div className="text-[12px] text-mute truncate">{subtitle}</div>
          )}
        </div>
        {info && (
          <button onClick={onInfo} className="p-1 text-ink active:opacity-60">
            <IconInfo size={22} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Status pill ---------- */
const statusStyleMono: Record<DealStatus, string> = {
  "Needs Approval": "bg-ink text-white",
  "Approval in progress": "bg-ink text-white",
  "More info required": "bg-ink text-white",
  "Not submitted": "bg-soft text-ink border border-hair",
  Approved: "bg-soft text-ink border border-hair",
  Disapproved: "bg-soft text-ink border border-hair",
  Draft: "bg-soft text-ink border border-hair",
};

const statusStyleColor: Record<DealStatus, string> = {
  "Needs Approval": "bg-badbg text-badtx",
  "Approval in progress": "bg-primarybg text-primary",
  "More info required": "bg-warnbg text-warntx",
  "Not submitted": "bg-tint text-sec",
  Approved: "bg-okbg text-oktx",
  Disapproved: "bg-badbg text-badtx",
  Draft: "bg-tint text-sec",
};

const statusStyle = isColor ? statusStyleColor : statusStyleMono;

export function StatusPill({
  status,
  upper = false,
}: {
  status: DealStatus;
  upper?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap ${statusStyle[status]}`}
    >
      {upper ? status.toUpperCase() : status}
    </span>
  );
}

/* ---------- Chip ---------- */
export function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition ${
        active
          ? isColor
            ? "bg-primary text-white"
            : "bg-ink text-white"
          : "bg-white text-ink border border-hair active:bg-soft"
      }`}
    >
      {label}
    </button>
  );
}

/* ---------- Search field ---------- */
export function SearchField({
  value,
  placeholder = "Search by Deal ID, quote, SKU, customer…",
  onChange,
  onMic,
  onFocus,
  readOnly,
}: {
  value?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  onMic?: () => void;
  onFocus?: () => void;
  readOnly?: boolean;
}) {
  return (
    <div
      className={`h-14 px-4 flex items-center gap-3 rounded-2xl bg-white border ${
        isColor ? "border-line" : "border-ink/80"
      }`}
    >
      <IconSearch size={20} className="text-mute shrink-0" />
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        readOnly={readOnly}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-[15px] text-ink placeholder:text-mute"
      />
      <button
        onClick={onMic}
        className={`shrink-0 active:opacity-60 ${
          isColor ? "text-primary" : "text-ink"
        }`}
      >
        <IconMic size={20} />
      </button>
    </div>
  );
}

/* ---------- Talk FAB ---------- */
export function TalkFab() {
  const { setVoice } = useApp();
  return (
    <button
      onClick={() => setVoice(true)}
      className={`absolute right-4 bottom-[104px] z-30 h-[46px] pl-4 pr-5 rounded-full text-white flex items-center gap-2 shadow-fab active:scale-95 transition ${
        isColor ? "bg-primary" : "bg-ink"
      }`}
    >
      <IconWave size={18} className="text-white" />
      <span className="text-[15px] font-semibold">Talk</span>
    </button>
  );
}

/* ---------- Bottom tab bar ---------- */
const tabs: {
  key: ScreenKey;
  label: string;
  Icon: React.FC<{ className?: string; size?: number }>;
  center?: boolean;
}[] = [
  { key: "home", label: "Home", Icon: IconHome },
  { key: "quotes", label: "Quotes", Icon: IconDoc },
  { key: "home", label: "Assistant", Icon: IconSpark, center: true },
  { key: "notifications", label: "Notifications", Icon: IconBell },
  { key: "profile", label: "Profile", Icon: IconUser },
];

export function TabBar({ active }: { active: string }) {
  const { reset, setVoice, state } = useApp();
  const hasUnread = state.readIds.length === 0;
  return (
    <div className="absolute left-0 right-0 bottom-0 h-[86px] bg-white border-t border-hair flex items-start justify-around px-2 pt-3 z-20">
      {tabs.map((t, i) => {
        if (t.center) {
          return (
            <button
              key={i}
              onClick={() => setVoice(true)}
              className="flex flex-col items-center gap-1 -mt-2"
            >
              <span className="w-[50px] h-[50px] rounded-full bg-ink text-white flex items-center justify-center shadow-fab">
                <t.Icon size={26} />
              </span>
              <span className="text-[11px] text-mute">{t.label}</span>
            </button>
          );
        }
        const isActive = active === t.key;
        return (
          <button
            key={i}
            onClick={() => reset(t.key)}
            className="flex flex-col items-center gap-1 w-[64px] relative"
          >
            <span className="relative">
              <t.Icon
                size={22}
                className={isActive ? "text-ink" : "text-mute"}
              />
              {t.key === "notifications" && hasUnread && (
                <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-ink border border-white" />
              )}
            </span>
            <span
              className={`text-[11px] ${
                isActive ? "text-ink font-semibold" : "text-mute"
              }`}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Bottom sheet shell ---------- */
export function Sheet({
  children,
  onClose,
  maxH = "86%",
}: {
  children: React.ReactNode;
  onClose: () => void;
  maxH?: string;
}) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-black/45 animate-fade"
        onClick={onClose}
      />
      <div
        className="relative bg-white rounded-t-sheet px-5 pt-3 pb-7 animate-sheet overflow-y-auto no-scrollbar"
        style={{ maxHeight: maxH }}
      >
        <div className="w-10 h-[5px] rounded-full bg-hair mx-auto mb-3" />
        {children}
      </div>
    </div>
  );
}

/* ---------- Primary / secondary buttons ---------- */
export function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
  className?: string;
}) {
  const primaryEnabled = isColor
    ? "bg-primary text-white active:opacity-90"
    : "bg-ink text-white active:opacity-90";
  const styleByVariant: Record<string, string> = {
    primary: disabled ? "bg-hair text-mute" : primaryEnabled,
    secondary: isColor
      ? "bg-white text-ink border border-line active:bg-soft"
      : "bg-white text-ink border border-ink active:bg-soft",
    // success/danger fall back to the mono primary/secondary look when not colored
    success: isColor
      ? "bg-ok text-white active:opacity-90"
      : "bg-ink text-white active:opacity-90",
    danger: isColor
      ? "bg-white text-bad border border-bad active:bg-badbg"
      : "bg-white text-ink border border-ink active:bg-soft",
  };
  const styles = styleByVariant[variant] ?? primaryEnabled;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`h-[52px] rounded-2xl text-[15px] font-semibold flex items-center justify-center ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------- Toast ---------- */
export function Toast({ msg }: { msg: string }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-[120px] z-50 px-4 py-2.5 rounded-full bg-ink text-white text-[13px] font-medium shadow-fab animate-fade">
      {msg}
    </div>
  );
}
