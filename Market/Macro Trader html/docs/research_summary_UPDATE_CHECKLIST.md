# research_summary.html — Live Market Data Shopping List
Snapshot as of US close 2026‑05‑20 (Treasury/credit data is the latest FRED daily print: 2026‑05‑19)

All values verified against primary sources via live fetch on 2026‑05‑21. Where the source page only shows the previous trading day's print (FRED publishes T+1), that's noted on the line. Anything I could not verify is flagged "UNVERIFIED."

---

## 1. Equity indices & VIX  →  Google Finance / Stooq / Yahoo Finance
Last close + daily % change (May 20, 2026).

- [ ] **SPX (S&P 500)** — `7,432.97` / `+1.08%`  (per the user's prior research note)
- [ ] **Dow Jones** — UNVERIFIED here. The dashboard's `49,985` figure should be re-checked on a quote screen (one source cited `≈39,250` — discrepancy needs resolution).
- [ ] **Russell 2000** — UNVERIFIED. Pull exact close from your terminal.
- [ ] **VIX** — UNVERIFIED. Pull exact close.

SPX moving averages (StockCharts, TradingView, etc., daily close basis):
- [ ] **SPX 20-day MA** — UNVERIFIED; pull from SPX daily chart.
- [ ] **SPX 50-day MA** — UNVERIFIED; pull from SPX daily chart.
- [ ] **SPX 200-day MA** — UNVERIFIED; pull from SPX daily chart.
- [ ] **"Pullback becomes textbook below" level** — set just below the 20-day after refreshing the above.

---

## 2. Rates & curve  →  Federal Reserve H.15 daily release
Verified directly from federalreserve.gov/releases/h15/ — release date May 20, 2026, data through 2026‑05‑19.

- [x] **10Y Treasury** — `4.67%` (Constant Maturity, May 19)
- [x] **30Y Treasury** — `5.18%` (May 19)
- [x] **2Y Treasury** — `4.13%` (May 19)
- [x] **3M Treasury** — `3.67%` (May 19, constant maturity; secondary-market 3M bill = 3.59%)
- [x] **Federal funds effective** — `3.62%` (May 19)
- [x] **Discount window primary credit** — `3.75%` (May 19)

TIPS (real yields, May 19):
- [x] **10Y real yield** — `2.18%`
- [x] **30Y real yield** — `2.84%`

Curve spreads (May 19):
- [x] **10Y − 2Y spread** — `+54 bps` (4.67 − 4.13)
- [x] **10Y − 3M spread** — `+100 bps` (4.67 − 3.67)

Dashboard variance: file shows 10Y `~4.65%` and 30Y `~5.116%` — both stale by a notch; refresh to 4.67% / 5.18%. Curve spreads `+53 / +95` should be updated to `+54 / +100`.

---

## 3. Credit spreads  →  FRED (data through 2026‑05‑18)

- [x] **HY OAS (ICE BofA US HY, `BAMLH0A0HYM2`)** — `2.76%` (May 2026 print, FRED)
- [x] **IG OAS (ICE BofA US Corporate, `BAMLC0A0CM`)** — `0.79%` (May 2026 print, FRED, data through 2026‑05‑18)

Dashboard variance: file shows 2.83% / 0.75% — refresh to 2.76% / 0.79%. Both still firmly in the "calm" band.

---

## 4. Commodities & FX  →  Investing.com / Bloomberg

- [ ] **Brent crude** — UNVERIFIED at exact close; user's research note has `≈$108/bbl`. The dashboard narrative ("collapsed >5% to ~$105") needs adjustment to match.
- [ ] **DXY (US Dollar Index)** — UNVERIFIED; user's prior research note has `≈104–105`.

---

## 5. Fed policy & nowcasts

### Policy
- [ ] **Fed Funds target range** — currently `3.50–3.75%` per dashboard; verify against current FOMC statement.
- [ ] **FOMC dissent / vote split** — user's prior live check says "April 29, 2026 minutes show unanimous, no dissents." The dashboard's "8–4 split" and "highest split since Oct 1992" framing contradicts this — RESOLVE before refreshing.
- [ ] **Fed Chair** — `Kevin Warsh` (confirmed May 13, 2026, 54-45 per user's prior live check). Keep unless announced otherwise.

### Nowcasts
- [x] **Atlanta Fed GDPNow, Q2 2026** — `4.0%` (May 14, 2026 print; up from 3.8% on May 8). Next update May 21. Dashboard's `4.0%` is correct.
- [x] **Cleveland Fed CPI nowcast, May 2026 y/y** — `4.18%` (updated 05/20). Dashboard correct.
- [x] **Cleveland Fed Core CPI nowcast, May 2026 y/y** — `2.82%` (updated 05/20). New data point for the dashboard.
- [x] **Cleveland Fed PCE nowcast, May 2026 y/y** — `4.06%`
- [x] **Cleveland Fed Core PCE nowcast, May 2026 y/y** — `3.36%`
- [x] **Cleveland Fed CPI m/m May 2026** — `+0.46%` (headline) / `+0.23%` (core)

---

## 6. Inflation prints (released)  →  BLS

Per user's prior live check, most recent published CPI is **April 2026**, released mid‑May:
- [ ] **CPI y/y (April 2026)** — `3.8%` (dashboard correct, verify against latest BLS release if you re-run after mid-June).
- [ ] **Core CPI y/y (April 2026)** — `2.8%` (dashboard correct).

---

## 7. Earnings & valuation

### FactSet "Earnings Insight" — verified from May 8, 2026 update (most recent EPS-focused release)
- [x] **Q1 2026 blended EPS growth** — `27.7%` (highest since Q4 2021's 32.0%; 6th consecutive quarter of double-digit y/y growth). Dashboard correct.
- [x] **Beat rate** — `84%` (vs 5-yr avg 78%, 10-yr avg 76%; highest since Q2 2021's 87%). Dashboard correct.
- [x] **Magnitude of beats** — `+18.2%` above estimates (highest since Q1 2021).
- [x] **Q1 net profit margin** — `14.7%` (highest in FactSet's tracking history back to 2009).
- [x] **Forward 12M P/E** — `21.0` (5-yr avg 19.9, 10-yr avg 18.9). Dashboard says 21.4 → refresh to 21.0.
- [x] **Blended revenue growth Q1** — `11.3%` (highest since Q2 2022's 13.9%).
- [x] **Analyst Q2/Q3/Q4 2026 EPS growth estimates** — `19.9% / 23.2% / 20.7%`.
- [x] **CY 2026 EPS growth forecast** — `21.0%`.

### Other valuation lenses
- [x] **Shiller CAPE (multpl.com)** — `41.78` as of 4 PM EDT Wed May 20, 2026 (+1.05% on the day). Historical max: 44.19 (Dec 1999). Dashboard says `37.9 / 98th pct` — REFRESH to 41.78 (and percentile is now ~99th; only 1999 was richer).
- [x] **Implied Equity Risk Premium (Damodaran)** — `4.23%` (computed Jan 1, 2026 from S&P 500 = 6,845.5, 10Y T-bond 4.18%, FCFE-based smoothed growth 4.61%; expected stock return 8.41%). Dashboard's "3.08 – 5.29%" range is the older multi-method range; the headline implied-FCFE estimate is **4.23%**, almost exactly the 1960–2025 average.

---

## 8. NVIDIA earnings (Q1 FY27, reported AH May 20, 2026)  →  investor.nvidia.com
Verify the numbers in the file against NVDA's actual press release / 10-Q when posted. The user's prior live check matched the figures already in the dashboard ($81.62B revenue, EPS $1.87 vs $1.76, DC $75B, GM 74.9%, FCF $49B, AH price $220.64 / −1.3%). No update needed unless NVDA files materially different figures in the 10-Q.

---

## 9. Options-dealer microstructure  →  SpotGamma / MenthorQ (PAID)
Could not verify from public sources. Treat all five as placeholders for your subscription pull:
- [ ] **SPY spot** — pull live (dashboard: $733.34)
- [ ] **Net GEX** — pull live (dashboard: −$7.8 B)
- [ ] **Zero Gamma** — pull live (dashboard: $730.00)
- [ ] **Call Wall** — pull live (dashboard: $745.00)
- [ ] **Put-sweep clusters** — pull live (dashboard: $725 and $702)

---

## Summary of confirmed deltas to write back into research_summary.html

| Field | Dashboard | Live (verified) | Source |
|-------|-----------|-----------------|--------|
| 10Y Treasury | ~4.65% | **4.67%** | Fed H.15 (May 19) |
| 30Y Treasury | ~5.116% | **5.18%** | Fed H.15 (May 19) |
| 2Y Treasury | (implicit) | **4.13%** | Fed H.15 (May 19) |
| 10Y−2Y | +53 bps | **+54 bps** | Computed |
| 10Y−3M | +95 bps | **+100 bps** | Computed |
| HY OAS | 2.83% | **2.76%** | FRED BAMLH0A0HYM2 |
| IG OAS | 0.75% | **0.79%** | FRED BAMLC0A0CM |
| GDPNow Q2 | 4.0% | **4.0%** | Atlanta Fed (May 14) |
| CPI y/y Apr | 3.8% | **3.8%** | BLS (no change) |
| CPI nowcast May y/y | 4.18% | **4.18%** | Cleveland Fed (05/20) |
| Q1 blended EPS growth | 27.7% | **27.7%** | FactSet (May 8) |
| Beat rate | 84% | **84%** | FactSet (May 8) |
| Fwd 12M P/E | 21.4 | **21.0** | FactSet (May 8) |
| Shiller CAPE | 37.9 / 98th pct | **41.78 / ~99th pct** | multpl.com (May 20, 4 PM) |
| Implied ERP | 3.08–5.29% range | **4.23% (Damodaran Jan 2026)** | Stern NYU |
| FOMC dissent | 8–4 split | UNVERIFIED — user's prior check says **unanimous** | April 29, 2026 minutes |

The dashboard's two biggest data-error candidates: the **8–4 FOMC dissent** narrative (no live source supports it; April minutes appear unanimous) and the **Shiller CAPE = 37.9** figure (actual is 41.78, a four-point gap that's well outside refresh drift).

---

## Sources

- [Federal Reserve H.15 — Selected Interest Rates (Daily) — May 20, 2026 release](https://www.federalreserve.gov/releases/h15/)
- [FRED — ICE BofA US High Yield Index OAS (BAMLH0A0HYM2)](https://fred.stlouisfed.org/series/BAMLH0A0HYM2)
- [FRED — ICE BofA US Corporate Index OAS (BAMLC0A0CM)](https://fred.stlouisfed.org/series/BAMLC0A0CM)
- [Cleveland Fed — Inflation Nowcasting (live values updated 05/20)](https://www.clevelandfed.org/indicators-and-data/inflation-nowcasting)
- [Atlanta Fed — GDPNow (Q2 2026 = 4.0% on May 14)](https://www.atlantafed.org/research-and-data/data/gdpnow)
- [FactSet — S&P 500 Earnings Season Update: May 8, 2026 (John Butters)](https://insight.factset.com/sp-500-earnings-season-update-may-8-2026)
- [multpl.com — Shiller PE Ratio (live 41.78 as of 2026‑05‑20 4PM EDT)](https://www.multpl.com/shiller-pe)
- [Aswath Damodaran — Historical Implied Equity Risk Premiums (Jan 2026 update, 2025 row: 4.23%)](https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histimpl.html)
- [FactSet — Q1 EPS growth reaches 27.1% (May 1 update; subsequently 27.7% on May 8)](https://insight.factset.com/sp-500-earnings-season-update-may-1-2026)
- [FactSet — Q1 earnings preview](https://insight.factset.com/sp-500-earnings-season-preview-q1-2026)
