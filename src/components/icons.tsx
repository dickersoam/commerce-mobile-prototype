import React from "react";

type P = { className?: string; size?: number };
const base = (size = 22) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconSearch = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);
export const IconMic = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="9" y="3" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <path d="M12 18v3" />
  </svg>
);
export const IconHome = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
  </svg>
);
export const IconDoc = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v4h4" />
    <path d="M9 12h6M9 16h6" />
  </svg>
);
export const IconBell = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);
export const IconUser = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);
export const IconSpark = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
  </svg>
);
export const IconChevron = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);
export const IconChevronDown = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
export const IconBack = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);
export const IconInfo = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" />
    <circle cx="12" cy="7.8" r="0.6" fill="currentColor" />
  </svg>
);
export const IconClose = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IconCheck = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12l5 5L20 6" />
  </svg>
);
export const IconSwap = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 8h13l-3-3M20 16H7l3 3" />
  </svg>
);
export const IconSliders = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="10" cy="17" r="2" />
  </svg>
);
export const IconArrowDown = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);
export const IconPct = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M19 5L5 19" />
    <circle cx="7.5" cy="7.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
);
export const IconBang = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 7v7" />
    <circle cx="12" cy="17.5" r="0.6" fill="currentColor" />
  </svg>
);
export const IconWave = ({ className, size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <g fill="currentColor">
      <rect x="3" y="9" width="2.4" height="6" rx="1.2" />
      <rect x="7.5" y="5" width="2.4" height="14" rx="1.2" />
      <rect x="12" y="8" width="2.4" height="8" rx="1.2" />
      <rect x="16.5" y="4" width="2.4" height="16" rx="1.2" />
      <rect x="21" y="9" width="2.4" height="6" rx="1.2" />
    </g>
  </svg>
);
