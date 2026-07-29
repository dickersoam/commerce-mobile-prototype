import React, { useState } from "react";
import { useApp } from "../store";
import { Button } from "../components/ui";
import { IconClose } from "../components/icons";
import { fmtMoney } from "../data";

export default function Submit() {
  const { activeQuote: q, state, back, nav, toast } = useApp();
  const [note, setNote] = useState("");

  const edits = Object.entries(state.lineEdits);
  const savings = edits.reduce((acc, [id, e]) => {
    const line = q.bom.find((l) => l.id === id);
    return acc + (line ? line.netExt - e.netExt : 0);
  }, 0);
  const newTotal = q.netTotal - savings;

  const first = edits[0];
  const firstLine = first ? q.bom.find((l) => l.id === first[0]) : undefined;
  const changeText =
    edits.length === 0
      ? "No line changes"
      : edits.length === 1 && firstLine
      ? `1 line · ${firstLine.discountPct}% → ${first[1].discountPct}% off`
      : `${edits.length} lines edited`;

  return (
    <div className="h-full flex flex-col justify-end bg-black/45 animate-fade">
      <div className="bg-white rounded-t-sheet px-5 pt-3 pb-6 animate-sheet">
        <div className="w-10 h-[5px] rounded-full bg-hair mx-auto mb-3" />
        <div className="flex items-center justify-center relative">
          <h2 className="text-[19px] font-bold text-ink">Confirm Discount change</h2>
          <button onClick={back} className="absolute right-0 text-mute p-1">
            <IconClose size={20} />
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-soft p-4 divide-y divide-hair">
          <Row label="Deal" value={`${q.dealId} · ${q.customer}`} />
          <Row label="Change" value={changeText} />
          <Row label="New quote total" value={fmtMoney(newTotal)} bold />
        </div>

        <div className="mt-4">
          <div className="text-[13px] font-medium text-ink mb-2">
            Comments (optional)
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note for the approver…"
            rows={3}
            className="w-full rounded-2xl border border-hair p-3.5 text-[13px] text-ink placeholder:text-mute outline-none resize-none"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={back}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              toast("Discount change saved");
              nav("dealDetails", { dealId: q.dealId });
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
      <span className="text-[13.5px] text-mute">{label}</span>
      <span
        className={`text-[13.5px] text-ink text-right ${
          bold ? "text-[18px] font-extrabold" : "font-semibold"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
