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
   ║      Last reviewed: June 11, 2026 close latest available.                ║
   ║                                                                         ║
   ═══════════════════════════════════════════════════════════════════════ */

window.MARKET_LIVE = {

  /* ══════════════════════════════════════════════════════════════════════════
     §1 · SNAPSHOT METADATA
     The "as-of" header used by every dashboard.
     ══════════════════════════════════════════════════════════════════════════ */
  asOfLong:           'June 11, 2026',
  asOfShort:          'Jun 11',
  asOfDow:            'Thu, Jun 11, 2026',


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
  spxClose:           '7,394.30',     // S&P 500
  spxChg:             '+1.75%',       // 1D
  spx1W:              '-2.51%',       // SPY 5-session proxy, Nasdaq chart, 2026-06-11
  spxYTD:             '+7.81%',       // AP market summary, 2026-06-11
  // MA distance series for the Technical Analysis section.
  //   Formula: (close / MA − 1) × 100, signed (above MA = positive).
  //   Refreshed from Yahoo Finance daily close history, 2026-06-11 latest close.
  //   Cross-check source pattern: investing.com/indices/<index>-technical "Moving Averages" table
  spxTo20ema:         '-0.38%',       // 20d EMA 7,452.84
  spxTo50ma:          '+2.26%',       // 50d SMA 7,155.96
  spxTo200ma:         '+7.52%',      // 200d SMA 6,858.26
  dowClose:           '50,848.75',    // Dow Jones Industrial Average
  dowChg:             '+1.86%',
  dow1W:              '-1.38%',       // DIA 5-session proxy, Nasdaq chart, 2026-06-11
  dowYTD:             '+5.10%',        // AP market summary, 2026-06-11
  dowTo20ema:         '+0.75%',       // 20d EMA 50,411.44
  dowTo50ma:          '+2.80%',       // 50d SMA 49,071.02
  dowTo200ma:         '+5.93%',       // 200d SMA 47,891.97
  ndxClose:           '29,446.18',    // Nasdaq 100
  ndxChg:             '+3.29%',
  ndx1W:              '-3.16%',
  ndxYTD:             '+16.82%',      // Nasdaq close vs 2025 year-end, 2026-06-11
  ndxTo20ema:         '+0.30%',       // 20d EMA 29,481.38
  ndxTo50ma:          '+5.52%',      // 50d SMA 27,446.08
  ndxTo200ma:         '+14.72%',      // 200d SMA 25,552.25
  ixicClose:          '25,809.66',    // Nasdaq Composite
  ixicChg:            '+2.54%',
  ixic1W:             '-3.81%',       // Nasdaq Composite 5-session return, 2026-06-11
  ixicYTD:            '+11.08%',       // AP market summary, 2026-06-11
  rutClose:           '2,921.03',     // Russell 2000
  rutChg:             '+3.02%',
  rut1W:              '-0.49%',       // IWM 5-session proxy, Nasdaq chart, 2026-06-11
  rutYTD:             '+16.46%',       // AP market summary, 2026-06-11
  rutTo20ema:         '+1.88%',       // 20d EMA 2,865.16
  rutTo50ma:          '+4.64%',       // 50d SMA 2,758.96
  rutTo200ma:         '+13.09%',      // 200d SMA 2,571.77
  rspClose:           '$209.75',      // Invesco S&P 500 Equal-Weight ETF (breadth proxy)
  rspChg:             '+1.56%',
  rsp1W:              '-0.51%',
  rspYTD:             '+8.76%',       // Nasdaq chart return, 2026-06-11

  // ── S&P 500 Growth-vs-Value factor read (replaced IXIC in §2 — IXIC/NDX are
  //    ~95% correlated, factor split adds unique signal). Source: SPYG / SPYV
  //    Yahoo Finance chart return, 2026-06-11 close. gvSpreadYTD =
  //    SPYG − SPYV in percentage points (positive = growth-led tape).
  //    1D / 1W spread = (today's/this-week's SPYG % − SPYV %) — fill on refresh.
  //    Note: NDX is mostly growth, so this tile mostly tells you whether the
  //    rally is *broadening into value* or *narrowing into growth*.
  spygYTD:            '+9.06%',      // SPDR Portfolio S&P 500 Growth ETF
  spyvYTD:            '+6.83%',       // SPDR Portfolio S&P 500 Value ETF
  gvSpreadYTD:        '+2.23pp',      // SPYG − SPYV
  gvSpread1D:         '+1.13pp',
  gvSpread1W:         '-3.07pp',


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
  nvdaChg:            '+2.22%',       // NVIDIA · 1D
  nvda1W:             '-6.31%',
  nvda1M:             '-7.21%',
  nvdaYTD:            '+8.48%',
  nvdaWt:             '~8.1%',
  googlChg:           '+0.39%',       // Alphabet Class A · 1D
  googl1W:            '-3.87%',
  googl1M:            '-7.64%',
  googlYTD:           '+13.52%',
  googlWt:            '~7.3%',
  aaplChg:            '+1.39%',       // Apple · 1D
  aapl1W:             '-5.01%',
  aapl1M:             '+0.28%',
  aaplYTD:            '+9.08%',
  aaplWt:             '~6.5%',
  msftChg:            '-1.77%',       // Microsoft · 1D
  msft1W:             '-8.81%',
  msft1M:             '-4.27%',
  msftYTD:            '-17.47%',
  msftWt:             '~4.4%',
  amznChg:            '+1.47%',       // Amazon · 1D
  amzn1W:             '-4.84%',
  amzn1M:             '-9.15%',
  amznYTD:            '+6.63%',
  amznWt:             '~4.3%',
  tslaChg:            '+4.60%',       // Tesla · 1D
  tsla1W:             '-4.61%',
  tsla1M:             '-7.91%',
  tslaYTD:            '-8.88%',
  tslaWt:             '~2.5%',
  metaChg:            '-0.45%',       // Meta Platforms · 1D
  meta1W:             '-9.42%',
  meta1M:             '-5.73%',
  metaYTD:            '-12.60%',
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
  xlkChg:             '+3.73%',          // Technology · 1D
  xlk1W:              '-5.16%',
  xlk1M:              '+4.57%',
  xlkYTD:             '+26.96%',
  xlkWt:              '35.99%',
  xlfChg:             '+0.75%',          // Financials · 1D
  xlf1W:              '+0.82%',
  xlf1M:              '+2.02%',
  xlfYTD:             '-4.21%',
  xlfWt:              '11.75%',
  xleChg:             '-1.94%',          // Energy · 1D
  xle1W:              '-2.77%',
  xle1M:              '-0.78%',
  xleYTD:             '+25.13%',
  xleWt:              '3.26%',
  xliChg:             '+3.24%',          // Industrials · 1D
  xli1W:              '-0.57%',
  xli1M:              '+0.46%',
  xliYTD:             '+10.87%',
  xliWt:              '8.03%',
  xlyChg:             '+2.48%',          // Consumer Discretionary · 1D
  xly1W:              '-0.82%',
  xly1M:              '-1.68%',
  xlyYTD:             '-1.73%',
  xlyWt:              '10.28%',
  xlpChg:             '-0.26%',          // Consumer Staples · 1D
  xlp1W:              '+3.94%',
  xlp1M:              '+0.98%',
  xlpYTD:             '+9.76%',
  xlpWt:              '5.34%',
  xlvChg:             '+0.81%',          // Health Care · 1D
  xlv1W:              '+1.32%',
  xlv1M:              '+5.65%',
  xlvYTD:             '-0.91%',
  xlvWt:              '8.15%',
  xluChg:             '+0.11%',          // Utilities · 1D
  xlu1W:              '+0.25%',
  xlu1M:              '-2.52%',
  xluYTD:             '+2.01%',
  xluWt:              '2.08%',
  xlbChg:             '+3.27%',          // Materials · 1D
  xlb1W:              '-0.77%',
  xlb1M:              '-1.76%',
  xlbYTD:             '+11.06%',
  xlbWt:              '1.76%',
  xlreChg:            '-0.16%',          // Real Estate · 1D
  xlre1W:             '+1.17%',
  xlre1M:             '+0.76%',
  xlreYTD:            '+11.24%',
  xlreWt:             '1.83%',
  xlcChg:             '+1.00%',          // Communication Services · 1D
  xlc1W:              '-0.88%',
  xlc1M:              '-3.23%',
  xlcYTD:             '-4.09%',
  xlcWt:              '11.56%',
  smhChg:             '+6.75%',          // VanEck Semis (AI capex bellwether) · 1D
  smh1W:              '-2.88%',
  smh1M:              '+8.59%',
  smhYTD:             '+63.26%',
  smhWt:              '—',               // Not a GICS sector — subset of XLK


  /* ══════════════════════════════════════════════════════════════════════════
     §5 · DOW THEORY ADJUNCTS
     Trend-first view on Daily Briefing: 1D / 1W / YTD returns (no index level).
     Index levels (djt, dju) retained for any other dashboards that consume them.
     Sources:
       · 1D / 1W / YTD — Yahoo Finance chart data, 2026-06-11 close
                          (1W = 5 trading sessions).
     ══════════════════════════════════════════════════════════════════════════ */
  djt:                '22,523.74',     // Dow Jones Transportation Average · level retained
  djtChg:             '+3.21%',        // 1D
  djt1W:              '+3.45%',
  djtYTD:             '+28.45%',
  dju:                '1,104.69',      // Dow Jones Utilities Average · level retained
  djuChg:             '+0.27%',        // 1D
  dju1W:              '+0.47%',
  djuYTD:             '+2.50%',


  /* ══════════════════════════════════════════════════════════════════════════
     §6 · INTERNATIONAL EQUITIES · DEVELOPED
     Trend-first view: 1D / 1W / YTD returns (no index level on Daily Briefing).
     Index level fields retained for other dashboards.
     Sources: Yahoo Finance chart data through Jun 11/12, 2026 where markets were open.
     ══════════════════════════════════════════════════════════════════════════ */
  stoxx600Close:      '621.53',        // STOXX Europe 600
  stoxx600Chg:        '+0.54%',
  stoxx6001W:         '-0.47%',
  stoxx600YTD:        '+3.29%',
  dax:                '24,209.71',     // DAX 40 (Germany)
  daxChg:             '+0.06%',
  dax1W:              '-2.95%',
  daxYTD:             '-1.34%',
  ftse100:            '10,303.90',     // FTSE 100 (UK)
  ftse100Chg:         '+0.48%',
  ftse1001W:          '-0.54%',
  ftse100YTD:         '+3.55%',
  cac40:              '8,200.80',      // CAC 40 (France)
  cac40Chg:           '+0.48%',
  cac401W:            '-0.53%',
  cac40YTD:           '+0.07%',
  nikkei225Close:     '66,442.95',     // Nikkei 225 (Japan)
  nikkei225Chg:       '+3.47%',
  nikkei2251W:        '-0.22%',
  nikkei225YTD:       '+28.19%',
  kospi:              '8,363.44',      // KOSPI (Korea)
  kospiChg:           '+7.72%',
  kospi1W:            '+2.49%',
  kospiYTD:           '+94.06%',
  asx200:             '8,799.10',      // S&P/ASX 200 (Australia)
  asx200Chg:          '+1.92%',
  asx2001W:           '+1.30%',
  asx200YTD:          '+0.82%',
  tsx:                '34,671.46',     // S&P/TSX Composite (Canada)
  tsxChg:             '+1.52%',
  tsx1W:              '-1.55%',
  tsxYTD:             '+8.74%',


  /* ══════════════════════════════════════════════════════════════════════════
     §7 · INTERNATIONAL EQUITIES · EMERGING
     Trend-first view: 1D / 1W / YTD returns (no index level on Daily Briefing).
     Sources: Yahoo Finance chart data through Jun 11/12, 2026 where markets were open.
     ══════════════════════════════════════════════════════════════════════════ */
  hangSengClose:      '24,597.92',     // Hang Seng (Hong Kong)
  hangSengChg:        '+1.44%',
  hangSeng1W:         '-1.46%',
  hangSengYTD:        '-6.61%',
  csi300Close:        '4,781.60',      // CSI 300 (mainland China)
  csi300Chg:          '+1.25%',
  csi3001W:           '-0.73%',
  csi300YTD:          '+1.35%',
  nifty50:            '23,161.60',     // Nifty 50 (India)
  nifty50Chg:         '-0.23%',
  nifty501W:          '-1.09%',
  nifty50YTD:         '-11.42%',
  bovespa:            '171,497.23',    // Bovespa (Brazil)
  bovespaChg:         '+1.71%',
  bovespa1W:          '+0.68%',
  bovespaYTD:         '+6.83%',


  /* ══════════════════════════════════════════════════════════════════════════
     §8 · TREASURY YIELDS
     Source: Treasury.gov / FRED for official curve; 2Y/10Y refreshed from
     market yield quotes on 2026-06-11 where official daily data lagged.
     ══════════════════════════════════════════════════════════════════════════ */
  yld2yFull:          '4.1400%',
  yld2y:              '4.14%',
  yld5y:              '4.260%',
  yld10yFull:         '4.5300%',
  yld10y:             '4.53%',
  yld30yFull:         '4.9600%',
  yld30y:             '4.96%',
  yld10yReal:         '2.200%',       // 10Y TIPS real yield


  /* ══════════════════════════════════════════════════════════════════════════
     §9 · YIELD CURVE & INFLATION EXPECTATIONS
     Source: FRED (T10YIE, T5YIE), Treasury.gov.
     ══════════════════════════════════════════════════════════════════════════ */
  curve2s10s:         '+0.39%',       // 10Y minus 2Y
  curve2s30s:         '+0.82%',          // 30Y minus 2Y
  curve5s30s:         '+0.70%',          // 30Y minus 5Y
  breakeven5y:        '2.44%',          // 5Y breakeven inflation (FRED T5YIE)
  breakeven10y:       '2.34%',        // 10Y breakeven inflation (FRED T10YIE)


  /* ══════════════════════════════════════════════════════════════════════════
     §10 · CREDIT SPREADS
     Source: ICE BofA via FRED (BAMLH0A0HYM2, BAMLC0A0CM).
     ══════════════════════════════════════════════════════════════════════════ */
  hyOas:              '2.78%',        // ICE BofA High Yield OAS
  igOas:              '0.75%',        // ICE BofA Investment Grade OAS
  bbOas:              '1.68%',        // ICE BofA BB-rated OAS


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
  hyg:                '$79.94',          // iShares iBoxx HY Corporate Bond
  hygChg:             '+0.59%',
  hyg1W:              '+0.14%',           // Nasdaq chart 5-session return, 2026-06-11
  hygYTD:             '-0.90%',          // Nasdaq chart return, 2026-06-11
  hygYld:             '6.52%',           // 30-day SEC yield, 2026-05-21
  lqd:                '$109.08',         // iShares iBoxx IG Corporate Bond
  lqdChg:             '+0.85%',
  lqd1W:              '+0.21%',           // Nasdaq chart 5-session return, 2026-06-11
  lqdYTD:             '-0.98%',          // Nasdaq chart return, 2026-06-11
  lqdYld:             '5.24%',           // 30-day SEC yield, 2026-05-21
  tlt:                '$85.98',          // iShares 20+ Year Treasury Bond
  tltChg:             '+1.30%',
  tlt1W:              '+0.56%',           // Nasdaq chart 5-session return, 2026-06-11
  tltYTD:             '-1.21%',          // Nasdaq chart return, 2026-06-11
  tltYld:             '5.02%',           // 30-day SEC yield, 2026-05-21
  ief:                '$94.34',          // iShares 7-10 Year Treasury Bond
  iefChg:             '+0.69%',
  ief1W:              '+0.23%',           // Nasdaq chart 5-session return, 2026-06-11
  iefYTD:             '-1.81%',          // Nasdaq chart return, 2026-06-11
  iefYld:             '4.27%',           // 30-day SEC yield, 2026-05-21
  bil:                '$91.48',          // SPDR 1-3 Month T-Bill
  bilChg:             '+0.01%',
  bil1W:              '+0.08%',          // Nasdaq chart 5-session return, 2026-06-11
  bilYTD:             '+0.07%',          // Nasdaq chart return, 2026-06-11
  bilYld:             '3.91%',           // SSGA dividend yield ≈ 30-day SEC yield, 2026-05-19


  /* ══════════════════════════════════════════════════════════════════════════
     §12 · VOLATILITY
     Source: Cboe (vix.com, dashboards) / FRED (VIXCLS).
     ══════════════════════════════════════════════════════════════════════════ */
  vix:                '19.44',        // VIX (30-day SPX vol)
  vvix:               '100.63',        // VIX of VIX (referenced in SP500_DCA)
  vix9d:              '20.66',          // 9-day VIX (short-term)
  vix3m:              '21.42',          // 3-month VIX
  move:               '73.95',        // MOVE Index (Treasury vol)
  skew:               '143.08',          // Cboe SKEW (tail risk)
  ovx:                '60.28',          // Oil VIX (Cboe)


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
     from Yahoo Finance chart data, 2026-06-11 latest.
     YTD = spot rate % change YTD (positive = numerator currency strengthened
     vs denominator). Pull from Yahoo Finance per-pair "YTD" or compute as
     (current rate ÷ Dec 31 2025 close − 1). Placeholders until refreshed.
     ══════════════════════════════════════════════════════════════════════════ */
  dxy:                '99.81',       // U.S. Dollar Index
  dxyChg:             '-0.05%',
  dxyYTD:             '+1.42%',
  eurUsd:             '1.1570',
  eurUsdChg:          '+0.30%',
  eurUsdYTD:          '-1.54%',
  usdJpy:             '160.2690',
  usdJpyChg:          '-0.16%',
  usdJpyYTD:          '+2.26%',
  gbpUsd:             '1.3408',          // Cable
  gbpUsdChg:          '+0.34%',
  gbpUsdYTD:          '-0.49%',
  audUsd:             '0.7035',          // Aussie
  audUsdChg:          '+0.59%',
  audUsdYTD:          '+5.35%',
  usdCad:             '1.3977',          // Loonie
  usdCadChg:          '+0.22%',
  usdCadYTD:          '+1.91%',
  usdChf:             '0.7959',          // Swiss
  usdChfChg:          '-0.50%',
  usdChfYTD:          '+0.49%',
  usdCny:             '6.7651',
  usdCnyChg:          '-0.11%',
  usdCnyYTD:          '-3.30%',


  /* ══════════════════════════════════════════════════════════════════════════
     §16 · CURRENCIES · EMERGING
     Source: Stooq / TradingEconomics / Investing.com; YTD refreshed from Yahoo
     Finance chart data, 2026-06-11 latest.
     YTD convention: spot % change YTD (positive = USD strengthened vs EM ccy).
     ══════════════════════════════════════════════════════════════════════════ */
  usdMxn:             '17.2450',          // Peso
  usdMxnChg:          '-1.01%',
  usdMxnYTD:          '-4.11%',
  usdInr:             '95.64',          // Indian rupee
  usdInrChg:          '+0.30%',
  usdInrYTD:          '+6.32%',
  usdKrw:             '1,520.45',          // Korean won
  usdKrwChg:          '-0.30%',
  usdKrwYTD:          '+5.32%',
  usdBrl:             '5.1921',          // Brazilian real
  usdBrlChg:          '+0.04%',
  usdBrlYTD:          '-5.89%',


  /* ══════════════════════════════════════════════════════════════════════════
     §17 · COMMODITIES · ENERGY
     Source: NYMEX (CL/HO/NG), ICE (Brent), AP / Stooq. EIA for context.
     Missing YTD fields refreshed from Yahoo Finance chart data, 2026-06-11 latest.
     YTD = spot/front-month futures % change YTD. Pull from exchange data,
     Yahoo Finance futures history, CME Group, ICE, or barchart.com.
     ══════════════════════════════════════════════════════════════════════════ */
  brent:              '$89.40',      // Brent crude (per barrel)
  brentChg:           '-3.97%',
  brentYTD:           '+47.16%',
  wti:                '$86.86',       // WTI crude front-month
  wtiChg:             '-3.52%',
  wtiYTD:             '+51.54%',
  natgas:             '$3.08',        // Henry Hub natural gas (per MMBtu)
  natgasChg:          '-3.39%',
  natgasYTD:          '-14.95%',
  heatingOil:         '$3.4703',          // NY Harbor heating oil
  heatingOilChg:      '-3.94%',
  heatingOilYTD:      '+64.07%',
  gasoline:           '$3.0098',          // RBOB gasoline
  gasolineChg:        '-3.22%',
  gasolineYTD:        '+77.23%',


  /* ══════════════════════════════════════════════════════════════════════════
     §18 · COMMODITIES · PRECIOUS METALS
     Source: Stooq / Kitco / TradingEconomics / Bloomberg; YTD refreshed from
     Yahoo Finance futures chart data, 2026-06-11 latest.
     YTD = spot % change YTD. Gold ATH was $5,589.38 on 2026-01-28; spot has
     since corrected materially and is now negative YTD after the energy-driven
     inflation shock. DO NOT describe gold as
     "near record" or "in record zone" while price is materially below the
     Jan ATH — refresh ATH context whenever spot moves >5%. Note: GLD ETF on
     totalrealreturns showed +4.64% as of 2026-03-27, but gold has rallied
     and corrected since — that stale figure is NOT the current YTD.
     ══════════════════════════════════════════════════════════════════════════ */
  gold:               '$4,210.30',    // XAU/USD spot (per troy oz)
  goldChg:            '+2.49%',
  goldYTD:            '-2.41%',
  silver:             '$67.10',       // XAG/USD spot
  silverChg:          '+3.86%',
  silverYTD:          '-4.91%',
  platinum:           '$1,731.90',          // XPT/USD
  platinumChg:        '+2.60%',
  platinumYTD:        '-18.53%',
  palladium:          '$1,299.00',          // XPD/USD
  palladiumChg:       '+5.54%',
  palladiumYTD:       '-22.12%',


  /* ══════════════════════════════════════════════════════════════════════════
     §19 · COMMODITIES · INDUSTRIAL METALS
     Source: Stooq / LME / COMEX / TradingEconomics; YTD refreshed from Yahoo
     Finance chart data, 2026-06-11 latest.
     YTD = spot/front-month % change YTD. Refresh from COMEX (copper) and
     LME (aluminum) or TradingEconomics commodities page.
     ══════════════════════════════════════════════════════════════════════════ */
  copper:             '$6.40/lb',     // COMEX copper
  copperChg:          '+2.46%',
  copperYTD:          '+13.53%',
  aluminum:           '3,546.25',          // LME aluminum
  aluminumChg:        '-6.18%',
  aluminumYTD:        '+20.70%',


  /* ══════════════════════════════════════════════════════════════════════════
     §20 · COMMODITIES · AGRICULTURALS
     Source: Stooq / CME (ZW/ZC/ZS), ICE (sugar/coffee/cocoa). YTD refreshed
     from Yahoo Finance futures chart data, Jun 11/12 2026 latest.
     YTD = front-month % change YTD. Refresh from CME Group or barchart.com.
     ══════════════════════════════════════════════════════════════════════════ */
  wheat:              '$5.91',          // CBOT wheat (per bushel)
  wheatChg:           '+0.55%',
  wheatYTD:           '+16.63%',
  corn:               '$4.12',          // CBOT corn
  cornChg:            '-1.67%',
  cornYTD:            '-5.83%',
  soybeans:           '$11.1400',          // CBOT soybeans
  soybeansChg:        '-0.80%',
  soybeansYTD:        '+8.21%',
  sugar:              '$0.14',          // ICE sugar #11
  sugarChg:           '+3.23%',
  sugarYTD:           '-1.58%',
  coffee:             '$2.51',          // ICE coffee C
  coffeeChg:          '+1.15%',
  coffeeYTD:          '-29.68%',
  cocoa:              '$3,805.00',          // ICE cocoa
  cocoaChg:           '+1.28%',
  cocoaYTD:           '-35.19%',


  /* ══════════════════════════════════════════════════════════════════════════
     §21 · COMMODITIES · INDICES
     Source: Bloomberg (BCOM), Invesco/Stooq (DBC); YTD refreshed from Yahoo
     Finance chart data, 2026-06-11 close.
     YTD = index level % change YTD. Refresh from Bloomberg ticker BCOM
     and Invesco's DBC ETF page.
     ══════════════════════════════════════════════════════════════════════════ */
  bcom:               '130.97',          // Bloomberg Commodity Index
  bcomChg:            '-1.10%',
  bcomYTD:            '+19.40%',
  dbc:                '$28.85',          // Invesco DB Commodity Tracking ETF
  dbcChg:             '-1.10%',
  dbcYTD:             '+28.85%',


  /* ══════════════════════════════════════════════════════════════════════════
     §22 · CRYPTOCURRENCIES
     Source: CoinGecko / Coinbase / Yahoo Finance crypto.
     YTD = spot % change YTD (positive = rallied YTD). Refresh from CoinGecko
     "YTD" tab on each coin's page or TradingView. Coin YTD verified from
     Yahoo Finance Jan 1 history vs latest spot, 2026-06-11 UTC; total mcap from
     CoinGecko global mcap vs CoinCodex Jan 1 market overview.
     ══════════════════════════════════════════════════════════════════════════ */
  bitcoin:            '$63,511.60',   // BTC/USD
  bitcoinChg:         '+3.36%',
  bitcoinYTD:         '-28.42%',
  ethereum:           '$1,673.77',       // ETH/USD
  ethereumChg:        '+3.31%',
  ethereumYTD:        '-44.21%',
  cryptoMcap:         '$2.17T',          // Total crypto market cap (USD)
  cryptoMcapChg:      '-3.09%',
  cryptoMcapYTD:      '-13.7%',
  solana:             '$67.09',          // SOL/USD
  solanaChg:          '+6.22%',
  solanaYTD:          '-47.07%',


  /* ══════════════════════════════════════════════════════════════════════════
     §23 · FED POLICY & LIQUIDITY
     Source: Fed.gov, FRED (SOFR, RRPONTSYD, WALCL, M2SL), Treasury.gov.
     ══════════════════════════════════════════════════════════════════════════ */
  fedFundsTarget:     '3.50–3.75%',   // FOMC target range (held Apr 29)
  effFedFunds:        '3.62%',          // EFFR (effective fed funds rate)
  sofr:               '3.60%',        // Secured Overnight Financing Rate (Jun 1)
  fedBalanceSheet:    '$6.71T',          // Total assets (WALCL, $T)
  rrpBalance:         '$0.39B',       // Overnight reverse repo (Jun 2)
  tgaBalance:         '$875.71B',          // Treasury General Account
  m2Money:            '$22.80T',          // M2 money supply


  /* ══════════════════════════════════════════════════════════════════════════
     §24 · FINANCIAL CONDITIONS
     Source: Chicago Fed (NFCI/ANFCI), Goldman, Bloomberg.
     ══════════════════════════════════════════════════════════════════════════ */
  nfci:               '-0.506',       // Chicago Fed National FCI (negative = loose)
  anfci:              '-0.463',       // Adjusted NFCI
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
  cpiYoY:             '4.2%',         // CPI year-over-year (May)
  coreCpiYoY:         '2.9%',         // Core CPI year-over-year (May)
  pceYoY:             '3.8%',         // PCE year-over-year
  corePceYoY:         '3.3%',         // Core PCE year-over-year

  // ─ Inflation · Extended (PPI + market-implied) ─
  ppiYoY:             '+6.5%',        // PPI y/y (April · largest since Dec 2022)
  corePpiYoY:         '+4.9%',        // Core PPI y/y (April · 6th straight month accelerating)
  fiveYrFiveYr:       '2.24%',        // 5y5y Forward Inflation Expectations (FRED T5YIFR, May)
  nyfedCons1y:        '3.6%',         // NY Fed 1-yr Consumer Inflation Expectations (April · highest in a year)

  // ─ Labor · Core ─
  unemploymentRate:   '4.3%',         // U-3 unemployment rate
  initialClaims:      '229,000',      // Initial jobless claims
  nfpChange:          '+172,000',     // Non-farm payrolls change

  // ─ Labor · Depth (precursors + Fed-watched gauges) ─
  adpPayrolls:        '+109K',        // ADP Private Payrolls (April · beat 84K consensus)
  continuingClaims:   '1.80M',        // Continuing jobless claims (mid-May)
  avgHourlyEarnings:  '+3.4%',        // Avg hourly earnings y/y (April · wage inflation)
  joltsOpenings:      '7.6M',         // JOLTS Job Openings (April · released Jun 2)


  /* ══════════════════════════════════════════════════════════════════════════
     §25a · HOUSING
     Most rate-sensitive sector · cleanest read on Fed-tightness biting.
     Source: Freddie Mac PMMS / NAR / Census / S&P Cotality / NAHB.
     ══════════════════════════════════════════════════════════════════════════ */
  mortgage30y:        '6.55%',        // 30-Yr Fixed Mortgage Rate (Bankrate Jun 11)
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
  regimeLabel:        'Relief rally — geopolitical risk fades, inflation risk lingers',
  regimeOneLiner:     'Risk assets rebounded after Iran strike risk faded: SPX rose 1.8%, NDX gained 3.3%, semis bounced 6.8%, VIX fell below 20, and crude reversed lower even as May PPI stayed hot.',
  regimeScore:        '+1',
  regimeScoreLabel:   'Constructive · Normal tranche',
  dcaStance:          'Keep contributions on schedule at a normal tranche: price action improved and credit stabilized, but hot PPI, still-elevated oil, and mixed Mag 7 breadth argue against chasing aggressively.',
  confidence:         '7/10',
  spxNextResistance:  '7,420 – 7,520',
  spxFirstSupport:    '7,300 – 7,360',


  /* ══════════════════════════════════════════════════════════════════════════
     §29 · UPCOMING CATALYSTS · NEXT 2 WEEKS
     Refresh weekly. Each item: date, desc, impact (Done/Low/Med/High), cat.
     ══════════════════════════════════════════════════════════════════════════ */
  catalysts: [
    // ── Upcoming · Next 2 Weeks ───────────────────────────────────────────
    // Each event has 4 optional explainer fields (why · watch · bullish · bearish)
    // that surface in the click-through modal on daily_briefing.html.
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
