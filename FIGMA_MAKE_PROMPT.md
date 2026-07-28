# Figma Make — paste-ready prompt

Copy everything in the block below into a new Figma Make project. It regenerates
the same app as the React prototype in this folder. (Tip: paste in one go; then
iterate screen-by-screen with follow-ups.)

---

Build a **mobile web app prototype for “Cisco Commerce Mobile”** — a tool that lets
Cisco sellers and approvers review deals, edit quote discounts, and approve/submit
quotes from their phone. It is for **usability testing**, so wire every flow and use
realistic sample data. Render it inside a **460 × 940 iPhone-style device frame**
centered on a dark page, and add a small left-side “flow launcher” panel with buttons
to jump to each major flow.

## Visual style
- Clean, **monochrome** system: near-black ink `#292A2E`, muted gray `#8F8F8F`,
  soft background `#F6F6F7`, hairline borders `#E6E6EB`, white surfaces.
- Font **Inter**. Bold, tight headings. Generous rounded corners (cards 16px,
  sheets 26px top corners, buttons 16px).
- Status pills: dark filled for active states (Needs Approval, Approval in progress,
  More info required); light outlined for passive (Approved, Disapproved, Draft,
  Not submitted).
- A dark **“Talk”** pill FAB (voice) floats bottom-right on tabbed screens.
- Bottom **tab bar**: Home, Quotes, **Assistant** (center circular button), Notifications
  (with unread dot), Profile.
- Subtle screen transitions; bottom sheets slide up over a 45% scrim.

## Sample data (use throughout)
- **User:** Maria Smith · Account Executive · AMER (avatar “MC”).
- **Primary deal (full BOM):** Deal `96043504`, Quote `4748823629`, customer
  **GOOGLE INC PARENT**, expiry `2026-07-07`, **Non Standard**, Global Price List,
  net **$214,120**, total qty **1,284**, avg discount **14%**, **128 lines**, US Fed Gov: No.
  - BOM grouped into: **Products · Hardware & Software** (96 lines · $153,000, std max 67%),
    **Services** (18 lines · $37,800, std max 40%), **Subscriptions** (14 lines · $24,500, std max 30%).
  - Representative lines (name · SKU · Qty · net · % off):
    - Catalyst 9300-48P Switch · C9300-48P-A · 10 · $102,000 · 15% (list ext $120,000;
      included components: 1.1 Network Module C9300-NM-8X ×10, 1.2 Power Cable CAB-TA-NA ×20)
    - Catalyst 9400-24T Switch · C9400-24T-A · 5 · $75,000 · 10%
    - Catalyst 9500-32C Switch · C9500-32C-A · 8 · $120,000 · 20%
    - Catalyst 9600-48U Switch · C9600-48U-A · 12 · $200,000 · 5%
    - Catalyst 9500-24Y Switch · C9500-24Y-A · 15 · $90,000 · 18%
    - SmartNet 24×7×4 1Yr · CON-SNTP-C9300 · 10 · $22,000 · 10%
    - SmartNet 24×7×4 2Yr · CON-SNTP-C9300 · 15 · $32,500 · 15%
    - SmartNet 24×7×4 3Yr · CON-SNTP-C9400 · 20 · $45,000 · 20%
    - LIC-ENT -5Y (MR Enterprise License and Support, 5 year) · 5 · $12,500 · 10%
    - LIC-ENT -3Y (MR Enterprise License and Support, 3 year) · 7 · $12,000 · 12%
    - Generate ~118 more filler lines (Meraki MS250-48 / MR57, Catalyst 8300, Nexus 9336C,
      ISR 4451, DNA Advantage, Umbrella SIG, etc.) so the list scrolls like a 128-line BOM.
- **Other quotes (Quotes tab):**
  - `100103006` · Quote 4753867161 · PFIZER · exp 2026-07-08 · Non Standard · More info required
  - `99961001` · Quote 4753711626 · STEVENS CAPITAL MGMT · exp 2026-07-12 · Standard · Not submitted
  - `99762008` · Quote 4753486633 · MERIDIAN HEALTH SYSTEMS · exp 2026-06-29 · Standard · Approved
  - `99510442` · Quote 4752990114 · VERTEX HEALTH · exp 2026-06-24 · Non Standard · Disapproved
  - `99418820` · Quote 4752771903 · ORBITAL FREIGHT · exp 2026-07-18 · Standard · Draft
- **Notifications:** Today — “Approval needed · D-4471902” (Nexlify Systems, before May 30, 2h),
  “Discount updated · D-4471902” (32% on Nexlify, 3h), “Proxy access granted” (act as David
  Okafor until Aug 01, 2026, 5h). Earlier — “More info requested · D-4471888” (Orbital Freight
  margin justification, 1d), “Quote approved · D-4471888” (Orbital Freight by J. Lin, 1d),
  “Quote disapproved · D-4471860” (Vertex Health, reason: pricing, 2d), “Proxy access ending
  soon” (Account Team A, 3 days, 2d), “Discount request sent · D-4471860” (3d).
