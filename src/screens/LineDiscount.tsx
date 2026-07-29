import React, { useMemo, useState } from "react";
import { useApp } from "../store";
import { StatusBar, TopBar, Button } from "../components/ui";
import { IconInfo } from "../components/icons";
import { fmtMoney } from "../data";

export default function LineDiscount() {
  const { activeQuote, current, state, editLine, back, nav } = useApp();
  const lineId = current.params?.lineId as string;
  const line = activeQuote.bom.find((l) => l.id === lineId) ?? activeQuote.bom[0];

  const existing = state.lineEdits[line.id];
  const [pct, setPct] = useState<number>(existing?.discountPct ?? line.discountPct);

  const amountOff = Math.round((line.listExt * pct) / 100);
  const net = line.listExt - amountOff;
  const maxStd =
    activeQuote.categories.find((c) => c.category === line.category)
      ?.maxStandardPct ?? 67;
  const catWord =
    line.category === "Products" ? "Networking" : line.category;

  // Save the pending edit and open the "Confirm Discount change" slide-up.
  const review = () => {
    editLine(line.id, { discountPct: pct, netExt: net });
    nav("submit");
  };

  const barPct = useMemo(() => Math.min(100, (pct / 50) * 100), [pct]);

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <TopBar title={line.name} subtitle={`${line.sku} · Line ${line.ref}`} onBack={back} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-[22px] pb-4">
        <div className="mt-4 text-[11px] font-semibold tracking-wide text-mute">
          ADJUST THIS LINE
        </div>

        <div className="mt-2 rounded-2xl border border-hair p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-3">
              <div className="text-[15px] font-bold text-ink">
                {line.ref}&nbsp;&nbsp;{line.name}
              </div>
              <div className="text-[12px] text-mute mt-0.5">
                {line.sku} · Qty {line.qty} · List (ext) {fmtMoney(line.listExt)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[30px] font-extrabold text-ink leading-none">
                {pct}%
              </div>
              <div className="text-[12px] text-mute mt-1">
                {fmtMoney(amountOff)} off
              </div>
            </div>
          </div>

          {/* slider */}
          <div className="mt-4">
            <input
              type="range"
              min={0}
              max={50}
              value={pct}
              onChange={(e) => setPct(Number(e.target.value))}
              className="w-full accent-ink"
              style={{ accentColor: "#292A2E" }}
            />
            <div className="h-1.5 rounded-full bg-hair -mt-2 relative pointer-events-none">
              <div
                className="h-1.5 rounded-full bg-ink"
                style={{ width: `${barPct}%` }}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10.5px] font-semibold tracking-wide text-mute mb-1">
                PERCENTAGE
              </div>
              <div className="h-12 rounded-xl border border-hair px-3 flex items-center">
                <input
                  value={pct}
                  onChange={(e) =>
                    setPct(Math.max(0, Math.min(90, Number(e.target.value) || 0)))
                  }
                  inputMode="numeric"
                  className="w-full outline-none text-[15px] font-semibold text-ink"
                />
                <span className="text-[15px] font-semibold text-ink">%</span>
              </div>
            </div>
            <div>
              <div className="text-[10.5px] font-semibold tracking-wide text-mute mb-1">
                AMOUNT OFF
              </div>
              <div className="h-12 rounded-xl border border-hair px-3 flex items-center">
                <span className="text-[15px] font-semibold text-ink">
                  {fmtMoney(amountOff)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-hair flex items-center justify-between">
            <span className="text-[14px] font-semibold text-ink">Net price</span>
            <span className="text-[18px] font-extrabold text-ink">
              {fmtMoney(net)}
            </span>
          </div>
        </div>

        {line.components && line.components.length > 0 && (
          <>
            <div className="mt-5 text-[11px] font-semibold tracking-wide text-mute">
              INCLUDED COMPONENTS · {line.components.length}
            </div>
            <div className="mt-2 rounded-2xl border border-hair divide-y divide-hair">
              {line.components.map((c) => (
                <div key={c.ref} className="p-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-ink">
                      {c.ref}&nbsp;&nbsp;{c.name}
                    </div>
                    <div className="text-[12px] text-mute">
                      {c.sku} · Qty {c.qty}
                    </div>
                  </div>
                  <span className="text-[13px] text-mute">Included</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-4 rounded-xl border border-ink p-3.5 flex gap-2.5 items-start">
          <IconInfo size={17} className="text-ink shrink-0 mt-0.5" />
          <p className="text-[12.5px] text-ink leading-snug">
            Standard max for {catWord} is {maxStd}%. Going above needs approval and
            may affect OIP / TIP.
          </p>
        </div>

        <div className="mt-4 rounded-2xl bg-soft p-4 flex items-center justify-between">
          <div>
            <div className="text-[14px] font-semibold text-ink">New line net</div>
            <div className="text-[11px] text-mute">{pct}% off list · ext</div>
          </div>
          <div className="text-[20px] font-extrabold text-ink">{fmtMoney(net)}</div>
        </div>
      </div>

      <div className="px-[22px] pb-6 pt-2 grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={back}>
          Cancel
        </Button>
        <Button onClick={review}>Review</Button>
      </div>
    </div>
  );
}
