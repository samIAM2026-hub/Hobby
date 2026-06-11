/* ═══════════════════════════════════════════════════════════════════════════
   ║                                                                         ║
   ║      MACRO TRADER · LIVE MARKET DATA — SINGLE SOURCE OF TRUTH           ║
   ║                                                                         ║
   ║      This is the only file you edit when refreshing the dashboards.     ║
   ║      Every page in this folder reads from window.MARKET_LIVE and        ║
   ║      replaces matching [data-live="key"] spans on load.                 ║
   ║                                                                         ║
   ║      PAGES THAT CONSUME THIS FILE                                       ║
   ║        · daily_briefing.html         (the daily focus page)             ║
   ║        · live_data_viewer.html       (full read-only snapshot)          ║
   ║        · us_equity_indices_macro.html  (last-reviewed date only)        ║
   ║        · SP500_DCA_Dashboard.html    (weekly deep dive)                 ║
   ║        · earnings_briefing.html      (Q1 deep dive)                     ║
   ║        · sp500_valuation_report.html (valuation deep dive)              ║
   ║        · research_summary.html       (last-reviewed date only)          ║
   ║                                                                         ║
   ║      WHEN YOU REFRESH                                                   ║
   ║        1. Update the values in each section below.                      ║
   ║        2. Save the file. Reload any dashboard. Numbers refresh.         ║
   ║        3. Skim the prose around them — narrative qualifiers like        ║
   ║           "dropping to" / "stabilized at" / "cooled further" do NOT     ║
   ║           auto-refresh. Update those by hand if direction changed.      ║
   ║                                                                         ║
   ║      VALUE CONVENTIONS                                                  ║
   ║        · All values are strings (even numbers) — keeps formatting.      ║
   ║        · Use "TBD" or "—" where a value isn't currently sourced.        ║
   ║        · Change-percent fields use the convention "+0.37%" / "-0.13%".  ║
   ║                                                                         ║
   ║      Last reviewed: June 9, 2026 close latest available.                ║
   ║                                                                         ║
   ═══════════════════════════════════════════════════════════════════════ */

