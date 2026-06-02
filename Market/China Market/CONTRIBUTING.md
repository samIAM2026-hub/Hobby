# Contributing

This repository is a static research dashboard for China A-share market, sector, industry, and ETF analysis.

## Suggested Workflow

1. Keep the current dashboard entry at `index.html`.
2. Place historical or reference dashboards in `docs/archive/`.
3. Put raw or exported datasets in `data/`.
4. Put supporting notes in `docs/`.
5. Put utility scripts in `scripts/`.
6. Add checks or test fixtures in `tests/`.

## Content Guidelines

- Keep data date ranges explicit.
- Note the source and date for market data, ETF lists, and rankings.
- Do not overwrite archived dashboards; add a new archived file when preserving an older view.
- Avoid committing private account information, API keys, brokerage statements, or unreleased personal documents.
