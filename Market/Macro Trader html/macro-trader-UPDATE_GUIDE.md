# Macro Trader Setup — Update Guide (agent contract)

This page (`macro-trader-technical-setup.html`) is a **template**. All live content
comes from **`macro-trader-data.json`**. To refresh the page, an agent (Codex,
Claude Code, etc.) edits **only that JSON file** — never the HTML. The page then
tallies the evidence, computes the regime, and lays out the full board for the call.

## The loop
1. Agent fetches the latest readings across every panel.
2. Agent overwrites `macro-trader-data.json` (rules below).
3. On reload, the **Decision dashboard** (section 7) shows:
   1. **Balance of evidence** — a bar tallying every reading's `tone` (supportive / neutral / negative).
   2. **The full board** — all 8 workspace panels with values.
   3. **Indicator readings** — moving-average state + momentum.
   4. **Computed regime** — scored from `inputs` (+ auto commentary).
   5. **Analyst commentary** — your written `agentCommentary`.
   6. **Final decision** — your written `decision` block.

The decision therefore rests on the *whole board*, not a few quotes.

## File shape: `macro-trader-data.json`

Top-level keys: `asOf`, `asOfLabel`, `headline`, `panels`, `indicators`, `inputs`, `decision`, `agentCommentary`.

### Header
- **asOf** — ISO date `YYYY-MM-DD`.
- **asOfLabel** — label shown in the heading (e.g. `"June 10, 2026 close"`).
- **headline** — one-line characterization of the tape.

### `panels` — the 8 workspace blocks (each is an array of rows)
Keys, in display order: `equity`, `volatility`, `rates`, `fx`, `commodities`, `credit`, `breadth`, `leadership`.

Each **row** object:
- `name` (string) — label.
- `value` (string) — keep the formatting/units you want shown (`"7,266.99"`, `"4.54%"`, `"lagging"`).
- **either** `chg` (number, percent → renders green ▲ / red ▼) **or** `sub` (string note). Both optional; don't rely on both.
- `tone` — **`"pos"` | `"neg"` | `"neutral"`** → the colored dot AND the evidence tally. Set it to whether the reading *supports risk* (pos), *opposes* it (neg), or is neutral. **This is what drives the balance-of-evidence bar**, so tag every row.

Add/remove rows freely; panels reflow. An empty panel is hidden.

### `indicators`
- `movingAverages` — array of `{ "ma": "EMA 20", "state": "lost", "tone": "neg" }`. `state` is free text (`above` / `below` / `lost` / `testing` …); `tone` colors the pill top.
- `momentum` — array of `{ "name": "RSI(14)", "value": "41", "sub": "…", "tone": "neg" }`.

### `inputs` — drives the COMPUTED regime (use these exact values)

| key | allowed values |
|-----|----------------|
| `ma` | `stacked`, `above200`, `stretched`, `lost20`, `below50`, `below200`, `washed`, `flat` |
| `breadth` | `broad`, `positive`, `crowded`, `weak`, `mixed` |
| `vol` | `contained`, `spike`, `elevated`, `hot` |
| `credit` | `firm`, `ok`, `soft` |
| `lead` | `cyclicals`, `narrow`, `defensive` |

Meaning:
- **ma** — `stacked` price>20/50/100/200 rising · `above200` above 50&200, odd 20-break · `stretched` far above bands · `lost20` below 20, holds 50/200 · `below50` below 50, 20 rolling, 200 in play · `below200` below 200, 50≤200 · `washed` deeply oversold · `flat` flat 20/50 whipsaw.
- **breadth** — `broad` · `positive` · `crowded` (euphoric) · `weak` · `mixed`.
- **vol** — `contained` · `spike` · `elevated` · `hot`.
- **credit** — `firm` · `ok` · `soft`.
- **lead** — `cyclicals` · `narrow` · `defensive`.

Set `inputs` consistent with the panels above (e.g. if breadth rows are mostly `neg`, `breadth` is probably `weak`).

### `decision` — your FINAL call (written, not computed)
```json
"decision": {
  "bias": "cautious",            // risk-on | neutral | cautious | risk-off  (colors the badge)
  "stance": "Reduce gross, hold core, hedge tail",
  "keyLevels": "support / resistance with the cluster logic",
  "invalidation": "what would flip the call",
  "watching": ["tiebreaker 1", "tiebreaker 2", "..."]
}
```

### `agentCommentary`
Free prose: what changed, how the panels line up (confirm vs deny), your reasoning into the stance.

## Constraints
- Edit **only** `macro-trader-data.json`. Keep it **valid JSON** (no comments, no trailing commas).
- Use the exact `inputs` strings, or the regime won't compute.
- Tag every panel/indicator row with `tone` so the evidence bar is meaningful.
- The HTML carries a copy of this data inside a `<script id="snap-fallback">` block used only when the page is opened as a local file. If you change the schema, keep that fallback in sync (optional — it's just the offline default).

## Hosting note
The page loads the JSON via `fetch`, which needs **http** (a hosted site or local server).
Opened as a double-clicked local file it falls back to the embedded defaults and shows a notice — expected.
