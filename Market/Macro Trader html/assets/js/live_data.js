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
   ║      Last reviewed: June 10, 2026 close latest available.                ║
   ║                                                                         ║
   ═══════════════════════════════════════════════════════════════════════ */

window.MARKET_LIVE = {

  /* ══════════════════════════════════════════════════════════════════════════
     §1 · SNAPSHOT METADATA
     The "as-of" header used by every dashboard.
     ══════════════════════════════════════════════════════════════════════════ */
  asOfLong:           'June 10, 2026',
  asOfShort:          'Jun 10',
  asOfDow:            'Wed, Jun 10, 2026',


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
  spxClose:           '7,266.99',     // S&P 500
  spxChg:             '-1.62%',       // 1D
  spx1W:              '-3.80%',       // SPY 5-session proxy, Nasdaq chart, 2026-06-10
  spxYTD:             '+6.16%',       // AP market summary, 2026-06-10
  // MA distance series for the Technical Analysis section.
  //   Formula: (close / MA − 1) × 100, signed (above MA = positive).
  //   Refreshed from Yahoo Finance daily close history, 2026-06-05 latest close.
  //   Cross-check source pattern: investing.com/indices/<index>-technical "Moving Averages" table
  spxTo20ema:         '-2.14%',       // 20d EMA 7,452.84
  spxTo50ma:          '+0.74%',       // 50d SMA 7,155.96
  spxTo200ma:         '+5.74%',      // 200d SMA 6,858.26
  dowClose:           '49,918.78',    // Dow Jones Industrial Average
  dowChg:             '-1.87%',
  dow1W:              '-1.52%',       // DIA 5-session proxy, Nasdaq chart, 2026-06-10
  dowYTD:             '+3.86%',        // AP market summary, 2026-06-10
  dowTo20ema:         '-1.02%',       // 20d EMA 50,411.44
  dowTo50ma:          '+1.10%',       // 50d SMA 49,071.02
  dowTo200ma:         '+4.06%',       // 200d SMA 47,891.97
  ndxClose:           '28,508.03',    // Nasdaq 100
  ndxChg:             '-1.98%',
  ndx1W:              '-6.75%',
  ndxYTD:             '+12.90%',      // Nasdaq close vs 2025 year-end, 2026-06-10
  ndxTo20ema:         '-2.87%',       // 20d EMA 29,481.38
  ndxTo50ma:          '+2.57%',      // 50d SMA 27,446.08
  ndxTo200ma:         '+11.20%',      // 200d SMA 25,552.25
  ixicClose:          '25,169.50',    // Nasdaq Composite
  ixicChg:            '-1.98%',
  ixic1W:             '-6.27%',       // Nasdaq Composite 5-session return, 2026-06-10
  ixicYTD:            '+8.29%',       // AP market summary, 2026-06-10
  rutClose:           '2,835.46',     // Russell 2000
  rutChg:             '-1.10%',
  rut1W:              '-2.01%',       // IWM 5-session proxy, Nasdaq chart, 2026-06-10
  rutYTD:             '+14.25%',       // AP market summary, 2026-06-10
  rutTo20ema:         '-0.92%',       // 20d EMA 2,865.16
  rutTo50ma:          '+1.89%',       // 50d SMA 2,758.96
  rutTo200ma:         '+9.90%',      // 200d SMA 2,571.77
  rspClose:           '$206.53',      // Invesco S&P 500 Equal-Weight ETF (breadth proxy)
  rspChg:             '-1.27%',
  rsp1W:              '-1.30%',
  rspYTD:             '+7.81%',       // Nasdaq chart return, 2026-06-10

  // ── S&P 500 Growth-vs-Value factor read (replaced IXIC in §2 — IXIC/NDX are
  //    ~95% correlated, factor split adds unique signal). Source: SPYG / SPYV
  //    Yahoo Finance chart return, 2026-06-05 close. gvSpreadYTD =
  //    SPYG − SPYV in percentage points (positive = growth-led tape).
  //    1D / 1W spread = (today's/this-week's SPYG % − SPYV %) — fill on refresh.
  //    Note: NDX is mostly growth, so this tile mostly tells you whether the
  //    rally is *broadening into value* or *narrowing into growth*.
  spygYTD:            '+6.77%',      // SPDR Portfolio S&P 500 Growth ETF
  spyvYTD:            '+5.98%',       // SPDR Portfolio S&P 500 Value ETF
  gvSpreadYTD:        '+0.78pp',      // SPYG − SPYV
  gvSpread1D:         '-1.49pp',
  gvSpread1W:         '-5.01pp',


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
  nvdaChg:            '-3.73%',       // NVIDIA · 1D
  nvda1W:             '-6.67%',
  nvda1M:             '-6.87%',
  nvdaYTD:            '+7.46%',
  nvdaWt:             '~8.1%',
  googlChg:           '-2.16%',       // Alphabet Class A · 1D
  googl1W:            '-0.73%',
  googl1M:            '-11.08%',
  googlYTD:           '+13.86%',
  googlWt:            '~7.3%',
  aaplChg:            '+0.35%',       // Apple · 1D
  aapl1W:             '-6.02%',
  aapl1M:             '-0.59%',
  aaplYTD:            '+7.25%',
  aaplWt:             '~6.5%',
  msftChg:            '-1.50%',       // Microsoft · 1D
  msft1W:             '-7.02%',
  msft1M:             '-4.28%',
  msftYTD:            '-17.84%',
  msftWt:             '~4.4%',
  amznChg:            '-2.53%',       // Amazon · 1D
  amzn1W:             '-4.81%',
  amzn1M:             '-12.72%',
  amznYTD:            '+3.11%',
  amznWt:             '~4.3%',
  tslaChg:            '-3.80%',       // Tesla · 1D
  tsla1W:             '-9.94%',
  tsla1M:             '-10.92%',
  tslaYTD:            '-15.15%',
  tslaWt:             '~2.5%',
  metaChg:            '-2.33%',       // Meta Platforms · 1D
  meta1W:             '-8.35%',
  meta1M:             '-6.34%',
  metaYTD:            '-13.50%',
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
  xlkChg:             '-2.29%',          // Technology · 1D
  xlk1W:              '-9.99%',
  xlk1M:              '+0.63%',
  xlkYTD:             '+22.69%',
  xlkWt:              '35.99%',
  xlfChg:             '-0.44%',          // Financials · 1D
  xlf1W:              '+2.67%',
  xlf1M:              '+1.93%',
  xlfYTD:             '-4.64%',
  xlfWt:              '11.75%',
  xleChg:             '+1.50%',          // Energy · 1D
  xle1W:              '-0.78%',
  xle1M:              '+4.58%',
  xleYTD:             '+30.28%',
  xleWt:              '3.26%',
  xliChg:             '-3.38%',          // Industrials · 1D
  xli1W:              '-2.52%',
  xli1M:              '-2.04%',
  xliYTD:             '+9.37%',
  xliWt:              '8.03%',
  xlyChg:             '-2.05%',          // Consumer Discretionary · 1D
  xly1W:              '-2.78%',
  xly1M:              '-5.58%',
  xlyYTD:             '-4.96%',
  xlyWt:              '10.28%',
  xlpChg:             '+1.65%',          // Consumer Staples · 1D
  xlp1W:              '+4.05%',
  xlp1M:              '+1.56%',
  xlpYTD:             '+10.05%',
  xlpWt:              '5.34%',
  xlvChg:             '-1.11%',          // Health Care · 1D
  xlv1W:              '+3.59%',
  xlv1M:              '+6.52%',
  xlvYTD:             '-1.26%',
  xlvWt:              '8.15%',
  xluChg:             '+0.05%',          // Utilities · 1D
  xlu1W:              '+0.66%',
  xlu1M:              '-1.61%',
  xluYTD:             '+3.07%',
  xluWt:              '2.08%',
  xlbChg:             '-2.30%',          // Materials · 1D
  xlb1W:              '-3.93%',
  xlb1M:              '-3.86%',
  xlbYTD:             '+9.37%',
  xlbWt:              '1.76%',
  xlreChg:            '+0.04%',          // Real Estate · 1D
  xlre1W:             '+3.40%',
  xlre1M:             '+1.31%',
  xlreYTD:            '+11.50%',
  xlreWt:             '1.83%',
  xlcChg:             '-0.42%',          // Communication Services · 1D
  xlc1W:              '-0.95%',
  xlc1M:              '-5.07%',
  xlcYTD:             '-5.70%',
  xlcWt:              '11.56%',
  smhChg:             '-3.40%',          // VanEck Semis (AI capex bellwether) · 1D
  smh1W:              '-10.50%',
  smh1M:              '+0.77%',
  smhYTD:             '+58.53%',
  smhWt:              '—',               // Not a GICS sector — subset of XLK


  /* ══════════════════════════════════════════════════════════════════════════
     §5 · DOW THEORY ADJUNCTS
     Trend-first view on Daily Briefing: 1D / 1W / YTD returns (no index level).
     Index levels (djt, dju) retained for any other dashboards that consume them.
     Sources:
       · 1D / 1W / YTD — Yahoo Finance chart data, 2026-06-05 close
                          (1W = 5 trading sessions).
     ══════════════════════════════════════════════════════════════════════════ */
  djt:                '21,822.55',     // Dow Jones Transportation Average · level retained
  djtChg:             '-2.69%',        // 1D
  djt1W:              '+1.59%',
  djtYTD:             '+25.73%',
  dju:                '1,101.76',      // Dow Jones Utilities Average · level retained
  djuChg:             '+0.10%',        // 1D
  dju1W:              '+0.64%',
  djuYTD:             '+3.15%',


  /* ══════════════════════════════════════════════════════════════════════════
     §6 · INTERNATIONAL EQUITIES · DEVELOPED
     Trend-first view: 1D / 1W / YTD returns (no index level on Daily Briefing).
     Index level fields retained for other dashboards.
     Sources: Yahoo Finance chart data through Jun 10/11, 2026 where markets were open.
     ══════════════════════════════════════════════════════════════════════════ */
  stoxx600Close:      '618.64',        // STOXX Europe 600
  stoxx600Chg:        '-0.50%',
  stoxx6001W:         '-1.07%',
  stoxx600YTD:        '+4.36%',
  dax:                '24,433.06',     // DAX 40 (Germany)
  daxChg:             '-0.74%',
  dax1W:              '-2.75%',
  daxYTD:             '-0.23%',
  ftse100:            '10,227.30',     // FTSE 100 (UK)
  ftse100Chg:         '-1.41%',
  ftse1001W:          '-1.41%',
  ftse100YTD:         '+2.98%',
  cac40:              '8,203.43',      // CAC 40 (France)
  cac40Chg:           '+0.05%',
  cac401W:            '-0.07%',
  cac40YTD:           '+0.66%',
  nikkei225Close:     '63,746.07',     // Nikkei 225 (Japan)
  nikkei225Chg:       '-2.55%',
  nikkei2251W:        '-6.81%',
  nikkei225YTD:       '+26.63%',
  kospi:              '7,685.72',      // KOSPI (Korea)
  kospiChg:           '-5.08%',
  kospi1W:            '-12.68%',
  kospiYTD:           '+82.38%',
  asx200:             '8,611.70',      // S&P/ASX 200 (Australia)
  asx200Chg:          '+0.09%',
  asx2001W:           '-1.29%',
  asx200YTD:          '-1.18%',
  tsx:                '34,151.32',     // S&P/TSX Composite (Canada)
  tsxChg:             '-0.76%',
  tsx1W:              '-1.87%',
  tsxYTD:             '+7.69%',


  /* ══════════════════════════════════════════════════════════════════════════
     §7 · INTERNATIONAL EQUITIES · EMERGING
     Trend-first view: 1D / 1W / YTD returns (no index level on Daily Briefing).
     Sources: Yahoo Finance chart data through Jun 10/11, 2026 where markets were open.
     ══════════════════════════════════════════════════════════════════════════ */
  hangSengClose:      '24,150.23',     // Hang Seng (Hong Kong)
  hangSengChg:        '-1.69%',
  hangSeng1W:         '-5.79%',
  hangSengYTD:        '-5.78%',
  csi300Close:        '4,697.77',      // CSI 300 (mainland China)
  csi300Chg:          '-2.17%',
  csi3001W:           '-4.88%',
  csi300YTD:          '+1.46%',
  nifty50:            '23,142.35',     // Nifty 50 (India)
  nifty50Chg:         '-0.43%',
  nifty501W:          '-1.12%',
  nifty50YTD:         '-11.43%',
  bovespa:            '169,813.00',    // Bovespa (Brazil)
  bovespaChg:         '+0.68%',
  bovespa1W:          '-1.39%',
  bovespaYTD:         '+5.39%',


  /* ══════════════════════════════════════════════════════════════════════════
     §8 · TREASURY YIELDS
     Source: Treasury.gov / FRED for official curve; 2Y/10Y refreshed from
     market yield quotes on 2026-06-05 where official daily data lagged.
     ══════════════════════════════════════════════════════════════════════════ */
  yld2yFull:          '4.1300%',
  yld2y:              '4.13%',
  yld5y:              '4.260%',
  yld10yFull:         '4.5420%',
  yld10y:             '4.54%',
  yld30yFull:         '5.0250%',
  yld30y:             '5.03%',
  yld10yReal:         '2.200%',       // 10Y TIPS real yield


  /* ══════════════════════════════════════════════════════════════════════════
     §9 · YIELD CURVE & INFLATION EXPECTATIONS
     Source: FRED (T10YIE, T5YIE), Treasury.gov.
     ══════════════════════════════════════════════════════════════════════════ */
  curve2s10s:         '+0.41%',       // 10Y minus 2Y
  curve2s30s:         '+0.90%',          // 30Y minus 2Y
  curve5s30s:         '+0.77%',          // 30Y minus 5Y
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
  hyg:                '$79.47',          // iShares iBoxx HY Corporate Bond
  hygChg:             '-0.19%',
  hyg1W:              '-0.26%',           // Nasdaq chart 5-session return, 2026-06-10
  hygYTD:             '-1.44%',          // Nasdaq chart return, 2026-06-10
  hygYld:             '6.52%',           // 30-day SEC yield, 2026-05-21
  lqd:                '$108.16',         // iShares iBoxx IG Corporate Bond
  lqdChg:             '-0.23%',
  lqd1W:              '-0.42%',           // Nasdaq chart 5-session return, 2026-06-10
  lqdYTD:             '-1.84%',          // Nasdaq chart return, 2026-06-10
  lqdYld:             '5.24%',           // 30-day SEC yield, 2026-05-21
  tlt:                '$84.88',          // iShares 20+ Year Treasury Bond
  tltChg:             '-0.28%',
  tlt1W:              '-0.50%',           // Nasdaq chart 5-session return, 2026-06-10
  tltYTD:             '-2.62%',          // Nasdaq chart return, 2026-06-10
  tltYld:             '5.02%',           // 30-day SEC yield, 2026-05-21
  ief:                '$93.69',          // iShares 7-10 Year Treasury Bond
  iefChg:             '-0.10%',
  ief1W:              '-0.33%',           // Nasdaq chart 5-session return, 2026-06-10
  iefYTD:             '-2.55%',          // Nasdaq chart return, 2026-06-10
  iefYld:             '4.27%',           // 30-day SEC yield, 2026-05-21
  bil:                '$91.47',          // SPDR 1-3 Month T-Bill
  bilChg:             '+0.01%',
  bil1W:              '+0.07%',          // Nasdaq chart 5-session return, 2026-06-10
  bilYTD:             '+0.10%',          // Nasdaq chart return, 2026-06-10
  bilYld:             '3.91%',           // SSGA dividend yield ≈ 30-day SEC yield, 2026-05-19


  /* ══════════════════════════════════════════════════════════════════════════
     §12 · VOLATILITY
     Source: Cboe (vix.com, dashboards) / FRED (VIXCLS).
     ══════════════════════════════════════════════════════════════════════════ */
  vix:                '22.22',        // VIX (30-day SPX vol)
  vvix:               '108.16',        // VIX of VIX (referenced in SP500_DCA)
  vix9d:              '25.67',          // 9-day VIX (short-term)
  vix3m:              '22.89',          // 3-month VIX
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
     from Yahoo Finance chart data, 2026-06-05 latest.
     YTD = spot rate % change YTD (positive = numerator currency strengthened
     vs denominator). Pull from Yahoo Finance per-pair "YTD" or compute as
     (current rate ÷ Dec 31 2025 close − 1). Placeholders until refreshed.
     ══════════════════════════════════════════════════════════════════════════ */
  dxy:                '99.96',       // U.S. Dollar Index
  dxyChg:             '+0.05%',
  dxyYTD:             '+1.71%',
  eurUsd:             '1.1549',
  eurUsdChg:          '+0.12%',
  eurUsdYTD:          '-1.69%',
  usdJpy:             '160.5180',
  usdJpyChg:          '+0.08%',
  usdJpyYTD:          '+2.62%',
  gbpUsd:             '1.3379',          // Cable
  gbpUsdChg:          '+0.05%',
  gbpUsdYTD:          '-0.65%',
  audUsd:             '0.7004',          // Aussie
  audUsdChg:          '-0.27%',
  audUsdYTD:          '+4.57%',
  usdCad:             '1.3937',          // Loonie
  usdCadChg:          '-0.12%',
  usdCadYTD:          '+1.77%',
  usdChf:             '0.7987',          // Swiss
  usdChfChg:          '-0.08%',
  usdChfYTD:          '+0.88%',
  usdCny:             '6.7741',
  usdCnyChg:          '+0.02%',
  usdCnyYTD:          '-3.17%',


  /* ══════════════════════════════════════════════════════════════════════════
     §16 · CURRENCIES · EMERGING
     Source: Stooq / TradingEconomics / Investing.com; YTD refreshed from Yahoo
     Finance chart data, 2026-06-05 latest.
     YTD convention: spot % change YTD (positive = USD strengthened vs EM ccy).
     ══════════════════════════════════════════════════════════════════════════ */
  usdMxn:             '17.3850',          // Peso
  usdMxnChg:          '-0.40%',
  usdMxnYTD:          '-3.30%',
  usdInr:             '95.56',          // Indian rupee
  usdInrChg:          '+0.21%',
  usdInrYTD:          '+6.45%',
  usdKrw:             '1,525.84',          // Korean won
  usdKrwChg:          '+0.00%',
  usdKrwYTD:          '+6.12%',
  usdBrl:             '5.1828',          // Brazilian real
  usdBrlChg:          '-0.14%',
  usdBrlYTD:          '-5.36%',


  /* ══════════════════════════════════════════════════════════════════════════
     §17 · COMMODITIES · ENERGY
     Source: NYMEX (CL/HO/NG), ICE (Brent), AP / Stooq. EIA for context.
     Missing YTD fields refreshed from Yahoo Finance chart data, 2026-06-05 latest.
     YTD = spot/front-month futures % change YTD. Pull from exchange data,
     Yahoo Finance futures history, CME Group, ICE, or barchart.com.
     ══════════════════════════════════════════════════════════════════════════ */
  brent:              '$94.93',      // Brent crude (per barrel)
  brentChg:           '+1.97%',
  brentYTD:           '+56.01%',
  wti:                '$92.06',       // WTI crude front-month
  wtiChg:             '+2.25%',
  wtiYTD:             '+60.33%',
  natgas:             '$3.20',        // Henry Hub natural gas (per MMBtu)
  natgasChg:          '+0.57%',
  natgasYTD:          '-13.10%',
  heatingOil:         '$3.6732',          // NY Harbor heating oil
  heatingOilChg:      '+1.68%',
  heatingOilYTD:      '+73.22%',
  gasoline:           '$3.1002',          // RBOB gasoline
  gasolineChg:        '-0.31%',
  gasolineYTD:        '+81.79%',


  /* ══════════════════════════════════════════════════════════════════════════
     §18 · COMMODITIES · PRECIOUS METALS
     Source: Stooq / Kitco / TradingEconomics / Bloomberg; YTD refreshed from
     Yahoo Finance futures chart data, 2026-06-05 latest.
     YTD = spot % change YTD. Gold ATH was $5,589.38 on 2026-01-28; spot has
     since corrected materially and is now negative YTD after the energy-driven
     inflation shock. DO NOT describe gold as
     "near record" or "in record zone" while price is materially below the
     Jan ATH — refresh ATH context whenever spot moves >5%. Note: GLD ETF on
     totalrealreturns showed +4.64% as of 2026-03-27, but gold has rallied
     and corrected since — that stale figure is NOT the current YTD.
     ══════════════════════════════════════════════════════════════════════════ */
  gold:               '$4,089.00',    // XAU/USD spot (per troy oz)
  goldChg:            '-0.47%',
  goldYTD:            '-5.47%',
  silver:             '$63.63',       // XAG/USD spot
  silverChg:          '-1.50%',
  silverYTD:          '-9.27%',
  platinum:           '$1,665.00',          // XPT/USD
  platinumChg:        '-1.36%',
  platinumYTD:        '-18.16%',
  palladium:          '$1,248.00',          // XPD/USD
  palladiumChg:       '+1.40%',
  palladiumYTD:       '-23.40%',


  /* ══════════════════════════════════════════════════════════════════════════
     §19 · COMMODITIES · INDUSTRIAL METALS
     Source: Stooq / LME / COMEX / TradingEconomics; YTD refreshed from Yahoo
     Finance chart data, 2026-06-05 latest.
     YTD = spot/front-month % change YTD. Refresh from COMEX (copper) and
     LME (aluminum) or TradingEconomics commodities page.
     ══════════════════════════════════════════════════════════════════════════ */
  copper:             '$6.21/lb',     // COMEX copper
  copperChg:          '-0.62%',
  copperYTD:          '+10.30%',
  aluminum:           '3,503.25',          // LME aluminum
  aluminumChg:        '-7.32%',
  aluminumYTD:        '+20.54%',


  /* ══════════════════════════════════════════════════════════════════════════
     §20 · COMMODITIES · AGRICULTURALS
     Source: Stooq / CME (ZW/ZC/ZS), ICE (sugar/coffee/cocoa). YTD refreshed
     from Yahoo Finance futures chart data, Jun 10/11 2026 latest.
     YTD = front-month % change YTD. Refresh from CME Group or barchart.com.
     ══════════════════════════════════════════════════════════════════════════ */
  wheat:              '$5.87',          // CBOT wheat (per bushel)
  wheatChg:           '-0.17%',
  wheatYTD:           '+15.68%',
  corn:               '$4.19',          // CBOT corn
  cornChg:            '-0.06%',
  cornYTD:            '-4.88%',
  soybeans:           '$11.2375',          // CBOT soybeans
  soybeansChg:        '+0.07%',
  soybeansYTD:        '+9.05%',
  sugar:              '$13.91',          // ICE sugar #11
  sugarChg:           '-1.21%',
  sugarYTD:           '-7.33%',
  coffee:             '$2.45',          // ICE coffee C
  coffeeChg:          '+0.12%',
  coffeeYTD:          '-29.84%',
  cocoa:              '$3,828.00',          // ICE cocoa
  cocoaChg:           '-0.08%',
  cocoaYTD:           '-36.88%',


  /* ══════════════════════════════════════════════════════════════════════════
     §21 · COMMODITIES · INDICES
     Source: Bloomberg (BCOM), Invesco/Stooq (DBC); YTD refreshed from Yahoo
     Finance chart data, 2026-06-05 close.
     YTD = index level % change YTD. Refresh from Bloomberg ticker BCOM
     and Invesco's DBC ETF page.
     ══════════════════════════════════════════════════════════════════════════ */
  bcom:               '130.97',          // Bloomberg Commodity Index
  bcomChg:            '-1.38%',
  bcomYTD:            '+19.40%',
  dbc:                '$29.17',          // Invesco DB Commodity Tracking ETF
  dbcChg:             '+0.34%',
  dbcYTD:             '+30.46%',


  /* ══════════════════════════════════════════════════════════════════════════
     §22 · CRYPTOCURRENCIES
     Source: CoinGecko / Coinbase / Yahoo Finance crypto.
     YTD = spot % change YTD (positive = rallied YTD). Refresh from CoinGecko
     "YTD" tab on each coin's page or TradingView. Coin YTD verified from
     Yahoo Finance Jan 1 history vs latest spot, 2026-06-11 UTC; total mcap from
     CoinGecko global mcap vs CoinCodex Jan 1 market overview.
     ══════════════════════════════════════════════════════════════════════════ */
  bitcoin:            '$62,414.23',   // BTC/USD
  bitcoinChg:         '+1.25%',
  bitcoinYTD:         '-28.7%',
  ethereum:           '$1,646.48',       // ETH/USD
  ethereumChg:        '+0.54%',
  ethereumYTD:        '-44.5%',
  cryptoMcap:         '$2.17T',          // Total crypto market cap (USD)
  cryptoMcapChg:      '-3.09%',
  cryptoMcapYTD:      '-13.7%',
  solana:             '$64.85',          // SOL/USD
  solanaChg:          '-0.17%',
  solanaYTD:          '-47.9%',


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
  regimeLabel:        'Inflation-shock risk-off — energy and defensives leading',
  regimeOneLiner:     'Risk-off reset after May CPI: SPX fell 1.6%, NDX lost 2.0%, semis dropped 3.4%, VIX rose above 22, crude rallied, and the 10Y yield held near 4.54%.',
  regimeScore:        '-2',
  regimeScoreLabel:   'Risk-off · Smallest tranche',
  dcaStance:          'Keep contributions on schedule, but use the smallest tranche while CPI, oil, and mega-cap weakness keep valuation risk elevated; wait for NDX/semis and VIX to stabilize before upsizing.',
  confidence:         '7/10',
  spxNextResistance:  '7,320 – 7,360',
  spxFirstSupport:    '7,200 – 7,240',


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
