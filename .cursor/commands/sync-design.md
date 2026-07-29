Sync the latest Figma design into this React prototype and open a pull request for review. Do NOT push to `main` directly.

**Source of truth:** Figma file "Commerce on Mobile for Testing" (fileKey `XPuApDFQ9twp8eLjHf50og`).

**Steps to follow:**
1. Make sure the working tree is clean, then update: `git checkout main && git pull`.
2. Create a branch named `design-sync/<YYYY-MM-DD>` (append `-2`, `-3`, … if it already exists).
3. Determine scope: if I named specific pages/frames, sync those; otherwise ask which pages/frames to sync before reading everything.
4. Read the design via the Figma MCP (`get_metadata` for structure, `get_design_context` for the frames, `get_screenshot` to verify) from the source file above.
5. Update the React code under `src/` to match — layout, copy, spacing, colors, and any new/changed screens or components. Preserve the existing architecture (`src/screens/`, `src/components/`, `src/store.tsx`, `src/data.ts`).
6. Keep `src/data.ts` sample data intact unless the design clearly implies data changes.
7. Verify it compiles: `npm run build`.
8. Commit with a descriptive message summarizing what changed.
9. Push the branch and open a PR with `gh pr create`, title `Design sync: <short summary>`, body listing the frames synced and notable changes. Return the PR URL.

**Guardrails:**
- PR only — never merge and never push to `main`.
- If any design change is ambiguous, ask before guessing.
- Once the PR is merged, GitHub Actions auto-deploys to https://dickersoam.github.io/commerce-mobile-prototype/.
