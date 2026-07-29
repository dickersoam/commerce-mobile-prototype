# Design → Code Sync

An on-demand workflow to bring Figma design changes into this React prototype
via a reviewed pull request. There is no automatic/scheduled push — sync runs
when you ask, and always lands as a PR (never a direct push to `main`).

## Source of truth
- **Figma file:** *Commerce on Mobile for Testing* — `fileKey XPuApDFQ9twp8eLjHf50og`
- Design edits happen here; this repo is updated to match.

## How to trigger
In Cursor, either:
- Run the slash command **`/sync-design`**, or
- Say: **"Sync the design to code"** (optionally name the pages/frames, e.g.
  "sync the BOM and Home screens").

## What the agent does
1. `git checkout main && git pull` (clean starting point).
2. Creates a branch `design-sync/<YYYY-MM-DD>`.
3. Reads the specified Figma frames (Figma MCP) from the source file.
4. Updates React code under `src/` to match — layout, copy, spacing, colors,
   new/changed screens & components — preserving the existing architecture.
5. Runs `npm run build` to confirm it compiles.
6. Commits, pushes, and opens a **PR** with a summary of the frames synced.

## Review & deploy
- Review the PR, then merge when it looks right.
- Merging `main` triggers the GitHub Actions deploy to
  **https://dickersoam.github.io/commerce-mobile-prototype/** (~30s).

## Scope conventions
- Naming specific frames keeps changes small and reviewable.
- Sample data in `src/data.ts` is preserved unless the design implies changes.
- Ambiguous design changes are raised as questions before implementing.

## Notes / limits
- Design→code translation is assisted, not pixel-perfect — the PR review step
  is where you catch anything off.
- Requires the Figma MCP (connected) and `gh` authenticated to the repo owner
  (`dickersoam`), both already set up.