- **Proxy delegates:** David Okafor (AE · AMER), Sofia Alvarez (Regional Manager · AMER),
  Liam Chen (Operations Director · APJC), Priya Nair (AE · EMEA).
- **Colleague (acting as David Okafor) quotes:** 96043504 · Q-88213 · Nexlify Systems ·
  Standard · May 30, 2026 · Approval in progress; 82482480 · Q-88190 · Orbital Freight ·
  Non-standard · Jun 04, 2026 · More info required; 621828912 · Q-88155 · Vertex Health ·
  Meet-comp · Jun 12, 2026 · Not submitted.

## Screens & flows

1. **Home · Search-first** — “Find a deal” title, big search field (mic on right),
   RECENT SEARCHES chips (96043504, PFIZER, C9300-48P-A), “NEEDS YOUR ACTION” list with
   Sort · Expiry, two deal rows (Google → Needs Approval, Pfizer → More info required).
   Tapping the search field opens Search results; tapping a deal opens Deal details.
2. **Search results** — editable search (prefilled “96043504”), “N Results”, results
   grouped **CUSTOMER** (deal rows) and **QUOTES** (quote rows); live filtering as you type.
3. **Deal / Quote details** — “DEAL ID” big number + status pill, a **QUOTE DETAILS** card
   (Quote number, Discount type, Expiry, Price list, End customer, US Fed Gov), a
   **BILL OF MATERIALS** entry card (128 lines · $214,120 net · 15% Discount · “Review & edit ›”)
   → BOM. Footer: **Disapprove** / **Approve**.
4. **Bill of materials** — top bar back + title + **info (ⓘ)** icon; sticky search;
   filter chips **All 128 / Products 96 / Services 18 / Subscriptions 14**; grouped list with
   sticky category headers showing “N · $net” and an **“Edit % ›”** affordance. Each line:
   name + chevron, SKU · Qty, right-aligned net + “% OFF”. Footer **Cancel** / **Review**
   (Review disabled until an edit is made).
   - Tap **ⓘ** → **Quote details** slide-up (big net, metrics: Total qty / Avg discount /
     Lines, details grid, Done).
   - Tap a **category header** → **Edit category discount** slide-up (−/+ stepper, big %,
     slider, “Overwrite line-level edits” toggle, OIP/TIP guardrail, “New category net” =
     category net × (1 − %), Cancel / Apply to category).
   - Tap a **line** → Line discount.
   - After an edit, the line gets a **light-blue highlight + “✎ Edited” tag**, bold net/%,
     and **Review** becomes active.
5. **Line discount** — title = SKU name, subtitle “SKU · Line X.0”; a card with the line,
   big % + “$ off”, a **slider**, **Percentage** and **Amount off** inputs (kept in sync),
   Net price; **INCLUDED COMPONENTS** list (if any) with “Included”; an **OIP/TIP guardrail**
   note (“Standard max for {category} is {N}% …”); a “New line net” summary bar. Footer
   **Cancel** / **Apply Discount** (returns to BOM with the edit applied + a toast).
6. **Submit for approval** — bottom sheet over BOM: title “Submit for approval?”, summary
   (Deal · customer; Change “1 line · X% → Y% off”; **New quote total**), optional Comments,
   **Cancel** / **Submit** → Submitted.
7. **Submitted** — centered dark check, “Submitted for approval”, subtext, summary card
   (New quote total, Approver “R. Manager · Regional”, Submitted “Just now”), **Back to Quotes**
   / **View quote**.
8. **Quotes** — “Quotes” title, search + dark **Filters** button; filter chips
   **All / Needs action / Approved / Disapproved / Drafts**; “Showing N quotes” + Sort;
   quote **cards** (DEAL ID big, status pill, Quote ID / Expiry / Discount type / End customer).
   Filters and Sort open bottom sheets.
9. **Notifications** — title + “Mark all read”; chips **All / Approvals / Proxy / Status /
   Discounts**; TODAY / EARLIER sections; rows with a square glyph badge, title, body,
   time, unread dot.
10. **Profile** — user card (MC · Maria Smith · AE · AMER); **PROXY → Change proxy**
    (“Acting as yourself”); **PREFERENCES** (Notification preferences, Language & region);
    **SUPPORT** (Help & feedback, Sign out).
11. **Proxy · Change proxy** — “Yourself” option + delegate list; selecting a delegate →
    **Colleague quotes** screen with an “ACTING AS {name} · Switch back” banner and the
    colleague’s needs-action quote cards (uppercase status pills).
12. **Talk (voice)** — full-screen dark overlay: animated waveform, cycling captions
    (“Listening…”, “Show me deal 96043504”, “Set line 1 to 20% off”, “Submit for approval”),
    example hints, and quick-action buttons. Reachable from every Talk FAB and the center
    tab.

## Interactions to wire
- Bottom tabs switch top-level screens; center Assistant opens Talk.
- Search is live; discount slider/inputs recompute % ↔ $ ↔ net in real time.
- Line and category edits persist and reflect on the BOM (highlight + updated totals),
  drive the Submit summary and the New quote total, and show confirmation toasts.
- All sheets/overlays close via their scrim, close (✕), Cancel, or Done.
