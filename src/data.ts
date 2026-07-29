// Realistic Cisco Commerce mobile data for the testing prototype.

export type DealStatus =
  | "Needs Approval"
  | "Approval in progress"
  | "More info required"
  | "Not submitted"
  | "Approved"
  | "Disapproved"
  | "Draft";

export type Category = "Products" | "Services" | "Subscriptions";

export interface LineComponent {
  ref: string; // e.g. "1.1"
  name: string;
  sku: string;
  qty: number;
}

export interface BomLine {
  id: string;
  ref: string; // "1.0"
  category: Category;
  name: string;
  sku: string;
  desc?: string;
  qty: number;
  listExt: number; // extended list price
  discountPct: number; // percent off
  netExt: number; // extended net price
  edited?: boolean;
  components?: LineComponent[];
}

export interface CategorySummary {
  category: Category;
  lines: number;
  netExt: number;
  maxStandardPct: number;
}

export interface Quote {
  quoteId: string;
  dealId: string;
  customer: string;
  status: DealStatus;
  expiry: string; // ISO
  discountType: "Standard" | "Non Standard" | "Meet-comp";
  priceList: string;
  netTotal: number;
  totalQty: number;
  avgDiscountPct: number;
  totalLines: number;
  usFedGov: boolean;
  bom: BomLine[];
  categories: CategorySummary[];
}

export interface AppNotification {
  id: string;
  type: "approval" | "discount" | "proxy" | "status";
  icon: string; // glyph
  title: string;
  body: string;
  when: string;
  bucket: "TODAY" | "EARLIER";
  unread: boolean;
}

export interface ProxyQuote {
  dealId: string;
  quoteId: string;
  customer: string;
  status: DealStatus;
  expiry: string;
  discountType: string;
}

const money = (n: number) => n;

// ---- Primary deal: GOOGLE INC PARENT (the BOM demo deal) ----

const googleProducts: BomLine[] = [
  {
    id: "L1",
    ref: "1.0",
    category: "Products",
    name: "Catalyst 9300-48P Switch",
    sku: "C9300-48P-A",
    qty: 10,
    listExt: 120000,
    discountPct: 15,
    netExt: 102000,
    components: [
      { ref: "1.1", name: "Network Module", sku: "C9300-NM-8X", qty: 10 },
      { ref: "1.2", name: "Power Cable", sku: "CAB-TA-NA", qty: 20 },
    ],
  },
  {
    id: "L2",
    ref: "2.0",
    category: "Products",
    name: "Catalyst 9400-24T Switch",
    sku: "C9400-24T-A",
    qty: 5,
    listExt: 83333,
    discountPct: 10,
    netExt: 75000,
  },
  {
    id: "L3",
    ref: "3.0",
    category: "Products",
    name: "Catalyst 9500-32C Switch",
    sku: "C9500-32C-A",
    qty: 8,
    listExt: 150000,
    discountPct: 20,
    netExt: 120000,
  },
  {
    id: "L4",
    ref: "4.0",
    category: "Products",
    name: "Catalyst 9600-48U Switch",
    sku: "C9600-48U-A",
    qty: 12,
    listExt: 210526,
    discountPct: 5,
    netExt: 200000,
  },
  {
    id: "L5",
    ref: "5.0",
    category: "Products",
    name: "Catalyst 9500-24Y Switch",
    sku: "C9500-24Y-A",
    qty: 15,
    listExt: 109756,
    discountPct: 18,
    netExt: 90000,
  },
];

const googleServices: BomLine[] = [
  {
    id: "S1",
    ref: "6.0",
    category: "Services",
    name: "SmartNet 24×7×4 1Yr",
    sku: "CON-SNTP-C9300",
    qty: 10,
    listExt: 24444,
    discountPct: 10,
    netExt: 22000,
  },
  {
    id: "S2",
    ref: "7.0",
    category: "Services",
    name: "SmartNet 24×7×4 2Yr",
    sku: "CON-SNTP-C9300",
    qty: 15,
    listExt: 38235,
    discountPct: 15,
    netExt: 32500,
  },
  {
    id: "S3",
    ref: "8.0",
    category: "Services",
    name: "SmartNet 24×7×4 3Yr",
    sku: "CON-SNTP-C9400",
    qty: 20,
    listExt: 56250,
    discountPct: 20,
    netExt: 45000,
  },
];

const googleSubs: BomLine[] = [
  {
    id: "U1",
    ref: "9.0",
    category: "Subscriptions",
    name: "LIC-ENT -5Y",
    sku: "LIC-ENT-5Y",
    desc: "MR Enterprise License and Support, 5 year",
    qty: 5,
    listExt: 13889,
    discountPct: 10,
    netExt: 12500,
  },
  {
    id: "U2",
    ref: "10.0",
    category: "Subscriptions",
    name: "LIC-ENT -3Y",
    sku: "LIC-ENT-3Y",
    desc: "MR Enterprise License and Support, 3 year",
    qty: 7,
    listExt: 13636,
    discountPct: 12,
    netExt: 12000,
  },
];

