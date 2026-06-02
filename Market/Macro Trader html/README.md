# Macro Trader HTML

Static market dashboard and research pages for the Macro Trader workspace.

## Folder Map

- `index.html` - main hub for the site.
- `pages/` - active dashboards, briefings, and research reports.
- `assets/js/live_data.js` - shared refreshable market data used by the data-backed pages.
- `docs/` - update notes and project documentation.
- `_archive/backups/` - local backup files kept for review.
- `_archive/temp-checkouts/` - archived temporary Git checkouts kept out of the active site.

## Updating Market Data

1. Edit `assets/js/live_data.js`.
2. Open `pages/live_data_viewer.html` to review the complete data snapshot.
3. Open `pages/daily_briefing.html` and the main hub to confirm the site still loads cleanly.

## GitHub Pages

This repository is arranged for simple GitHub Pages hosting. Keep `index.html` in the repository root. Active reports live under `pages/`, while root-level redirect pages preserve older links such as `daily_briefing.html`.