window.MARKET_LIVE = {

  /* ══════════════════════════════════════════════════════════════════════════
     §1 · SNAPSHOT METADATA
     The "as-of" header used by every dashboard.
     ══════════════════════════════════════════════════════════════════════════ */
  asOfLong:           'June 9, 2026',
  asOfShort:          'Jun 9',
  asOfDow:            'Tue, Jun 9, 2026',


  /* ══════════════════════════════════════════════════════════════════════════
     §2 · U.S. EQUITY · BROAD INDICES
     Trend-first view (mirrors §3/§4 design): no prices on Daily Briefing —
     just 1D / 1W / YTD returns. Close-level values are retained because
     other pages (SPX Key Levels in this file, SP500_DCA_Dashboard,
     earnings_briefing, sp500_valuation_report) still consume them.

     Sources:
       · Close/1D/YTD — AP market summary for SPX/Dow/COMP/RUT; Nasdaq for NDX.
       · 1W           — Nasdaq chart 5-session returns; ETF proxies used where
                        the index chart is unavailable (SPY/DIA/IWM).
       · ETF/style    — Nasdaq quote + chart data (price returns, not total return).
     ══════════════════════════════════════════════════════════════════════════ */
  spxClose:           '7,386.65',     // S&P 500
  spxChg:             '-0.26%',       // 1D
  spx1W:              '-2.96%',       // SPY 5-session proxy, Nasdaq chart, 2026-06-09
  spxYTD:             '+7.90%',       // AP market summary, 2026-06-09
  // MA distance series for the Technical Analysis section.
  //   Formula: (close / MA − 1) × 100, signed (above MA = positive).
  //   Refreshed from Yahoo Finance daily close history, 2026-06-05 latest close.
  //   Cross-check source pattern: investing.com/indices/<index>-technical "Moving Averages" table
  spxTo20ema:         '-0.93%',       // 20d EMA 7,452.84
  spxTo50ma:          '+3.18%',       // 50d SMA 7,155.96
  spxTo200ma:         '+7.66%',      // 200d SMA 6,858.26
  dowClose:           '50,872.11',    // Dow Jones Industrial Average
  dowChg:             '+0.17%',
  dow1W:              '-0.90%',       // DIA 5-session proxy, Nasdaq chart, 2026-06-09
  dowYTD:             '+5.85%',        // AP market summary, 2026-06-09
  dowTo20ema:         '+0.90%',       // 20d EMA 50,411.44
  dowTo50ma:          '+3.66%',       // 50d SMA 49,071.02
  dowTo200ma:         '+6.21%',       // 200d SMA 47,891.97
  ndxClose:           '29,084.50',    // Nasdaq 100
  ndxChg:             '-1.12%',
  ndx1W:              '-5.14%',
  ndxYTD:             '+15.19%',      // Nasdaq close vs 2025 year-end, 2026-06-09
  ndxTo20ema:         '-1.78%',       // 20d EMA 29,481.38
  ndxTo50ma:          '+5.51%',      // 50d SMA 27,446.08
  ndxTo200ma:         '+13.33%',      // 200d SMA 25,552.25
  ixicClose:          '25,678.82',    // Nasdaq Composite
  ixicChg:            '-0.97%',
  ixic1W:             '-5.22%',       // Nasdaq Composite 5-session return, 2026-06-09
  ixicYTD:            '+10.48%',       // AP market summary, 2026-06-09
  rutClose:           '2,867.02',     // Russell 2000
  rutChg:             '+0.41%',
  rut1W:              '-2.28%',       // IWM 5-session proxy, Nasdaq chart, 2026-06-09
  rutYTD:             '+15.52%',       // AP market summary, 2026-06-09
  rutTo20ema:         '-1.10%',       // 20d EMA 2,865.16
  rutTo50ma:          '+2.70%',       // 50d SMA 2,758.96
  rutTo200ma:         '+10.18%',      // 200d SMA 2,571.77
  rspClose:           '$209.19',      // Invesco S&P 500 Equal-Weight ETF (breadth proxy)
  rspChg:             '+0.76%',
  rsp1W:              '-0.40%',
  rspYTD:             '+9.20%',       // Nasdaq chart return, 2026-06-09

  // ── S&P 500 Growth-vs-Value factor read (replaced IXIC in §2 — IXIC/NDX are
  //    ~95% correlated, factor split adds unique signal). Source: SPYG / SPYV
  //    Yahoo Finance chart return, 2026-06-05 close. gvSpreadYTD =
  //    SPYG − SPYV in percentage points (positive = growth-led tape).
  //    1D / 1W spread = (today's/this-week's SPYG % − SPYV %) — fill on refresh.
  //    Note: NDX is mostly growth, so this tile mostly tells you whether the
  //    rally is *broadening into value* or *narrowing into growth*.
  spygYTD:            '+9.24%',      // SPDR Portfolio S&P 500 Growth ETF
  spyvYTD:            '+6.81%',       // SPDR Portfolio S&P 500 Value ETF
  gvSpreadYTD:        '+2.43pp',      // SPYG − SPYV
  gvSpread1D:         '-0.86pp',
  gvSpread1W:         '-4.19pp',


  /* ══════════════════════════════════════════════════════════════════════════
     §3 · U.S. EQUITY · MAGNIFICENT 7
     Trend-first view (mirrors §4 Sector ETFs): no prices, just returns
     across 1D / 1W / 1M / YTD + SPX weight badge.

     Sources:
       · 1D       — Nasdaq daily quote (refresh daily)
       · 1W / 1M  — Nasdaq chart 5-session / 1-month price return
       · YTD      — Nasdaq chart price return from 2025-12-31 close
       · Wt       — approximate SPX weight = mkt cap (Motley Fool 2026-05-14) ÷
                    SPX total mkt cap ~$67.58T (Slickcharts). Refresh from
                    slickcharts.com /sp500 on weekly cadence. GOOGL = Class A
                    only (GOOG Class C is a separate SPX constituent).

     Tiles in daily_briefing.html are ordered heaviest → lightest SPX weight.
     ══════════════════════════════════════════════════════════════════════════ */
  nvdaChg:            '-0.22%',       // NVIDIA · 1D
  nvda1W:             '-6.57%',
  nvda1M:             '-3.26%',
  nvdaYTD:            '+11.63%',
  nvdaWt:             '~8.1%',
  googlChg:           '+0.26%',       // Alphabet Class A · 1D
  googl1W:            '+0.67%',
  googl1M:            '-9.12%',
  googlYTD:           '+16.38%',
  googlWt:            '~7.3%',
  aaplChg:            '-3.64%',       // Apple · 1D
  aapl1W:             '-7.82%',
  aapl1M:             '-0.94%',
  aaplYTD:            '+6.87%',
  aaplWt:             '~6.5%',
  msftChg:            '-2.02%',       // Microsoft · 1D
  msft1W:             '-8.59%',
  msft1M:             '-2.82%',
  msftYTD:            '-16.59%',
  msftWt:             '~4.4%',
  amznChg:            '-0.42%',       // Amazon · 1D
  amzn1W:             '-4.81%',
  amzn1M:             '-10.45%',
  amznYTD:            '+5.79%',
  amznWt:             '~4.3%',
  tslaChg:            '-3.00%',       // Tesla · 1D
  tsla1W:             '-6.39%',
  tsla1M:             '-7.39%',
  tslaYTD:            '-11.79%',
  tslaWt:             '~2.5%',
  metaChg:            '-0.14%',       // Meta Platforms · 1D
  meta1W:             '-2.18%',
  meta1M:             '-4.11%',
  metaYTD:            '-11.44%',
  metaWt:             '~2.4%',


  /* ══════════════════════════════════════════════════════════════════════════
     §4 · U.S. EQUITY · SECTOR ETFs (SPDR sectors + SMH)
     Source: 1D from Nasdaq quote data (refresh daily).
             1W/1M/YTD = Nasdaq chart price return. Trend-only view —
             prices intentionally not displayed in daily_briefing.html.
             *Wt* = sector weight in S&P 500 index (sums to ~100% across
             the 11 SPDRs). Source: financecharts.com / S&P Global
             U.S. Sector Dashboard, as of 2026-05-20. SMH weight = "—"
             (it's the semis bellwether, a subset of XLK, not a sector).

     Tiles in daily_briefing.html are ordered heaviest → lightest SPX weight.
     ══════════════════════════════════════════════════════════════════════════ */
  xlkChg:             '-1.85%',          // Technology · 1D
  xlk1W:              '-8.80%',
  xlk1M:              '+2.99%',
  xlkYTD:             '+25.56%',
  xlkWt:              '35.99%',
  xlfChg:             '+0.94%',          // Financials · 1D
  xlf1W:              '+1.94%',
  xlf1M:              '+2.38%',
  xlfYTD:             '-4.22%',
  xlfWt:              '11.75%',
  xleChg:             '-1.61%',          // Energy · 1D
  xle1W:              '-0.98%',
  xle1M:              '+3.03%',
  xleYTD:             '+28.36%',
  xleWt:              '3.26%',
  xliChg:             '+1.13%',          // Industrials · 1D
  xli1W:              '+0.81%',
  xli1M:              '+1.39%',
  xliYTD:             '+13.20%',
  xliWt:              '8.03%',
  xlyChg:             '+0.42%',          // Consumer Discretionary · 1D
  xly1W:              '-1.46%',
  xly1M:              '-3.60%',
  xlyYTD:             '-2.96%',
  xlyWt:              '10.28%',
  xlpChg:             '+1.24%',          // Consumer Staples · 1D
  xlp1W:              '+2.77%',
  xlp1M:              '-0.10%',
  xlpYTD:             '+8.26%',
  xlpWt:              '5.34%',
  xlvChg:             '+1.26%',          // Health Care · 1D
  xlv1W:              '+5.58%',
  xlv1M:              '+7.72%',
  xlvYTD:             '-0.15%',
  xlvWt:              '8.15%',
  xluChg:             '+1.06%',          // Utilities · 1D
  xlu1W:              '+0.18%',
  xlu1M:              '-1.65%',
  xluYTD:             '+3.02%',
  xluWt:              '2.08%',
  xlbChg:             '+1.62%',          // Materials · 1D
  xlb1W:              '-1.46%',
  xlb1M:              '-1.59%',
  xlbYTD:             '+11.95%',
  xlbWt:              '1.76%',
  xlreChg:            '+2.13%',          // Real Estate · 1D
  xlre1W:             '+3.40%',
  xlre1M:             '+1.26%',
  xlreYTD:            '+11.45%',
  xlreWt:             '1.83%',
  xlcChg:             '+0.35%',          // Communication Services · 1D
  xlc1W:              '-1.84%',
  xlc1M:              '-4.67%',
  xlcYTD:             '-5.30%',
  xlcWt:              '11.56%',
  smhChg:             '-1.20%',          // VanEck Semis (AI capex bellwether) · 1D
  smh1W:              '-6.52%',
  smh1M:              '+4.32%',
  smhYTD:             '+64.11%',
  smhWt:              '—',               // Not a GICS sector — subset of XLK


  /* ══════════════════════════════════════════════════════════════════════════
     §5 · DOW THEORY ADJUNCTS
     Trend-first view on Daily Briefing: 1D / 1W / YTD returns (no index level).
     Index levels (djt, dju) retained for any other dashboards that consume them.
     Sources:
       · 1D / 1W / YTD — Yahoo Finance chart data, 2026-06-05 close
                          (1W = 5 trading sessions).
     ══════════════════════════════════════════════════════════════════════════ */
  djt:                '21,913.53',     // Dow Jones Transportation Average · level retained
  djtChg:             '+0.65%',        // 1D
  djt1W:              '+2.35%',
  djtYTD:             '+24.97%',
  dju:                '1,110.30',      // Dow Jones Utilities Average · level retained
  djuChg:             '+0.98%',        // 1D
  dju1W:              '+0.07%',
  djuYTD:             '+3.02%',


  /* ══════════════════════════════════════════════════════════════════════════
     §6 · INTERNATIONAL EQUITIES · DEVELOPED
     Trend-first view: 1D / 1W / YTD returns (no index level on Daily Briefing).
     Index level fields retained for other dashboards.
     Sources: Yahoo Finance chart data through 2026-06-05 where markets were open.
     ══════════════════════════════════════════════════════════════════════════ */
  stoxx600Close:      '622.66',        // STOXX Europe 600
  stoxx600Chg:        '-0.29%',
  stoxx6001W:         '-0.53%',
  stoxx600YTD:        '+3.47%',
  dax:                '24,759.05',     // DAX 40 (Germany)
  daxChg:             '-0.75%',
  dax1W:              '-1.38%',
  daxYTD:             '+0.90%',
  ftse100:            '10,368.10',     // FTSE 100 (UK)
  ftse100Chg:         '+0.08%',
  ftse1001W:          '-0.40%',
  ftse100YTD:         '+4.19%',
  cac40:              '8,218.24',      // CAC 40 (France)
  cac40Chg:           '-0.32%',
  cac401W:            '+0.43%',
  cac40YTD:           '+0.28%',
  nikkei225Close:     '66,588.12',     // Nikkei 225 (Japan)
  nikkei225Chg:       '-1.31%',
  nikkei2251W:        '+0.39%',
  nikkei225YTD:       '+28.47%',
  kospi:              '8,160.59',      // KOSPI (Korea)
  kospiChg:           '-5.54%',
  kospi1W:            '-3.72%',
  kospiYTD:           '+89.36%',
  asx200:             '8,625.10',      // S&P/ASX 200 (Australia)
  asx200Chg:          '-0.70%',
  asx2001W:           '-1.22%',
  asx200YTD:          '-1.18%',
  tsx:                '34,413.50',     // S&P/TSX Composite (Canada)
  tsxChg:             '-2.28%',
  tsx1W:              '-1.02%',
  tsxYTD:             '+7.94%',


  /* ══════════════════════════════════════════════════════════════════════════
     §7 · INTERNATIONAL EQUITIES · EMERGING
     Trend-first view: 1D / 1W / YTD returns (no index level on Daily Briefing).
     Sources: Yahoo Finance chart data through 2026-06-05 where markets were open.
     ══════════════════════════════════════════════════════════════════════════ */
  hangSengClose:      '24,961.95',     // Hang Seng (Hong Kong)
  hangSengChg:        '-1.15%',
  hangSeng1W:         '-0.88%',
  hangSengYTD:        '-5.23%',
  csi300Close:        '4,816.92',      // CSI 300 (mainland China)
  csi300Chg:          '-1.79%',
  csi3001W:           '-1.54%',
  csi300YTD:          '+2.10%',
  nifty50:            '23,366.70',     // Nifty 50 (India)
  nifty50Chg:         '-0.21%',
  nifty501W:          '-0.77%',
  nifty50YTD:         '-10.63%',
  bovespa:            '169,019.00',    // Bovespa (Brazil)
  bovespaChg:         '-0.77%',
  bovespa1W:          '-2.74%',
  bovespaYTD:         '+5.28%',


  /* ══════════════════════════════════════════════════════════════════════════
     §8 · TREASURY YIELDS
     Source: Treasury.gov / FRED for official curve; 2Y/10Y refreshed from
     market yield quotes on 2026-06-05 where official daily data lagged.
     ══════════════════════════════════════════════════════════════════════════ */
  yld2yFull:          '4.1240%',
  yld2y:              '4.12%',
  yld5y:              '4.280%',
  yld10yFull:         '4.5270%',
  yld10y:             '4.53%',
  yld30yFull:         '4.9990%',
  yld30y:             '5.00%',
  yld10yReal:         '2.110%',       // 10Y TIPS real yield


  /* ══════════════════════════════════════════════════════════════════════════
     §9 · YIELD CURVE & INFLATION EXPECTATIONS
     Source: FRED (T10YIE, T5YIE), Treasury.gov.
     ══════════════════════════════════════════════════════════════════════════ */
  curve2s10s:         '+0.40%',       // 10Y minus 2Y
  curve2s30s:         '+0.88%',          // 30Y minus 2Y
  curve5s30s:         '+0.72%',          // 30Y minus 5Y
  breakeven5y:        '2.48%',          // 5Y breakeven inflation (FRED T5YIE)
  breakeven10y:       '2.36%',        // 10Y breakeven inflation (FRED T10YIE)


  /* ══════════════════════════════════════════════════════════════════════════
     §10 · CREDIT SPREADS
     Source: ICE BofA via FRED (BAMLH0A0HYM2, BAMLC0A0CM).
     ══════════════════════════════════════════════════════════════════════════ */
  hyOas:              '2.74%',        // ICE BofA High Yield OAS
  igOas:              '0.74%',        // ICE BofA Investment Grade OAS
  bbOas:              '1.65%',        // ICE BofA BB-rated OAS


  /* ══════════════════════════════════════════════════════════════════════════
     §11 · CREDIT & DURATION ETFs
     Source: 1D from Yahoo Finance / iShares site (refresh daily).
             YTD = Nasdaq chart price return unless an issuer total-return
             source is explicitly noted.
             1W   = Nasdaq chart 5-session price return.
     Trend-only view in daily_briefing.html — prices intentionally not
     displayed in the tile (legacy price keys preserved here because
     other dashboards consume them).
     Tile order in daily_briefing.html is descending YTD%.
     ══════════════════════════════════════════════════════════════════════════ */
  // Yield series: 30-day SEC yield from iShares fact sheets (May 21, 2026);
  // BIL = SSGA dividend yield (May 19) since T-bill ETFs report SEC yield ≈ div yield.
  // Refresh monthly from each issuer's fact sheet page.
  hyg:                '$79.62',          // iShares iBoxx HY Corporate Bond
  hygChg:             '+0.10%',
  hyg1W:              '-0.35%',           // Nasdaq chart 5-session return, 2026-06-09
  hygYTD:             '-1.25%',          // Nasdaq chart return, 2026-06-09
  hygYld:             '6.52%',           // 30-day SEC yield, 2026-05-21
  lqd:                '$108.41',         // iShares iBoxx IG Corporate Bond
  lqdChg:             '+0.32%',
  lqd1W:              '-0.47%',           // Nasdaq chart 5-session return, 2026-06-09
  lqdYTD:             '-1.62%',          // Nasdaq chart return, 2026-06-09
  lqdYld:             '5.24%',           // 30-day SEC yield, 2026-05-21
  tlt:                '$85.12',          // iShares 20+ Year Treasury Bond
  tltChg:             '+0.59%',
  tlt1W:              '-0.62%',           // Nasdaq chart 5-session return, 2026-06-09
  tltYTD:             '-2.34%',          // Nasdaq chart return, 2026-06-09
  tltYld:             '5.02%',           // 30-day SEC yield, 2026-05-21
  ief:                '$93.78',          // iShares 7-10 Year Treasury Bond
  iefChg:             '+0.28%',
  ief1W:              '-0.49%',           // Nasdaq chart 5-session return, 2026-06-09
  iefYTD:             '-2.48%',          // Nasdaq chart return, 2026-06-09
  iefYld:             '4.27%',           // 30-day SEC yield, 2026-05-21
  bil:                '$91.46',          // SPDR 1-3 Month T-Bill
  bilChg:             '+0.04%',
  bil1W:              '+0.08%',          // Nasdaq chart 5-session return, 2026-06-09
  bilYTD:             '+0.09%',          // Nasdaq chart return, 2026-06-09
  bilYld:             '3.91%',           // SSGA dividend yield ≈ 30-day SEC yield, 2026-05-19


  /* ══════════════════════════════════════════════════════════════════════════
     §12 · VOLATILITY
     Source: Cboe (vix.com, dashboards) / FRED (VIXCLS).
     ══════════════════════════════════════════════════════════════════════════ */
  vix:                '21.51',        // VIX (30-day SPX vol)
  vvix:               '102.04',        // VIX of VIX (referenced in SP500_DCA)
  vix9d:              '23.92',          // 9-day VIX (short-term)
  vix3m:              '21.82',          // 3-month VIX
  move:               '75.20',        // MOVE Index (Treasury vol)
  skew:               '152.25',          // Cboe SKEW (tail risk)
  ovx:                '57.75',          // Oil VIX (Cboe)


  /* ══════════════════════════════════════════════════════════════════════════
     §13 · MARKET BREADTH
     Source: stockcharts.com, barchart, FactSet.
     ══════════════════════════════════════════════════════════════════════════ */
  spxAbove50d:        '46.5%',        // % SPX members above 50-day MA
  spxAbove200d:       '55.6%',        // % SPX members above 200-day MA
  advDecLine:         '+450',          // NYSE Advance/Decline Line
  newHighLow:         '+46',          // NYSE New Highs minus New Lows


  /* ══════════════════════════════════════════════════════════════════════════
     §14 · SENTIMENT & POSITIONING
     Source: Cboe (P/C), AAII.com (sentiment), NAAIM.org.
     ══════════════════════════════════════════════════════════════════════════ */
  putCallRatio:       '0.59',         // Equity Put/Call ratio
  aaiiBull:           '31.7%',          // AAII bullish % (weekly)
  aaiiBear:           '43.6%',          // AAII bearish %
  naaim:              '82.02',          // NAAIM exposure index
  consumerConf:       '93.1',          // Conference Board Consumer Confidence (May)
  umichSent:          '49.8',          // U Michigan Consumer Sentiment


  /* ══════════════════════════════════════════════════════════════════════════
     §15 · CURRENCIES · MAJORS
     Source: Stooq / TradingEconomics / Investing.com / xe.com; YTD refreshed
     from Yahoo Finance chart data, 2026-06-05 latest.
     YTD = spot rate % change YTD (positive = numerator currency strengthened
     vs denominator). Pull from Yahoo Finance per-pair "YTD" or compute as
     (current rate ÷ Dec 31 2025 close − 1). Placeholders until refreshed.
     ══════════════════════════════════════════════════════════════════════════ */
  dxy:                '100.07',       // U.S. Dollar Index
  dxyChg:             '+0.66%',
  dxyYTD:             '+1.68%',
  eurUsd:             '1.1527',
  eurUsdChg:          '-0.73%',
  eurUsdYTD:          '-1.90%',
  usdJpy:             '160.2930',
  usdJpyChg:          '+0.19%',
  usdJpyYTD:          '+2.27%',
  gbpUsd:             '1.3336',          // Cable
  gbpUsdChg:          '-0.68%',
  gbpUsdYTD:          '-1.02%',
  audUsd:             '0.7050',          // Aussie
  audUsdChg:          '-1.16%',
  audUsdYTD:          '+5.56%',
  usdCad:             '1.3933',          // Loonie
  usdCadChg:          '+0.19%',
  usdCadYTD:          '+1.58%',
  usdChf:             '0.7962',          // Swiss
  usdChfChg:          '+0.93%',
  usdChfYTD:          '+0.53%',
  usdCny:             '6.7660',
  usdCnyChg:          '-0.11%',
  usdCnyYTD:          '-3.29%',


  /* ══════════════════════════════════════════════════════════════════════════
     §16 · CURRENCIES · EMERGING
     Source: Stooq / TradingEconomics / Investing.com; YTD refreshed from Yahoo
     Finance chart data, 2026-06-05 latest.
     YTD convention: spot % change YTD (positive = USD strengthened vs EM ccy).
     ══════════════════════════════════════════════════════════════════════════ */
  usdMxn:             '17.4630',          // Peso
  usdMxnChg:          '+1.07%',
  usdMxnYTD:          '-2.90%',
  usdInr:             '94.9500',          // Indian rupee
  usdInrChg:          '-0.88%',
  usdInrYTD:          '+5.54%',
  usdKrw:             '1,558.84',          // Korean won
  usdKrwChg:          '+1.68%',
  usdKrwYTD:          '+7.98%',
  usdBrl:             '5.1711',          // Brazilian real
  usdBrlChg:          '+2.18%',
  usdBrlYTD:          '-6.27%',


  /* ══════════════════════════════════════════════════════════════════════════
     §17 · COMMODITIES · ENERGY
     Source: NYMEX (CL/HO/NG), ICE (Brent), AP / Stooq. EIA for context.
     Missing YTD fields refreshed from Yahoo Finance chart data, 2026-06-05 latest.
     YTD = spot/front-month futures % change YTD. Pull from exchange data,
     Yahoo Finance futures history, CME Group, ICE, or barchart.com.
     ══════════════════════════════════════════════════════════════════════════ */
  brent:              '$91.45',      // Brent crude (per barrel)
  brentChg:           '-3.00%',
  brentYTD:           '+50.54%',
  wti:                '$88.20',       // WTI crude front-month
  wtiChg:             '-3.40%',
  wtiYTD:             '+53.88%',
  natgas:             '$3.23',        // Henry Hub natural gas (per MMBtu)
  natgasChg:          '-3.21%',
  natgasYTD:          '-10.75%',
  heatingOil:         '$3.5874',          // NY Harbor heating oil
  heatingOilChg:      '-2.35%',
  heatingOilYTD:      '+69.61%',
  gasoline:           '$3.0459',          // RBOB gasoline
  gasolineChg:        '+0.25%',
  gasolineYTD:        '+79.36%',


  /* ══════════════════════════════════════════════════════════════════════════
     §18 · COMMODITIES · PRECIOUS METALS
     Source: Stooq / Kitco / TradingEconomics / Bloomberg; YTD refreshed from
     Yahoo Finance futures chart data, 2026-06-05 latest.
     YTD = spot % change YTD. Gold ATH was $5,589.38 on 2026-01-28; spot has
     since corrected to ~$4,337 (~-22% from peak) but is still positive YTD
     on structural CB buying + geopolitical hedge. DO NOT describe gold as
     "near record" or "in record zone" while price is materially below the
     Jan ATH — refresh ATH context whenever spot moves >5%. Note: GLD ETF on
     totalrealreturns showed +4.64% as of 2026-03-27, but gold has rallied
     and corrected since — that stale figure is NOT the current YTD.
     ══════════════════════════════════════════════════════════════════════════ */
  gold:               '$4,337.10',    // XAU/USD spot (per troy oz)
  goldChg:            '-3.10%',
  goldYTD:            '+0.53%',
  silver:             '$68.94',       // XAG/USD spot
  silverChg:          '-6.55%',
  silverYTD:          '-2.29%',
  platinum:           '$1,792.00',          // XPT/USD
  platinumChg:        '-5.39%',
  platinumYTD:        '-15.70%',
  palladium:          '$1,247.10',          // XPD/USD
  palladiumChg:       '-5.44%',
  palladiumYTD:       '-25.23%',


  /* ══════════════════════════════════════════════════════════════════════════
     §19 · COMMODITIES · INDUSTRIAL METALS
     Source: Stooq / LME / COMEX / TradingEconomics; YTD refreshed from Yahoo
     Finance chart data, 2026-06-05 latest.
     YTD = spot/front-month % change YTD. Refresh from COMEX (copper) and
     LME (aluminum) or TradingEconomics commodities page.
     ══════════════════════════════════════════════════════════════════════════ */
  copper:             '$6.26/lb',     // COMEX copper
  copperChg:          '-3.80%',
  copperYTD:          '+11.05%',
  aluminum:           '3,663.25',          // LME aluminum
  aluminumChg:        '-1.16%',
  aluminumYTD:        '+34.45%',


  /* ══════════════════════════════════════════════════════════════════════════
     §20 · COMMODITIES · AGRICULTURALS
     Source: Stooq / CME (ZW/ZC/ZS), ICE (sugar/coffee/cocoa). YTD refreshed
     from Yahoo Finance futures chart data, 2026-06-05 close.
     YTD = front-month % change YTD. Refresh from CME Group or barchart.com.
     ══════════════════════════════════════════════════════════════════════════ */
  wheat:              '$5.80',          // CBOT wheat (per bushel)
  wheatChg:           '-0.30%',
  wheatYTD:           '+14.51%',
  corn:               '$4.18',          // CBOT corn
  cornChg:            '-1.65%',
  cornYTD:            '-4.57%',
  soybeans:           '$11.2150',          // CBOT soybeans
  soybeansChg:        '-0.71%',
  soybeansYTD:        '+8.94%',
  sugar:              '$14.14',          // ICE sugar #11
  sugarChg:           '-0.91%',
  sugarYTD:           '-3.15%',
  coffee:             '$2.47',          // ICE coffee C
  coffeeChg:          '-0.26%',
  coffeeYTD:          '-31.01%',
  cocoa:              '$3,762.00',          // ICE cocoa
  cocoaChg:           '-5.12%',
  cocoaYTD:           '-35.92%',


  /* ══════════════════════════════════════════════════════════════════════════
     §21 · COMMODITIES · INDICES
     Source: Bloomberg (BCOM), Invesco/Stooq (DBC); YTD refreshed from Yahoo
     Finance chart data, 2026-06-05 close.
     YTD = index level % change YTD. Refresh from Bloomberg ticker BCOM
     and Invesco's DBC ETF page.
     ══════════════════════════════════════════════════════════════════════════ */
  bcom:               '136.20',          // Bloomberg Commodity Index
  bcomChg:            '+1.02%',
  bcomYTD:            '+24.17%',
  dbc:                '$29.23',          // Invesco DB Commodity Tracking ETF
  dbcChg:             '-2.18%',
  dbcYTD:             '+30.55%',


  /* ══════════════════════════════════════════════════════════════════════════
     §22 · CRYPTOCURRENCIES
     Source: CoinGecko / Coinbase / Yahoo Finance crypto.
     YTD = spot % change YTD (positive = rallied YTD). Refresh from CoinGecko
     "YTD" tab on each coin's page or TradingView. Coin YTD verified from
     Yahoo Finance Jan 1 history vs latest spot, 2026-06-06 UTC; total mcap from
     CoinGecko global mcap vs CoinCodex Jan 1 market overview.
     ══════════════════════════════════════════════════════════════════════════ */
  bitcoin:            '$60,961.93',   // BTC/USD
  bitcoinChg:         '-4.45%',
  bitcoinYTD:         '-31.3%',
  ethereum:           '$1,563.81',       // ETH/USD
  ethereumChg:        '-11.63%',
  ethereumYTD:        '-47.9%',
  cryptoMcap:         '$2.17T',          // Total crypto market cap (USD)
  cryptoMcapChg:      '-3.09%',
  cryptoMcapYTD:      '-13.7%',
  solana:             '$62.55',          // SOL/USD
  solanaChg:          '-8.98%',
  solanaYTD:          '-50.7%',


  /* ══════════════════════════════════════════════════════════════════════════
     §23 · FED POLICY & LIQUIDITY
     Source: Fed.gov, FRED (SOFR, RRPONTSYD, WALCL, M2SL), Treasury.gov.
     ══════════════════════════════════════════════════════════════════════════ */
  fedFundsTarget:     '3.50–3.75%',   // FOMC target range (held Apr 29)
  effFedFunds:        '3.62%',          // EFFR (effective fed funds rate)
  sofr:               '3.62%',        // Secured Overnight Financing Rate (Jun 1)
  fedBalanceSheet:    '$6.71T',          // Total assets (WALCL, $T)
  rrpBalance:         '$0.76B',       // Overnight reverse repo (Jun 2)
  tgaBalance:         '$875.71B',          // Treasury General Account
  m2Money:            '$22.80T',          // M2 money supply


  /* ══════════════════════════════════════════════════════════════════════════
     §24 · FINANCIAL CONDITIONS
     Source: Chicago Fed (NFCI/ANFCI), Goldman, Bloomberg.
     ══════════════════════════════════════════════════════════════════════════ */
  nfci:               '-0.494',       // Chicago Fed National FCI (negative = loose)
  anfci:              '-0.436',       // Adjusted NFCI
  goldmanFci:         '98.65',          // Goldman Sachs FCI
  bloombergFci:       '+0.80',          // Bloomberg US FCI


  /* ══════════════════════════════════════════════════════════════════════════
     §25 · MACRO ECONOMIC DATA
     Source: BLS / BEA / Atlanta Fed / ISM. Released monthly except claims (wkly).
     ══════════════════════════════════════════════════════════════════════════ */

  // ─ Growth / Activity ─
  ismMfgPmi:          '54.0',         // ISM Manufacturing PMI
  ismSvcPmi:          '53.6',         // ISM Services PMI
  gdpNowQ2:           '3.0%',         // Atlanta Fed GDPNow (current quarter nowcast)
  realGdpQ1:          '+1.6%',        // Q1 2026 real GDP (advance/2nd estimate)
  retailSalesMoM:     '+0.5%',        // Retail sales month-over-month

  // ─ Inflation · CPI / PCE ─
  cpiYoY:             '3.8%',         // CPI year-over-year (April)
  coreCpiYoY:         '2.7%',         // Core CPI year-over-year (April)
  pceYoY:             '3.8%',         // PCE year-over-year
  corePceYoY:         '3.3%',         // Core PCE year-over-year

  // ─ Inflation · Extended (PPI + market-implied) ─
  ppiYoY:             '+9.8%',        // PPI y/y (April · largest since Dec 2022)
  corePpiYoY:         '+3.8%',        // Core PPI y/y (April · 6th straight month accelerating)
  fiveYrFiveYr:       '2.24%',        // 5y5y Forward Inflation Expectations (FRED T5YIFR, May)
  nyfedCons1y:        '3.6%',         // NY Fed 1-yr Consumer Inflation Expectations (April · highest in a year)

  // ─ Labor · Core ─
  unemploymentRate:   '4.3%',         // U-3 unemployment rate
  initialClaims:      '225,000',      // Initial jobless claims
  nfpChange:          '+172,000',     // Non-farm payrolls change

  // ─ Labor · Depth (precursors + Fed-watched gauges) ─
  adpPayrolls:        '+109K',        // ADP Private Payrolls (April · beat 84K consensus)
  continuingClaims:   '1.78M',        // Continuing jobless claims (mid-May)
  avgHourlyEarnings:  '+3.4%',        // Avg hourly earnings y/y (April · wage inflation)
  joltsOpenings:      '7.6M',         // JOLTS Job Openings (April · released Jun 2)


  /* ══════════════════════════════════════════════════════════════════════════
     §25a · HOUSING
     Most rate-sensitive sector · cleanest read on Fed-tightness biting.
     Source: Freddie Mac PMMS / NAR / Census / S&P Cotality / NAHB.
     ══════════════════════════════════════════════════════════════════════════ */
  mortgage30y:        '6.48%',        // 30-Yr Fixed Mortgage Rate (Freddie Mac May 28)
  existingHomeSales:  '4.02M',        // Existing Home Sales SAAR (April · +0.2% m/m, flat y/y)
  housingStarts:      '1.465M',       // Privately-owned housing starts SAAR (April · −2.8% m/m)
  caseShillerHpi:     '+0.7%',        // S&P Cotality Case-Shiller National HPI y/y (Feb · 13th straight month of deceleration)
  nahbHmi:            '37',           // NAHB/Wells Fargo Housing Market Index (May · below 50)


  /* ══════════════════════════════════════════════════════════════════════════
     §26 · VALUATION ANCHORS · S&P 500
     Source: FactSet Earnings Insight (Friday), Yardeni, Shiller, Damodaran.
     ══════════════════════════════════════════════════════════════════════════ */
  fwdPe:              '21.2',         // Rounded form
  fwdPeFactSet:       '21.15',        // FactSet/Yardeni precise
  fwdEps:             '$359.81',      // Forward 12M EPS
  shillerCape:        '42.66',
  trailingEps:        '$294.25',
  trailingPe:         '25.86',


  /* ══════════════════════════════════════════════════════════════════════════
     §27 · Q1 2026 EARNINGS SEASON · CORE
     Source: FactSet Earnings Insight scorecard. Refreshes Friday.
     ══════════════════════════════════════════════════════════════════════════ */
  q1EpsGrowth:        '+28.4%',       // Blended Q1 EPS growth YoY
  q1BeatRate:         '84%',          // % reporting above EPS estimates
  q1RevBeatRate:      '81%',          // % reporting above revenue estimates
  q1NetMargin:        '14.8%',        // S&P 500 Q1 net margin (FactSet record)
  cy26EpsGrowth:      '+22.1%',       // CY2026 EPS growth estimate (FactSet May)


  /* ══════════════════════════════════════════════════════════════════════════
     §27a · EARNINGS SEASON · EXTENDED METRICS
     Backward-looking depth + forward-looking signal + concentration/quality.
     Source: FactSet Earnings Insight (May 21, 2026) plus May 29 estimate-revision update, S&P DJI, State Street, Yardeni, multpl.com.
     ══════════════════════════════════════════════════════════════════════════ */

  // ─ Backward-looking · Q1 reporting depth ─
  q1Reported:           '94%',         // % of S&P 500 that has reported
  q1RevGrowth:          '+11.6%',      // Q1 blended revenue growth YoY (FactSet)
  q1AvgEpsSurprise:     '+16.6%',      // Avg EPS beat margin (% above consensus)
  q1AvgRevSurprise:     '+1.8%',       // Avg revenue beat margin
  bestSectorBeat:       'Info Tech 97%', // Sector with highest EPS beat rate
  worstSectorBeat:      'Comm Svcs/Materials 73%', // Sectors with lowest EPS beat rate

  // ─ Forward-looking · Q2 2026 + future quarters ─
  q2EpsGrowthEst:       '+21.0%',      // Q2 2026 EPS growth estimate (FactSet May)
  q3EpsGrowthEst:       '+24.2%',      // Q3 2026 EPS growth estimate
  q4EpsGrowthEst:       '+21.7%',      // Q4 2026 EPS growth estimate
  q2RevGrowthEst:       '+11.5%',      // Q2 revenue growth estimate
  q2NegPreAnnounce:     '43',          // # companies issuing negative Q2 pre-announcements
  q2PosPreAnnounce:     '49',          // # positive Q2 pre-announcements
  cy27EpsGrowthEst:     '+15.8%',      // CY2027 EPS growth estimate (forward year)
  epsRevisionsBreadth:  '9/11 sectors up', // CY2026 EPS estimate breadth from Mar 31 to May 28

  // ─ Concentration & quality ─
  magn7EpsContribution: '61%',         // % of S&P 500 EPS growth driven by Mag 7
  exMagn7EpsGrowth:     '+17.4%',      // EPS growth ex-Mag 7 (broader market)
  spxDivYield:          '1.07%',       // S&P 500 dividend yield
  q1BuybackYield:       '1.79%',       // S&P 500 buyback yield, 12mo through Sep 2025
  payoutRatio:          '84%',         // Div + buybacks / as-reported earnings, 12mo through Sep 2025


  /* ══════════════════════════════════════════════════════════════════════════
     §28 · DAILY BRIEFING · EDITORIAL
     Short narrative fields the Daily Briefing renders. Refresh weekly when
     the regime / stance / levels change.
     ══════════════════════════════════════════════════════════════════════════ */
  regimeLabel:        'Rotation tape — AI lagging, breadth stabilizing',
  regimeOneLiner:     'Mixed but less one-way risk-off. SPX slipped 0.3%, NDX lost 1.1%, equal-weight outperformed, nine of 11 sectors rose, crude settled lower, and the 10Y yield eased near 4.53%.',
  regimeScore:        '-1',
  regimeScoreLabel:   'Cautious · Smaller tranche',
  dcaStance:          'Keep the core DCA plan alive, but favor smaller tranches while mega-cap growth and semis digest the reversal; breadth improvement argues against going fully defensive.',
  confidence:         '6/10',
  spxNextResistance:  '7,405 – 7,430',
  spxFirstSupport:    '7,320 – 7,360',


  /* ══════════════════════════════════════════════════════════════════════════
     §29 · UPCOMING CATALYSTS · NEXT 2 WEEKS
     Refresh weekly. Each item: date, desc, impact (Done/Low/Med/High), cat.
     ══════════════════════════════════════════════════════════════════════════ */
  catalysts: [
    // ── Upcoming · Next 2 Weeks ───────────────────────────────────────────
    // Each event has 4 optional explainer fields (why · watch · bullish · bearish)
    // that surface in the click-through modal on daily_briefing.html.
    {
      date: 'Wed Jun 10',
      desc: 'May CPI + 10Y Treasury reopening — inflation and duration-demand test',
      impact: 'High',
      cat: 'macro',
      why: 'CPI lands one week before FOMC. A hot print can extend the post-payrolls yield/volatility pressure; a cool print gives the Fed room to look through energy volatility.',
      watch: 'Core CPI MoM · shelter/services ex-shelter · 10Y auction tail · indirect bidder share',
      bullish: 'Core CPI cools and auction demand is solid → yields fall, VIX eases, growth and semis can repair.',
      bearish: 'Hot core CPI or weak auction demand → 10Y backs up, valuation pressure returns.'
    },
    {
      date: 'Thu Jun 11',
      desc: 'May PPI + weekly jobless claims — margin pressure and labor cooling check',
      impact: 'Med',
      cat: 'macro',
      why: 'After CPI, PPI helps determine whether input-cost pressure is broadening. Claims show whether the labor-market cooling is still orderly.',
      watch: 'Core PPI · services PPI · initial claims · continuing claims · 2Y yield reaction',
      bullish: 'Cooler PPI and contained claims → disinflation without a labor scare.',
      bearish: 'Hot PPI or a claims jump → either inflation pressure or growth concern keeps volatility elevated.'
    },
    {
      date: 'Fri Jun 12',
      desc: 'University of Michigan sentiment/prelim inflation expectations — consumer stress and inflation psychology',
      impact: 'Med',
      cat: 'macro',
      why: 'The Fed is sensitive to inflation expectations, especially when energy prices and tariffs are already in the market narrative.',
      watch: 'Headline sentiment · 1-year inflation expectations · 5-year inflation expectations · consumer discretionary reaction',
      bullish: 'Expectations ease while sentiment stabilizes → soft-landing tone improves.',
      bearish: 'Expectations rise or sentiment drops → stagflation concern resurfaces.'
    },
    {
      date: 'Tue-Wed Jun 16-17',
      desc: 'FOMC Meeting — no rate change expected; language/SEP set policy tone',
      impact: 'High',
      cat: 'fed',
      why: 'Though no rate change is expected, statement language, the Summary of Economic Projections, and the dot plot will signal how much the Fed is willing to tolerate above-target inflation.',
      watch: '2Y yield (Fed outlook proxy) · fed funds futures (implied cuts/hikes) · SPX/QQQ vs bank stocks · dot plot · SEP inflation/GDP revisions',
      bullish: 'Dovish surprise (strong hints of future cuts once inflation moderates) → equities buoyed, curve steepens (short rates fall), growth/tech outperforms.',
      bearish: 'Hawkish surprise (strong emphasis on inflation risks, hike-bias signaling) → 2Y yield spikes, curve flattens, QQQ falls, banks may outperform.'
    },
    {
      date: 'Thu Jun 18',
      desc: 'Retail sales + weekly claims — consumer resilience before holiday liquidity',
      impact: 'Med',
      cat: 'macro',
      why: 'Retail sales show whether high energy prices and weak sentiment are flowing through to spending. Claims keep the soft-landing labor read honest.',
      watch: 'Control-group retail sales · gasoline-station sales · initial claims · discretionary vs staples reaction',
      bullish: 'Solid control-group sales with contained claims → growth fears ease without forcing yields sharply higher.',
      bearish: 'Weak sales or claims deterioration → broadening slowdown concern, especially for small caps and consumer discretionary.'
    },
    {
      date: 'Fri Jun 19',
      desc: 'Juneteenth market holiday — U.S. equities and Treasurys closed',
      impact: 'Low',
      cat: 'macro',
      why: 'Holiday liquidity can amplify positioning around the FOMC aftermath and the next inflation/growth prints.',
      watch: 'Pre-holiday volume · index futures liquidity · post-FOMC sector rotation',
      bullish: 'Calm post-FOMC digestion and stable futures keep dip-buyers engaged.',
      bearish: 'Thin liquidity plus geopolitical headlines widens gaps and raises hedging demand.'
    },
  ],

};


/* ═══════════════════════════════════════════════════════════════════════════
   LOADER
   ───────────────────────────────────────────────────────────────────────────
   Replaces every [data-live="key"] element's textContent with the matching
   value above. Runs once on DOMContentLoaded. Fallback text in the HTML
   stays intact if this script fails to load.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  function applyLiveData() {
    var d = window.MARKET_LIVE || {};
    var nodes = document.querySelectorAll('[data-live]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-live');
      if (key && Object.prototype.hasOwnProperty.call(d, key)) {
        var v = d[key];
        if (typeof v === 'string') nodes[i].textContent = v;
      }
    }
    // Optional document title rewrite (pages can opt in via meta tag).
    var meta = document.querySelector('meta[name="live-title-key"]');
    if (meta) {
      var tkey = meta.getAttribute('content');
      if (tkey && d[tkey]) {
        if (document.title.indexOf('{{live:' + tkey + '}}') !== -1) {
          document.title = document.title.replace('{{live:' + tkey + '}}', d[tkey]);
        }
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLiveData);
  } else {
    applyLiveData();
  }
})();
