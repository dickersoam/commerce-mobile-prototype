import React from "react";
import { useApp } from "../store";
import { StatusBar, Button } from "../components/ui";
import { IconCheck, IconClose } from "../components/icons";
import { QUOTES, fmtMoney } from "../data";

type Outcome = "approved" | "disapproved";

export default function Decision() {
  const { current, reset, nav } = useApp();
  const outcome: Outcome =
    current.params?.outcome === "disapproved" ? "disapproved" : "approved";
  const dealId = current.params?.dealId ?? "96043504";
  const q = QUOTES.find((d) => d.dealId === dealId) ?? QUOTES[0];
  const approved = outcome === "approved";

  return (
    <div className="h-full flex flex-col bg-white">
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-[76px] h-[76px] rounded-full bg-ink flex items-center justify-center">
          {approved ? (
            <IconCheck size={38} className="text-white" />
          ) : (
            <IconClose size={34} className="text-white" />
          )}
        </div>
        <h1 className="mt-6 text-[26px] font-extrabold text-ink">
          {approved ? "Quote approved" : "Quote disapproved"}
        </h1>
        <p className="mt-2 text-[14px] text-mute leading-snug">
          {approved
            ? `Deal ${q.dealId} for ${q.customer} has been approved. The requester has been notified.`
            : `Deal ${q.dealId} for ${q.customer} has been disapproved. Your reason was shared with the requester.`}
        </p>

        <div className="mt-6 w-full rounded-2xl bg-soft p-4 divide-y divide-hair text-left">
          <Row label="Quote total" value={fmtMoney(q.netTotal)} />
          <Row
            label={approved ? "Approved by" : "Disapproved by"}
            value="You · R. Manager"
          />
          <Row label="Decision" value="Just now" />
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
