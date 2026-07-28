# Cisco Commerce Mobile — Testing Prototype

An interactive, mobile-frame prototype of the Cisco Commerce Mobile app, built in
React + Tailwind (the same output format Figma Make produces). It mirrors the
`🧪 BOM — Explorations` Figma page and is wired end-to-end with realistic sample
data so it can be used for usability testing.

## Run it

```bash
cd commerce-mobile-prototype
npm install
npm run dev
```

Open the printed URL (default `http://localhost:5173`). A left-hand **flow launcher**
lets testers jump directly to any flow; everything inside the phone is clickable.

Build a static version for sharing:

```bash
npm run build      # outputs to dist/
npm run preview
```

## Suggested test script

Home → search **“96043504”** → open deal → **Bill of materials** → tap a line →
drag the discount slider → **Apply Discount** → **Review** → **Submit**.

## Screens & flows

- **Home / Search-first** — search bar, recent searches, "Needs your action", Talk FAB
- **Search results** — deals + quotes grouped, live filtering
- **Deal / Quote details** — quote fields, BOM entry, Approve / Disapprove
- **Bill of materials** — category groups (Products / Services / Subscriptions),
  filter chips, per-line discounting, edited-line highlight, info → **Quote details**
  slide-up, category header → **Edit category discount** slide-up
- **Line discount** — slider + %/$ inputs, included components, OIP/TIP guardrail
- **Submit for approval** — change summary, comments, → **Submitted** success
- **Quotes** — status cards, filter chips, Filters / Sort sheets
- **Notifications** — All / Approvals / Proxy / Status / Discounts, mark-all-read
- **Profile → Proxy (act-as)** — choose a colleague, colleague-quotes workspace
- **Talk** — voice-assistant listening overlay

## Structure

```
src/
  data.ts              realistic deals, quotes, 128-line BOM, notifications, proxy
  store.tsx            navigation stack + modal/edit state (React context)
  components/          icons, ui kit (status bar, tab bar, pills, sheets), PhoneFrame
  screens/            one file per screen/flow
  App.tsx             device frame + router + tester flow launcher
```

All data lives in `src/data.ts` — edit there to change deals, SKUs, pricing, etc.
