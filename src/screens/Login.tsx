import React, { useRef, useState } from "react";
import { useApp } from "../store";
import { StatusBar, Button } from "../components/ui";
import { IconBack, IconCiscoLogo } from "../components/icons";
import { isColor } from "../theme";

type Step = "welcome" | "credentials" | "verify";

const linkCls = `text-[13px] font-semibold active:opacity-60 ${
  isColor ? "text-primary" : "text-ink"
}`;

export default function Login() {
  const { signIn, toast } = useApp();
  const [step, setStep] = useState<Step>("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [code, setCode] = useState<string[]>(["4", "2", "9", "", "", ""]);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[i] = d;
      return next;
    });
    if (d && i < 5) boxes.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) boxes.current[i - 1]?.focus();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />

      {step === "welcome" && (
        <div className="flex-1 flex flex-col px-[22px]">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <IconCiscoLogo height={34} className="text-ink" />
            <h1 className="mt-6 text-[28px] font-extrabold text-ink tracking-tight">
              Commerce Mobile
            </h1>
            <p className="mt-2 text-[15px] text-mute leading-snug max-w-[280px]">
              Quote, review, and approve deals on the go.
            </p>
          </div>
          <div className="pb-6 space-y-3">
            <Button className="w-full" onClick={() => setStep("credentials")}>
              Sign in
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                toast("Authenticating with Face ID…");
                window.setTimeout(signIn, 700);
              }}
            >
              Use Face ID
            </Button>
            <p className="text-center text-[11.5px] text-mute pt-1">
              By continuing you agree to the Terms of Use and Privacy Policy.
            </p>
          </div>
        </div>
      )}

      {step === "credentials" && (
        <div className="flex-1 flex flex-col px-[22px]">
          <button
            onClick={() => setStep("welcome")}
            className="mt-1 -ml-1 p-1 w-8 text-ink active:opacity-60"
          >
            <IconBack size={24} />
          </button>
          <h1 className="mt-3 text-[28px] font-extrabold text-ink tracking-tight">
            Sign in
          </h1>
          <p className="mt-1 text-[14px] text-mute">Use your Cisco.com account.</p>

          <label className="mt-6 block text-[13px] font-bold text-ink">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            type="email"
            className="mt-2 w-full rounded-xl border border-hair px-4 py-3.5 text-[15px] text-ink placeholder:text-mute outline-none focus:border-ink"
          />

          <label className="mt-4 block text-[13px] font-bold text-ink">
            Password
          </label>
          <div className="mt-2 flex items-center rounded-xl border border-hair px-4 focus-within:border-ink">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              type={showPw ? "text" : "password"}
              className="flex-1 py-3.5 text-[15px] text-ink placeholder:text-mute outline-none bg-transparent"
            />
            <button
              onClick={() => setShowPw((s) => !s)}
              className="text-[13px] font-semibold text-ink pl-3 active:opacity-60"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          <div className="mt-3 flex justify-end">
            <button onClick={() => toast("Password reset link sent")} className={linkCls}>
              Forgot password?
            </button>
          </div>

          <Button className="mt-4 w-full" onClick={() => setStep("verify")}>
            Sign in
          </Button>

          <div className="my-4 flex items-center gap-3 text-[12px] text-mute">
            <span className="flex-1 h-px bg-hair" />
            or
            <span className="flex-1 h-px bg-hair" />
          </div>

          <button
            onClick={() => {
              toast("Redirecting to SSO…");
              window.setTimeout(signIn, 700);
            }}
            className={`w-full h-[52px] rounded-2xl border text-[15px] font-semibold active:bg-soft ${
              isColor ? "border-line text-primary" : "border-ink text-ink"
            }`}
          >
            Single sign-on (SSO)
          </button>
        </div>
      )}

      {step === "verify" && (
        <div className="flex-1 flex flex-col px-[22px]">
          <button
            onClick={() => setStep("credentials")}
            className="mt-1 -ml-1 p-1 w-8 text-ink active:opacity-60"
          >
            <IconBack size={24} />
          </button>
          <h1 className="mt-3 text-[28px] font-extrabold text-ink tracking-tight">
            Verify it's you
          </h1>
          <p className="mt-1 text-[14px] text-mute">
            Enter the 6-digit code we sent to a•••@cisco.com
          </p>

          <div className="mt-6 flex gap-2.5">
            {code.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  boxes.current[i] = el;
                }}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                inputMode="numeric"
                maxLength={1}
                className="flex-1 aspect-square min-w-0 rounded-xl border border-hair text-center text-[22px] font-bold text-ink outline-none focus:border-ink"
              />
            ))}
          </div>

          <Button className="mt-6 w-full" onClick={signIn}>
            Verify
          </Button>
          <div className="mt-3 flex justify-center">
            <button onClick={() => toast("New code sent")} className={linkCls}>
              Resend code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
