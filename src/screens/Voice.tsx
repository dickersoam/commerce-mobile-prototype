import React, { useEffect, useState } from "react";
import { useApp } from "../store";
import { IconClose } from "../components/icons";

const PHRASES = [
  "Listening…",
  "“Show me deal 96043504”",
  "“Set line 1 to 20% off”",
  "“Submit for approval”",
];

export default function Voice() {
  const { setVoice, nav, toast } = useApp();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PHRASES.length), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0 z-50 bg-ink text-white flex flex-col animate-fade">
      <div className="flex justify-end p-5">
        <button onClick={() => setVoice(false)} className="text-white/80 p-1">
          <IconClose size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="flex items-end gap-1.5 h-20 mb-8">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span
              key={i}
              className="w-2.5 rounded-full bg-white"
              style={{
                height: 64,
                transformOrigin: "center",
                animation: `pulseBar 1s ease-in-out ${i * 0.12}s infinite`,
              }}
            />
          ))}
        </div>
        <div className="text-[22px] font-bold min-h-[60px]">{PHRASES[idx]}</div>
        <p className="mt-3 text-[14px] text-white/60">
          Try: “Approve the Google deal” or “Find quotes that need action”
        </p>
      </div>

      <div className="px-6 pb-10 grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setVoice(false);
            nav("searchResults", { q: "96043504" });
          }}
          className="h-12 rounded-2xl bg-white/10 text-white text-[15px] font-semibold"
        >
          Show deal 96043504
        </button>
        <button
          onClick={() => {
            setVoice(false);
            toast("Voice command captured");
          }}
          className="h-12 rounded-2xl bg-white text-ink text-[15px] font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
}