// Generate filler lines so large-BOM scroll feels real (128 total lines).
function fillerLines(): BomLine[] {
  const out: BomLine[] = [];
  const skus = [
    ["Meraki MS250-48 Switch", "MS250-48-HW", "Products"],
    ["Meraki MR57 Access Point", "MR57-HW", "Products"],
    ["Catalyst 8300 Router", "C8300-1N1S", "Products"],
    ["Nexus 9336C Switch", "N9K-C9336C", "Products"],
    ["ISR 4451 Router", "ISR4451-X/K9", "Products"],
    ["SmartNet 8×5×NBD 1Yr", "CON-SNT-MS250", "Services"],
    ["Solution Support 3Yr", "CON-SSSNT-C83", "Services"],
    ["Meraki Enterprise 1Yr", "LIC-MS250-1Y", "Subscriptions"],
    ["DNA Advantage 5Yr", "C9300-DNA-A-5Y", "Subscriptions"],
    ["Umbrella SIG Essentials", "UMB-SIG-ESS", "Subscriptions"],
  ] as const;
  for (let i = 0; i < 118; i++) {
    const t = skus[i % skus.length];
    const qty = ((i * 7) % 40) + 1;
    const listExt = 1500 + ((i * 337) % 24000);
    const pct = [5, 8, 10, 12, 15, 18, 20][i % 7];
    const netExt = Math.round(listExt * (1 - pct / 100));
    out.push({
      id: "F" + i,
      ref: 11 + i + ".0",
      category: t[2] as Category,
      name: t[0],
      sku: t[1],
      qty,
      listExt,
      discountPct: pct,
      netExt,
    });
  }
  return out;
}

const googleBom: BomLine[] = [
  ...googleProducts,
  ...googleServices,
  ...googleSubs,
  ...fillerLines(),
];

const googleDeal: Quote = {
  quoteId: "4748823629",
  dealId: "96043504",
  customer: "GOOGLE INC PARENT",
  status: "Approval in progress",
  expiry: "2026-07-07",
  discountType: "Non Standard",
  priceList: "Global Price List",
  netTotal: 214120,
  totalQty: 1284,
  avgDiscountPct: 14,
  totalLines: 128,
  usFedGov: false,
  bom: googleBom,
  categories: [
    { category: "Products", lines: 96, netExt: 153000, maxStandardPct: 67 },
    { category: "Services", lines: 18, netExt: 37800, maxStandardPct: 40 },
    { category: "Subscriptions", lines: 14, netExt: 24500, maxStandardPct: 30 },
  ],
};

// ---- Additional quotes for the Quotes tab ----

export const QUOTES: Quote[] = [
  googleDeal,
  {
    quoteId: "4753867161",
    dealId: "100103006",
    customer: "PFIZER",
    status: "More info required",
    expiry: "2026-07-08",
    discountType: "Non Standard",
    priceList: "Global Price List",
    netTotal: 356900,
    totalQty: 640,
    avgDiscountPct: 19,
    totalLines: 84,
    usFedGov: false,
    bom: [],
    categories: [
      { category: "Products", lines: 60, netExt: 240000, maxStandardPct: 67 },
      { category: "Services", lines: 14, netExt: 76900, maxStandardPct: 40 },
      { category: "Subscriptions", lines: 10, netExt: 40000, maxStandardPct: 30 },
    ],
  },
  {
    quoteId: "4753711626",
    dealId: "99961001",
    customer: "STEVENS CAPITAL MGMT",
    status: "Not submitted",
    expiry: "2026-07-12",
    discountType: "Standard",
    priceList: "Global Price List",
    netTotal: 128400,
    totalQty: 310,
    avgDiscountPct: 11,
    totalLines: 42,
    usFedGov: false,
    bom: [],
    categories: [],
  },
  {
    quoteId: "4753486633",
    dealId: "99762008",
    customer: "MERIDIAN HEALTH SYSTEMS",
    status: "Approved",
    expiry: "2026-06-29",
    discountType: "Standard",
    priceList: "Global Price List",
    netTotal: 92750,
    totalQty: 180,
    avgDiscountPct: 9,
    totalLines: 28,
    usFedGov: false,
    bom: [],
    categories: [],
  },
  {
    quoteId: "4752990114",
    dealId: "99510442",
    customer: "VERTEX HEALTH",
    status: "Disapproved",
    expiry: "2026-06-24",
    discountType: "Non Standard",
    priceList: "Global Price List",
    netTotal: 47300,
    totalQty: 96,
    avgDiscountPct: 24,
    totalLines: 19,
    usFedGov: false,
    bom: [],
    categories: [],
  },
  {
    quoteId: "4752771903",
    dealId: "99418820",
    customer: "ORBITAL FREIGHT",
    status: "Draft",
    expiry: "2026-07-18",
    discountType: "Standard",
    priceList: "Global Price List",
    netTotal: 61200,
    totalQty: 140,
    avgDiscountPct: 12,
    totalLines: 33,
    usFedGov: false,
    bom: [],
    categories: [],
  },
];

