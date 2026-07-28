import React, { useEffect, useState } from "react";

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const s = Math.min(1, (window.innerHeight - 48) / 940);
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div
      style={{ width: 460 * scale, height: 940 * scale }}
      className="relative"
    >
      <div
        style={{
          width: 460,
          height: 940,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="absolute top-0 left-0"
      >
        <div className="w-[460px] h-[940px] rounded-[44px] bg-black p-[6px] shadow-phone">
          <div className="w-full h-full rounded-[38px] bg-white overflow-hidden relative">
            {/* notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-[60]" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
