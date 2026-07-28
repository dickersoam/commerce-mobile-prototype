import React from "react";
import { useApp } from "../store";
import { StatusBar, Button } from "../components/ui";
import { IconCheck } from "../components/icons";
import { fmtMoney } from "../data";

export default function Submitted() {
  const { activeQuote: q, state, reset, nav } = useApp();
  const savings = Object.entries(state.lineEdits).reduce((acc, [id, e]) => {
    const line = q.bom.find((l) => l.id === id);
    return acc + (line ? line.netExt - e.netExt : 0);
  }, 0);
  const newTotal = q.netTotal - savings;

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-[76px] h-[76px] rounded-full bg-ink flex items-center justify-center">
          <IconCheck size={38} className="text-white" />
        </div>
        <h1 className="mt-6 text-[26px] font-extrabold text-ink">
          Submitted for approval
        </h1>
        <p className="mt-2 text-[14px] text-mute leading-snug">
          Deal {q.dealId} is now with the approver. You’ll get a notification when
          it’s fully approved.
        </p>

        <div className="mt-6 w-full rounded-2xl bg-soft p-4 divide-y divide-hair text-left">
          <Row label="New quote total" value={fmtMoney(newTotal)} />
          <Row label="Approver" value="R. Manager · Regional" />
          <Row label="Submitted" value="Just now" />
        </div>
      </div>

      <div className="px-[22px] pb-8 space-y-3">
        <Button className="w-full" onClick={() => reset("quotes")}>
          Back to Quotes
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => nav("dealDetails", { dealId: q.dealId })}
        >
          View quote
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
      <span className="text-[13.5px] text-mute">{label}</span>
      <span className="text-[13.5px] font-bold text-ink">{value}</span>
    </div>
  );
}
