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

// Cisco wordmark (bars + "CISCO"). Path exported from Figma; uses currentColor
// so it inherits text color (dark ink by default).
export const IconCiscoLogo = ({
  className,
  height = 22,
}: {
  className?: string;
  height?: number;
}) => (
  <svg
    height={height}
    width={(height * 87.5) / 46.1562}
    viewBox="0 0 87.5 46.1562"
    fill="none"
    className={className}
    role="img"
    aria-label="Cisco"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M24.7187 1.875C24.7187 0.812501 23.875 0 22.8125 0C21.75 0 20.9062 0.843751 20.9062 1.875V22.0625C20.9062 23.125 21.75 23.9688 22.8125 23.9688C23.875 23.9688 24.7187 23.125 24.7187 22.0625V1.875ZM12.375 7.15625C13.4375 7.15625 14.2813 8 14.2813 9.0625V18.2813C14.2813 19.3438 13.4375 20.1875 12.375 20.1875C11.3125 20.1875 10.4687 19.3438 10.4687 18.2813V9.0625C10.4687 8 11.3125 7.15625 12.375 7.15625ZM1.90625 12.4063C2.96875 12.4063 3.8125 13.25 3.8125 14.2812V18.2813C3.8125 19.3438 2.96875 20.1875 1.90625 20.1875C0.84375 20.1875 0 19.3438 0 18.2813V14.2812C0 13.2187 0.84375 12.4063 1.90625 12.4063ZM33.2812 7.15625C34.3437 7.15625 35.1875 8 35.1875 9.0625V18.2813C35.1875 19.3438 34.3437 20.1875 33.2812 20.1875C32.2187 20.1875 31.375 19.3438 31.375 18.2813V9.0625C31.375 8 32.2187 7.15625 33.2812 7.15625ZM45.6563 14.2812C45.6563 13.2187 44.8125 12.4063 43.7813 12.4063C42.75 12.4063 41.875 13.25 41.875 14.2812V18.2813C41.875 19.3438 42.7188 20.1875 43.7813 20.1875C44.8438 20.1875 45.6563 19.3438 45.6563 18.2813V14.2812ZM54.2188 7.15625C55.2813 7.15625 56.125 8 56.125 9.0625V18.2813C56.125 19.3438 55.2813 20.1875 54.2188 20.1875C53.1563 20.1875 52.3125 19.3438 52.3125 18.2813V9.0625C52.3125 8 53.1563 7.15625 54.2188 7.15625ZM66.5937 1.875C66.5937 0.812501 65.75 0 64.6875 0C63.625 0 62.7813 0.843751 62.7813 1.875V22.0625C62.7813 23.125 63.625 23.9688 64.6875 23.9688C65.75 23.9688 66.5937 23.125 66.5937 22.0625V1.875ZM75.125 7.15625C76.1875 7.15625 77.0625 8 77.0625 9.0625V18.2813C77.0625 19.3438 76.2188 20.1875 75.125 20.1875C74.0313 20.1875 73.2188 19.3438 73.2188 18.2813V9.0625C73.2188 8 74.0625 7.15625 75.125 7.15625ZM87.5 14.2812C87.5 13.2187 86.6562 12.4063 85.5937 12.4063C84.5312 12.4063 83.6875 13.25 83.6875 14.2812V18.2813C83.6875 19.3438 84.5312 20.1875 85.5937 20.1875C86.6562 20.1875 87.5 19.3438 87.5 18.2813V14.2812ZM71.5937 46.0938C76.2812 46.0938 79.625 42.5625 79.625 38.2188C79.625 33.875 76.25 30.375 71.5937 30.3438C66.9062 30.3438 63.5625 33.875 63.5625 38.2188C63.5625 42.5625 66.9375 46.0938 71.5937 46.0938ZM67.625 38.2188C67.625 36 69.3125 34.2187 71.5937 34.2187C73.875 34.2187 75.5625 36 75.5625 38.2188C75.5625 40.4375 73.875 42.2187 71.5937 42.2187C69.3125 42.2187 67.625 40.4063 67.625 38.2188ZM19.4687 34.9687C19.25 34.8437 18.0625 34.1562 16.25 34.1562C13.75 34.1562 12.0625 35.875 12.0625 38.2188C12.0625 40.5625 13.7187 42.2812 16.25 42.2812C18.0312 42.2812 19.2812 41.5937 19.4687 41.4687V45.5313H19.4375C18.9375 45.6875 17.6563 46.0625 15.9688 46.0625C11.6563 46.0625 7.875 43.0938 7.875 38.1875C7.875 33.6563 11.3125 30.3125 15.9688 30.3125C17.625 30.3125 18.9062 30.6875 19.375 30.8125C19.4062 30.8125 19.4375 30.8125 19.4687 30.8125V34.875V34.9687ZM59.5 34.9687V30.9063C59.5 30.9063 59.4375 30.9063 59.4063 30.9063C58.9375 30.7813 57.6563 30.4063 56 30.4063C51.3125 30.4063 47.9062 33.75 47.9062 38.2813C47.9062 43.1875 51.6875 46.1562 56 46.1562C57.625 46.1562 58.875 45.7812 59.4063 45.625H59.5V41.5312C59.3125 41.625 58.0625 42.3438 56.2813 42.3438C53.7188 42.3438 52.0938 40.5313 52.0938 38.2813C52.0938 36.0313 53.8125 34.2187 56.2813 34.2187C58.0625 34.2187 59.2813 34.9063 59.5 35.0313V34.9687ZM24.75 30.625H28.5937V45.8438H24.75V30.625ZM43.1563 34.0938V30.8437C43.1563 30.8437 41.2812 30.3438 39.4062 30.3438C35.875 30.3438 33.75 32.2813 33.75 35.0938C33.75 37.625 35.5313 38.8438 37.6563 39.5313C37.8125 39.5625 38 39.625 38.1563 39.6875C38.1563 39.6875 38.375 39.75 38.4688 39.7813C39.4375 40.0938 40.1875 40.5313 40.1875 41.3125C40.1875 42.1563 39.3125 42.7188 37.4063 42.7188C35.8438 42.7188 34.3438 42.3125 33.875 42.1875H33.7813V45.6562C33.9688 45.7187 35.875 46.0625 37.9375 46.0625C40.875 46.0625 44.25 44.7812 44.25 40.9375C44.25 39.0937 43.125 37.375 40.625 36.5938L39.5625 36.25H39.4688C38.8125 36 37.7813 35.6875 37.7813 34.8125C37.7813 34.0625 38.625 33.5625 40.1563 33.5625C41.4063 33.5625 42.9375 33.9688 43.125 34.0313L43.1563 34.0938Z"
    />
  </svg>
);
