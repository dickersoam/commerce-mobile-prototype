import React from "react";
import { AppProvider, useApp, ScreenKey } from "./store";
import { PhoneFrame } from "./components/PhoneFrame";
import { Toast } from "./components/ui";

import Home from "./screens/Home";
import SearchResults from "./screens/SearchResults";
import DealDetails from "./screens/DealDetails";
import Bom from "./screens/Bom";
import LineDiscount from "./screens/LineDiscount";
import Submit from "./screens/Submit";
import Submitted from "./screens/Submitted";
import Quotes from "./screens/Quotes";
import Notifications from "./screens/Notifications";
import Profile from "./screens/Profile";
import { ProxyChoose, ProxyActing } from "./screens/Proxy";
import Modals from "./screens/Modals";
import Voice from "./screens/Voice";
import Login from "./screens/Login";

const screens: Record<ScreenKey, React.FC> = {
  home: Home,
  searchResults: SearchResults,
  dealDetails: DealDetails,
  bom: Bom,
  lineDiscount: LineDiscount,
  submit: Submit,
  submitted: Submitted,
  quotes: Quotes,
  quoteResult: SearchResults,
  notifications: Notifications,
  profile: Profile,
  proxyChoose: ProxyChoose,
  proxyDelegate: ProxyChoose,
  proxyActing: ProxyActing,
};

function Device() {
  const { current, state } = useApp();
  const Screen = screens[current.screen] ?? Home;
  return (
    <PhoneFrame>
      {state.authed ? (
        <div key={state.stack.length + current.screen} className="h-full animate-screen">
          <Screen />
        </div>
      ) : (
        <div key="login" className="h-full animate-screen">
          <Login />
        </div>
      )}
      <Modals />
      {state.voiceOpen && <Voice />}
      {state.toast && <Toast msg={state.toast} />}
    </PhoneFrame>
  );
}

const FLOWS: { label: string; screen: ScreenKey; note?: string }[] = [
  { label: "Home · Search-first", screen: "home" },
  { label: "Quotes list", screen: "quotes" },
  { label: "Deal details → BOM", screen: "dealDetails" },
  { label: "Bill of materials", screen: "bom" },
  { label: "Notifications", screen: "notifications" },
  { label: "Profile", screen: "profile" },
  { label: "Proxy · act-as", screen: "proxyChoose" },
];

function Launcher() {
  const { reset, nav, setVoice } = useApp();
  return (
    <div className="hidden lg:flex flex-col w-64 shrink-0 text-white/90 pr-8">
      <div className="text-[13px] font-bold tracking-wide text-white/50 mb-1">
        CISCO COMMERCE MOBILE
      </div>
      <div className="text-[20px] font-extrabold mb-1">Testing prototype</div>
      <p className="text-[12.5px] text-white/45 leading-snug mb-5">
        Tap around the device, or jump straight to any flow. All data is realistic
        sample data.
      </p>
      <div className="space-y-1.5">
        {FLOWS.map((f) => (
          <button
            key={f.label}
            onClick={() =>
              f.screen === "dealDetails"
                ? (reset("home"), nav("dealDetails", { dealId: "96043504" }))
                : reset(f.screen)
            }
            className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[13.5px] font-medium transition"
          >
            {f.label}
          </button>
        ))}
        <button
          onClick={() => setVoice(true)}
          className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[13.5px] font-medium transition"
        >
          Talk · voice assistant
        </button>
      </div>
      <div className="mt-6 text-[11.5px] text-white/35 leading-relaxed">
        Suggested test: Home → search “96043504” → open deal → Bill of materials →
        tap a line → apply a discount → Review → Submit.
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen w-full flex items-center justify-center gap-4 py-6 px-4 bg-gradient-to-b from-[#0f1115] to-[#1b1f27]">
        <Launcher />
        <Device />
      </div>
    </AppProvider>
  );
}