export const PRIMARY_DEAL = googleDeal;

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    type: "approval",
    icon: "!",
    title: "Approval needed · D-4471902",
    body: "Nexlify Systems quote needs your approval before May 30.",
    when: "2h",
    bucket: "TODAY",
    unread: true,
  },
  {
    id: "n2",
    type: "discount",
    icon: "%",
    title: "Discount updated · D-4471902",
    body: "Standard discount changed to 32% on Nexlify Systems.",
    when: "3h",
    bucket: "TODAY",
    unread: true,
  },
  {
    id: "n3",
    type: "proxy",
    icon: "⇄",
    title: "Proxy access granted",
    body: "You can now act as David Okafor until Aug 01, 2026.",
    when: "5h",
    bucket: "TODAY",
    unread: true,
  },
  {
    id: "n4",
    type: "approval",
    icon: "!",
    title: "More info requested · D-4471888",
    body: "Reviewer asked for margin justification on Orbital Freight.",
    when: "1d",
    bucket: "EARLIER",
    unread: false,
  },
  {
    id: "n5",
    type: "status",
    icon: "✓",
    title: "Quote approved · D-4471888",
    body: "Orbital Freight quote was approved by J. Lin.",
    when: "1d",
    bucket: "EARLIER",
    unread: false,
  },
  {
    id: "n6",
    type: "status",
    icon: "✕",
    title: "Quote disapproved · D-4471860",
    body: "Vertex Health quote was disapproved. Reason: pricing.",
    when: "2d",
    bucket: "EARLIER",
    unread: false,
  },
  {
    id: "n7",
    type: "proxy",
    icon: "⇄",
    title: "Proxy access ending soon",
    body: "Your proxy for Account Team A ends in 3 days.",
    when: "2d",
    bucket: "EARLIER",
    unread: false,
  },
  {
    id: "n8",
    type: "discount",
    icon: "%",
    title: "Discount request sent · D-4471860",
    body: "Non-standard discount change submitted for approval.",
    when: "3d",
    bucket: "EARLIER",
    unread: false,
  },
];

export const PROXY_COLLEAGUE = "David Okafor";
export const PROXY_QUOTES: ProxyQuote[] = [
  {
    dealId: "96043504",
    quoteId: "Q-88213",
    customer: "Nexlify Systems",
    status: "Approval in progress",
    expiry: "May 30, 2026",
    discountType: "Standard",
  },
  {
    dealId: "82482480",
    quoteId: "Q-88190",
    customer: "Orbital Freight",
    status: "More info required",
    expiry: "Jun 04, 2026",
    discountType: "Non-standard",
  },
  {
    dealId: "621828912",
    quoteId: "Q-88155",
    customer: "Vertex Health",
    status: "Not submitted",
    expiry: "Jun 12, 2026",
    discountType: "Meet-comp",
  },
];

export interface ProxyDelegate {
  name: string;
  role: string;
  initials: string;
  userId: string;
  email: string;
  cc: boolean;
}

export const PROXY_DELEGATES: ProxyDelegate[] = [
  { name: "David Okafor", role: "Account Executive · AMER", initials: "DO", userId: "dokafor", email: "dokafor@cisco.com", cc: true },
  { name: "Priya Nair", role: "Account Executive · EMEA", initials: "PN", userId: "pnair", email: "pnair@cisco.com", cc: false },
  { name: "Tom Becker", role: "Operations Director · APJC", initials: "TB", userId: "tbecker", email: "tbecker@cisco.com", cc: true },
  { name: "Sofia Alvarez", role: "Regional Manager · AMER", initials: "SA", userId: "salvarez", email: "salvarez@cisco.com", cc: true },
];

export interface ProxyTeam {
  name: string;
  openQuotes: number;
}

export const PROXY_TEAMS: ProxyTeam[] = [
  { name: "Account Team A", openQuotes: 12 },
  { name: "Account Team B", openQuotes: 7 },
  { name: "Account Team C", openQuotes: 3 },
  { name: "Account Team D", openQuotes: 5 },
];

export const USER = {
  name: "Maria Smith",
  role: "Account Executive · AMER",
  initials: "MC",
};

export const RECENT_SEARCHES = ["96043504", "Q-88213", "99961001"];

// Recently viewed deals for the Home v2 landing (references real quotes so
// tapping a row opens the correct deal).
export const RECENTLY_VIEWED: { dealId: string; when: string }[] = [
  { dealId: "99961001", when: "2h ago" },
  { dealId: "96043504", when: "Yesterday" },
  { dealId: "99418820", when: "2d ago" },
];

export const fmtMoney = (n: number) =>
  "$" + money(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

// Compact money (e.g. $571K, $1.2M) for the Home stats strip.
export const fmtMoneyShort = (n: number) =>
  "$" +
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

export const fmtDate = (iso: string) => iso;
