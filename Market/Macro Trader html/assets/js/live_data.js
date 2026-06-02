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
   ║      Last reviewed: May 29, 2026 latest available.                      ║
   ║                                                                         ║
   ═══════════════════════════════════════════════════════════════════════ */

window.MARKET_LIVE = {

  /* ══════════════════════════════════════════════════════════════════════════
     §1 · SNAPSHOT METADATA
     The "as-of" header used by every dashboard.
     ══════════════════════════════════════════════════════════════════════════ */
  asOfLong:           'May 29, 2026',
  asOfShort:          'May 29',
  asOfDow:            'Fri, May 29, 2026',


  /* ══════════════════════════════════════════════════════════════════════════
     §2 · U.S. EQUITY · BROAD INDICES
     Trend-first view (mirrors §3/§4 design): no prices on Daily Briefing —
     just 1D / 1W / YTD returns. Close-level values are retained because
     other pages (SPX Key Levels in this file, SP500_DCA_Dashboard,
     earnings_briefing, sp500_valuation_report) still consume them.

     Sources:
       · 1D       — Yahoo Finance / CNBC daily close (refresh daily)
       · 1W       — populate from each index's "5-Day" return on Yahoo Finance
                    (currently "—" placeholders — fill in next data pass)
       · YTD      — total return with dividends reinvested via
                    totalrealreturns.com (refresh weekly). ETF proxies used
                    for index YTD (SPY for SPX, DIA for Dow, QQQ for NDX,
                    IWM for RUT). IXIC (Nasdaq Composite) and RSP needed —
                    fill in on next refresh.
     ══════════════════════════════════════════════════════════════════════════ */
  spxClose:           '7,580.06',     // S&P 500
  spxChg:             '+0.22%',       // 1D
  spx1W:              '+1.80%',
  spxYTD:             '+11.24%',       // via SPY total return, 2026-05-29
  // MA distance series for the Technical Analysis section.
  //   Formula: (close / MA − 1) × 100, signed (above MA = positive).
  //   Refreshed from Yahoo Finance daily close history, 2026-05-29 latest close.
  //   Cross-check source pattern: investing.com/indices/<index>-technical "Moving Averages" table
  spxTo20ema:         '+2.46%',       // 20d EMA 7,398.30
  spxTo50ma:          '+7.39%',       // 50d SMA 7,058.17
  spxTo200ma:         '+10.97%',      // 200d SMA 6,830.83
  dowClose:           '51,032.46',    // Dow Jones Industrial Average
  dowChg:             '+0.72%',
  dow1W:              '+1.49%',
  dowYTD:             '+6.79%',       // via DIA total return, 2026-05-29
  dowTo20ema:         '+2.13%',       // 20d EMA 49,966.42
  dowTo50ma:          '+5.07%',       // 50d SMA 48,568.18
  dowTo200ma:         '+6.90%',       // 200d SMA 47,737.53
  ndxClose:           '30,333.18',    // Nasdaq 100
  ndxChg:             '+0.36%',
  ndx1W:              '+3.32%',
  ndxYTD:             '+20.34%',      // via QQQ total return, 2026-05-29
  ndxTo20ema:         '+4.43%',       // 20d EMA 29,045.97
  ndxTo50ma:          '+13.03%',      // 50d SMA 26,836.01
  ndxTo200ma:         '+19.47%',      // 200d SMA 25,389.16
  ixicClose:          '26,972.62',    // Nasdaq Composite
  ixicChg:            '+0.20%',
  ixic1W:             '+2.58%',
  ixicYTD:            '+16.05%',      // Index return, 2026-05-29
  rutClose:           '2,919.34',     // Russell 2000
  rutChg:             '-0.59%',
  rut1W:              '+2.67%',
  rutYTD:             '+18.19%',      // via IWM total return, 2026-05-29
  rutTo20ema:         '+2.63%',       // 20d EMA 2,844.47
  rutTo50ma:          '+7.39%',       // 50d SMA 2,718.34
  rutTo200ma:         '+14.18%',      // 200d SMA 2,556.70
  rspClose:           '$208.83',      // Invesco S&P 500 Equal-Weight ETF (breadth proxy)
  rspChg:             '+0.28%',
  rsp1W:              '+2.01%',
  rspYTD:             '+9.48%',       // via RSP total return, 2026-05-29

  // ── S&P 500 Growth-vs-Value factor read (replaced IXIC in §2 — IXIC/NDX are
  //    ~95% correlated, factor split adds unique signal). Source: SPYG / SPYV
  //    total return per totalrealreturns.com, 2026-05-29 close. gvSpreadYTD =
  //    SPYG − SPYV in percentage points (positive = growth-led tape).
  //    1D / 1W spread = (today's/this-week's SPYG % − SPYV %) — fill on refresh.
  //    Note: NDX is mostly growth, so this tile mostly tells you whether the
  //    rally is *broadening into value* or *narrowing into growth*.
  spygYTD:            '+14.02%',      // SPDR Portfolio S&P 500 Growth ETF
  spyvYTD:            '+7.87%',       // SPDR Portfolio S&P 500 Value ETF
  gvSpreadYTD:        '+6.15pp',      // SPYG − SPYV
  gvSpread1D:         '+0.77pp',
  gvSpread1W:         '+1.96pp',


  /* ══════════════════════════════════════════════════════════════════════════
     §3 · U.S. EQUITY · MAGNIFICENT 7
     Trend-first view (mirrors §4 Sector ETFs): no prices, just returns
     across 1D / 1W / 1M / YTD + SPX weight badge.

     Sources:
       · 1D       — Yahoo Finance / CNBC daily quote (refresh daily)
       · 1W / 1M  — populate from Yahoo Finance "Performance" tab on refresh
                    (currently "—" placeholders — fill in next data pass)
       · YTD      — total return with dividends reinvested, totalrealreturns.com
                    as of 2026-05-26 (refresh weekly)
       · Wt       — approximate SPX weight = mkt cap (Motley Fool 2026-05-14) ÷
                    SPX total mkt cap ~$67.58T (Slickcharts). Refresh from
                    slickcharts.com /sp500 on weekly cadence. GOOGL = Class A
                    only (GOOG Class C is a separate SPX constituent).

     Tiles in daily_briefing.html are ordered heaviest → lightest SPX weight.
     ══════════════════════════════════════════════════════════════════════════ */
  nvdaChg:            '-1.45%',       // NVIDIA · 1D
  nvda1W:             '-3.81%',
  nvda1M:             '+0.90%',
  nvdaYTD:            '+13.22%',
  nvdaWt:             '~8.1%',
  googlChg:           '-2.51%',       // Alphabet Class A · 1D
  googl1W:            '-1.89%',
  googl1M:            '+8.69%',
  googlYTD:           '+21.60%',
  googlWt:            '~7.3%',
  aaplChg:            '-0.14%',       // Apple · 1D
  aapl1W:             '+2.32%',
  aapl1M:             '+15.61%',
  aaplYTD:            '+15.00%',
  aaplWt:             '~6.5%',
  msftChg:            '+5.45%',       // Microsoft · 1D
  msft1W:             '+7.43%',
  msft1M:             '+6.30%',
  msftYTD:            '-6.49%',
  msftWt:             '~4.4%',
  amznChg:            '-1.23%',       // Amazon · 1D
  amzn1W:             '+0.81%',
  amzn1M:             '+2.89%',
  amznYTD:            '+17.25%',
  amznWt:             '~4.3%',
  tslaChg:            '-1.43%',       // Tesla · 1D
  tsla1W:             '+4.29%',
  tsla1M:             '+16.90%',
  tslaYTD:            '-3.10%',
  tslaWt:             '~2.5%',
  metaChg:            '-0.44%',       // Meta Platforms · 1D
  meta1W:             '+4.14%',
  meta1M:             '-5.47%',
  metaYTD:            '-4.10%',
  metaWt:             '~2.4%',


  /* ══════════════════════════════════════════════════════════════════════════
     §4 · U.S. EQUITY · SECTOR ETFs (SPDR sectors + SMH)
     Source: 1D from SSGA sector tracker / Yahoo Finance (refresh daily).
             1W/1M/YTD = total return (dividends reinvested), per
             totalrealreturns.com (refresh weekly). Trend-only view —
             prices intentionally not displayed in daily_briefing.html.
             *Wt* = sector weight in S&P 500 index (sums to ~100% across
             the 11 SPDRs). Source: financecharts.com / S&P Global
             U.S. Sector Dashboard, as of 2026-05-20. SMH weight = "—"
             (it's the semis bellwether, a subset of XLK, not a sector).

     Tiles in daily_briefing.html are ordered heaviest → lightest SPX weight.
     ══════════════════════════════════════════════════════════════════════════ */
  xlkChg:             '+2.23%',          // Technology · 1D
  xlk1W:              '+6.95%',
  xlk1M:              '+20.06%',
  xlkYTD:             '+32.85%',
  xlkWt:              '35.99%',
  xlfChg:             '+0.60%',          // Financials · 1D
  xlf1W:              '-0.29%',
  xlf1M:              '-0.65%',
  xlfYTD:             '-5.34%',
  xlfWt:              '11.75%',
  xleChg:             '-1.16%',          // Energy · 1D
  xle1W:              '-4.80%',
  xle1M:              '-4.64%',
  xleYTD:             '+26.72%',
  xleWt:              '3.26%',
  xliChg:             '-0.39%',          // Industrials · 1D
  xli1W:              '+1.52%',
  xli1M:              '+1.88%',
  xliYTD:             '+11.92%',
  xliWt:              '8.03%',
  xlyChg:             '-0.97%',          // Consumer Discretionary · 1D
  xly1W:              '+1.83%',
  xly1M:              '+3.45%',
  xlyYTD:             '+1.43%',
  xlyWt:              '10.28%',
  xlpChg:             '-1.80%',          // Consumer Staples · 1D
  xlp1W:              '-2.07%',
  xlp1M:              '-0.01%',
  xlpYTD:             '+7.33%',
  xlpWt:              '5.34%',
  xlvChg:             '-0.93%',          // Health Care · 1D
  xlv1W:              '+0.89%',
  xlv1M:              '+4.64%',
  xlvYTD:             '-3.05%',
  xlvWt:              '8.15%',
  xluChg:             '-0.47%',          // Utilities · 1D
  xlu1W:              '-1.29%',
  xlu1M:              '-2.76%',
  xluYTD:             '+4.78%',
  xluWt:              '2.08%',
  xlbChg:             '-0.41%',          // Materials · 1D
  xlb1W:              '+2.26%',
  xlb1M:              '+0.37%',
  xlbYTD:             '+13.29%',
  xlbWt:              '1.76%',
  xlreChg:            '-0.95%',          // Real Estate · 1D
  xlre1W:             '-1.15%',
  xlre1M:             '+0.80%',
  xlreYTD:            '+9.75%',
  xlreWt:             '1.83%',
  xlcChg:             '-0.84%',          // Communication Services · 1D
  xlc1W:              '-0.35%',
  xlc1M:              '+0.35%',
  xlcYTD:             '-1.41%',
  xlcWt:              '11.56%',
  smhChg:             '-0.15%',          // VanEck Semis (AI capex bellwether) · 1D
  smh1W:              '+5.47%',
  smh1M:              '+19.89%',
  smhYTD:             '+66.31%',
  smhWt:              '—',               // Not a GICS sector — subset of XLK


  /* ══════════════════════════════════════════════════════════════════════════
     §5 · DOW THEORY ADJUNCTS
     Trend-first view on Daily Briefing: 1D / 1W / YTD returns (no index level).
     Index levels (djt, dju) retained for any other dashboards that consume them.
     Sources:
       · 1D / 1W / YTD — Yahoo Finance chart data, 2026-05-29 close
                          (1W = 5 trading sessions).
     ══════════════════════════════════════════════════════════════════════════ */
  djt:                '21,410.31',     // Dow Jones Transportation Average · level retained
  djtChg:             '+0.26%',        // 1D
  djt1W:              '+3.91%',
  djtYTD:             '+23.35%',
  dju:                '1,109.57',      // Dow Jones Utilities Average · level retained
  djuChg:             '-0.56%',        // 1D
  dju1W:              '-0.87%',
  djuYTD:             '+3.89%',


  /* ══════════════════════════════════════════════════════════════════════════
     §6 · INTERNATIONAL EQUITIES · DEVELOPED
     Trend-first view: 1D / 1W / YTD returns (no index level on Daily Briefing).
     Index level fields retained for other dashboards.
     Sources: Yahoo Finance chart data, latest available through 2026-05-29
              where markets were open (1W = 5 trading sessions).
     ══════════════════════════════════════════════════════════════════════════ */
  stoxx600Close:      '626.00',        // STOXX Europe 600
  stoxx600Chg:        '+0.14%',
  stoxx6001W:         '+0.88%',
  stoxx600YTD:        '+5.60%',
  dax:                '25,104.70',     // DAX 40 (Germany)
  daxChg:             '+0.05%',
  dax1W:              '+0.87%',
  daxYTD:             '+2.51%',
  ftse100:            '10,409.28',     // FTSE 100 (UK)
  ftse100Chg:         '-0.16%',
  ftse1001W:          '-0.33%',
  ftse100YTD:         '+4.81%',
  cac40:              '8,183.34',      // CAC 40 (France)
  cac40Chg:           '-0.07%',
  cac401W:            '+0.83%',
  cac40YTD:           '+0.42%',
  nikkei225Close:     '64,693.12',     // Nikkei 225 (Japan)
  nikkei225Chg:       '-0.47%',
  nikkei2251W:        '+4.88%',
  nikkei225YTD:       '+28.51%',
  kospi:              '8,185.29',      // KOSPI (Korea)
  kospiChg:           '-0.53%',
  kospi1W:            '+13.54%',
  kospiYTD:           '+94.23%',
  asx200:             '8,592.90',      // S&P/ASX 200 (Australia)
  asx200Chg:          '-1.43%',
  asx2001W:           '-0.33%',
  asx200YTD:          '-1.39%',
  tsx:                '34,769.14',     // S&P/TSX Composite (Canada)
  tsxChg:             '+0.73%',
  tsx1W:              '+0.86%',
  tsxYTD:             '+9.64%',


  /* ══════════════════════════════════════════════════════════════════════════
     §7 · INTERNATIONAL EQUITIES · EMERGING
     Trend-first view: 1D / 1W / YTD returns (no index level on Daily Briefing).
     Sources: Yahoo Finance chart data, latest available through 2026-05-29
              where markets were open (1W = 5 trading sessions).
     ══════════════════════════════════════════════════════════════════════════ */
  hangSengClose:      '25,006.16',     // Hang Seng (Hong Kong)
  hangSengChg:        '-1.27%',
  hangSeng1W:         '-2.51%',
  hangSengYTD:        '-2.44%',
  csi300Close:        '4,914.21',      // CSI 300 (mainland China)
  csi300Chg:          '+0.12%',
  csi3001W:           '+2.74%',
  csi300YTD:          '+6.14%',
  nifty50:            '23,907.15',     // Nifty 50 (India)
  nifty50Chg:         '-0.03%',
  nifty501W:          '+1.05%',
  nifty50YTD:         '-8.51%',
  bovespa:            '173,787.48',    // Bovespa (Brazil)
  bovespaChg:         '-0.73%',
  bovespa1W:          '-1.37%',
  bovespaYTD:         '+7.86%',


  /* ══════════════════════════════════════════════════════════════════════════
     §8 · TREASURY YIELDS
     Source: Treasury.gov / FRED. Full curve for macro reads. Refreshed
     from Treasury daily curve, 2026-05-28 latest.
     ══════════════════════════════════════════════════════════════════════════ */
  yld2yFull:          '3.9900%',
  yld2y:              '3.99%',
  yld5y:              '4.150%',
  yld10yFull:         '4.4500%',
  yld10y:             '4.45%',
  yld30yFull:         '4.9800%',
  yld30y:             '4.98%',
  yld10yReal:         '2.060%',       // 10Y TIPS real yield


  /* ══════════════════════════════════════════════════════════════════════════
     §9 · YIELD CURVE & INFLATION EXPECTATIONS
     Source: FRED (T10YIE, T5YIE), Treasury.gov.
     ══════════════════════════════════════════════════════════════════════════ */
  curve2s10s:         '+0.46%',       // 10Y minus 2Y
  curve2s30s:         '+0.99%',          // 30Y minus 2Y
  curve5s30s:         '+0.83%',          // 30Y minus 5Y
  breakeven5y:        '2.54%',          // 5Y breakeven inflation (FRED T5YIE)
  breakeven10y:       '2.39%',        // 10Y breakeven inflation (FRED T10YIE)


  /* ══════════════════════════════════════════════════════════════════════════
     §10 · CREDIT SPREADS
     Source: ICE BofA via FRED (BAMLH0A0HYM2, BAMLC0A0CM).
     ══════════════════════════════════════════════════════════════════════════ */
  hyOas:              '2.72%',        // ICE BofA High Yield OAS
  igOas:              '0.73%',        // ICE BofA Investment Grade OAS
  bbOas:              '1.61%',        // ICE BofA BB-rated OAS


  /* ══════════════════════════════════════════════════════════════════════════
     §11 · CREDIT & DURATION ETFs
     Source: 1D from Yahoo Finance / iShares site (refresh daily).
             YTD = nominal total return (dividends reinvested) from Yahoo
             Finance / iShares NAV total-return / SSGA fact sheet.
             1W   = 5-day total return from Yahoo Finance "5D" view —
             user refreshes weekly.
     Trend-only view in daily_briefing.html — prices intentionally not
     displayed in the tile (legacy price keys preserved here because
     other dashboards consume them).
     Tile order in daily_briefing.html is descending YTD%.
     ══════════════════════════════════════════════════════════════════════════ */
  // Yield series: 30-day SEC yield from iShares fact sheets (May 21, 2026);
  // BIL = SSGA dividend yield (May 19) since T-bill ETFs report SEC yield ≈ div yield.
  // Refresh monthly from each issuer's fact sheet page.
  hyg:                '$80.31',          // iShares iBoxx HY Corporate Bond
  hygChg:             '+0.10%',
  hyg1W:              '+0.51%',           // ~5d est; refresh from Yahoo "5D"
  hygYTD:             '+1.60%',          // Yahoo total return, 2026-05-29
  hygYld:             '6.52%',           // 30-day SEC yield, 2026-05-21
  lqd:                '$109.36',         // iShares iBoxx IG Corporate Bond
  lqdChg:             '+0.09%',
  lqd1W:              '+1.10%',           // ~5d est; refresh from Yahoo "5D"
  lqdYTD:             '+0.76%',          // iShares NAV total return, 2026-05-21
  lqdYld:             '5.24%',           // 30-day SEC yield, 2026-05-21
  tlt:                '$85.76',          // iShares 20+ Year Treasury Bond
  tltChg:             '+0.02%',
  tlt1W:              '+1.83%',           // ~5d est; refresh from Yahoo "5D"
  tltYTD:             '-0.14%',          // Yahoo daily total return, 2026-05-29
  tltYld:             '5.02%',           // 30-day SEC yield, 2026-05-21
  ief:                '$94.65',          // iShares 7-10 Year Treasury Bond
  iefChg:             '+0.12%',
  ief1W:              '+0.91%',           // ~5d est; refresh from Yahoo "5D"
  iefYTD:             '-0.31%',          // iShares NAV total return, 2026-05-21
  iefYld:             '4.27%',           // 30-day SEC yield, 2026-05-21
  bil:                '$91.66',          // SPDR 1-3 Month T-Bill
  bilChg:             '+0.03%',
  bil1W:              '+0.10%',          // ~5d yield accrual; refresh from Yahoo "5D"
  bilYTD:             '+1.47%',          // SSGA Apr 30 (+1.10%) + ~3.5 wks SOFR accrual
  bilYld:             '3.91%',           // SSGA dividend yield ≈ 30-day SEC yield, 2026-05-19


  /* ══════════════════════════════════════════════════════════════════════════
     §12 · VOLATILITY
     Source: Cboe (vix.com, dashboards) / FRED (VIXCLS).
     ══════════════════════════════════════════════════════════════════════════ */
  vix:                '15.32',        // VIX (30-day SPX vol)
  vvix:               '86.06',        // VIX of VIX (referenced in SP500_DCA)
  vix9d:              '12.59',          // 9-day VIX (short-term)
  vix3m:              '18.66',          // 3-month VIX
  move:               '70.22',        // MOVE Index (Treasury vol)
  skew:               '144.18',          // Cboe SKEW (tail risk)
  ovx:                '57.84',          // Oil VIX (Cboe)


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
  consumerConf:       '92.8',          // Conference Board Consumer Confidence
  umichSent:          '44.8',          // U Michigan Consumer Sentiment


  /* ══════════════════════════════════════════════════════════════════════════
     §15 · CURRENCIES · MAJORS
     Source: TradingEconomics / Investing.com / xe.com; YTD refreshed from
     Yahoo Finance chart data, 2026-05-29 latest.
     YTD = spot rate % change YTD (positive = numerator currency strengthened
     vs denominator). Pull from Yahoo Finance per-pair "YTD" or compute as
     (current rate ÷ Dec 31 2025 close − 1). Placeholders until refreshed.
     ══════════════════════════════════════════════════════════════════════════ */
  dxy:                '98.94',       // U.S. Dollar Index
  dxyChg:             '-0.08%',
  dxyYTD:             '+0.67%',
  eurUsd:             '1.1659',
  eurUsdChg:          '+0.05%',
  eurUsdYTD:          '-0.75%',
  usdJpy:             '159.26',
  usdJpyChg:          '-0.01%',
  usdJpyYTD:          '+1.82%',
  gbpUsd:             '1.3457',          // Cable
  gbpUsdChg:          '+0.09%',
  gbpUsdYTD:          '-0.08%',
  audUsd:             '0.7186',          // Aussie
  audUsdChg:          '+0.30%',
  audUsdYTD:          '+7.29%',
  usdCad:             '1.3795',          // Loonie
  usdCadChg:          '+0.09%',
  usdCadYTD:          '+0.73%',
  usdChf:             '0.7807',          // Swiss
  usdChfChg:          '-0.37%',
  usdChfYTD:          '-1.38%',
  usdCny:             '6.7657',
  usdCnyChg:          '-0.20%',
  usdCnyYTD:          '-3.29%',


  /* ══════════════════════════════════════════════════════════════════════════
     §16 · CURRENCIES · EMERGING
     Source: TradingEconomics / Investing.com; YTD refreshed from Yahoo
     Finance chart data, 2026-05-29 latest.
     YTD convention: spot % change YTD (positive = USD strengthened vs EM ccy).
     ══════════════════════════════════════════════════════════════════════════ */
  usdMxn:             '17.3400',          // Peso
  usdMxnChg:          '+0.18%',
  usdMxnYTD:          '-3.55%',
  usdInr:             '94.9900',          // Indian rupee
  usdInrChg:          '-1.10%',
  usdInrYTD:          '+5.82%',
  usdKrw:             '1,507.13',          // Korean won
  usdKrwChg:          '+0.79%',
  usdKrwYTD:          '+4.81%',
  usdBrl:             '5.0426',          // Brazilian real
  usdBrlChg:          '-0.18%',
  usdBrlYTD:          '-7.92%',


  /* ══════════════════════════════════════════════════════════════════════════
     §17 · COMMODITIES · ENERGY
     Source: NYMEX (CL/HO/NG), ICE (Brent). EIA for context. Missing YTD
     fields refreshed from Yahoo Finance chart data, 2026-05-29 latest.
     YTD = spot/front-month futures % change YTD. Pull from exchange data,
     Yahoo Finance futures history, CME Group, ICE, or barchart.com.
     ══════════════════════════════════════════════════════════════════════════ */
  brent:              '$91.70',      // Brent crude (per barrel)
  brentChg:           '-2.14%',
  brentYTD:           '+50.70%',
  wti:                '$87.76',       // WTI crude (settled below intraday peak >$98)
  wtiChg:             '-1.28%',
  wtiYTD:             '+52.84%',
  natgas:             '$3.27',        // Henry Hub natural gas (per MMBtu)
  natgasChg:          '-0.37%',
  natgasYTD:          '-11.20%',
  heatingOil:         '$3.5129',          // NY Harbor heating oil
  heatingOilChg:      '-2.92%',
  heatingOilYTD:      '+65.66%',
  gasoline:           '$3.0469',          // RBOB gasoline
  gasolineChg:        '-4.34%',
  gasolineYTD:        '+78.66%',


  /* ══════════════════════════════════════════════════════════════════════════
     §18 · COMMODITIES · PRECIOUS METALS
     Source: Kitco / TradingEconomics / Bloomberg; YTD refreshed from Yahoo
     Finance futures chart data, 2026-05-29 latest.
     YTD = spot % change YTD. Gold ATH was $5,589.38 on 2026-01-28; spot has
     since corrected to ~$4,512 (~-19% from peak) but is still positive YTD
     on structural CB buying + geopolitical hedge. DO NOT describe gold as
     "near record" or "in record zone" while price is materially below the
     Jan ATH — refresh ATH context whenever spot moves >5%. Note: GLD ETF on
     totalrealreturns showed +4.64% as of 2026-03-27, but gold has rallied
     and corrected since — that stale figure is NOT the May 29 YTD.
     ══════════════════════════════════════════════════════════════════════════ */
  gold:               '$4,569.90',    // XAU/USD spot (per troy oz)
  goldChg:            '+1.57%',
  goldYTD:            '+5.65%',
  silver:             '$75.58',       // XAG/USD spot
  silverChg:          '-0.08%',
  silverYTD:          '+7.77%',
  platinum:           '$1,922.90',          // XPT/USD
  platinumChg:        '+0.07%',
  platinumYTD:        '-5.49%',
  palladium:          '$1,368.50',          // XPD/USD
  palladiumChg:       '-0.66%',
  palladiumYTD:       '-16.00%',


  /* ══════════════════════════════════════════════════════════════════════════
     §19 · COMMODITIES · INDUSTRIAL METALS
     Source: LME / COMEX / TradingEconomics; YTD refreshed from Yahoo Finance
     chart data, 2026-05-29 latest.
     YTD = spot/front-month % change YTD. Refresh from COMEX (copper) and
     LME (aluminum) or TradingEconomics commodities page.
     ══════════════════════════════════════════════════════════════════════════ */
  copper:             '$6.39/lb',     // COMEX copper
  copperChg:          '-0.03%',
  copperYTD:          '+13.57%',
  aluminum:           '3,656.75',          // LME aluminum
  aluminumChg:        '-6.51%',
  aluminumYTD:        '+25.82%',


  /* ══════════════════════════════════════════════════════════════════════════
     §20 · COMMODITIES · AGRICULTURALS
     Source: CME (ZW/ZC/ZS), ICE (sugar/coffee/cocoa). YTD refreshed from
     Yahoo Finance futures chart data, 2026-05-29 close.
     YTD = front-month % change YTD. Refresh from CME Group or barchart.com.
     ══════════════════════════════════════════════════════════════════════════ */
  wheat:              '$6.10',          // CBOT wheat (per bushel)
  wheatChg:           '-2.20%',
  wheatYTD:           '+20.36%',
  corn:               '$4.47',          // CBOT corn
  cornChg:            '-1.92%',
  cornYTD:            '+1.53%',
  soybeans:           '$11.865',          // CBOT soybeans
  soybeansChg:        '-0.67%',
  soybeansYTD:        '+15.14%',
  sugar:              '$14.07',          // ICE sugar #11
  sugarChg:           '+1.01%',
  sugarYTD:           '-6.26%',
  coffee:             '$2.66',          // ICE coffee C
  coffeeChg:          '-3.04%',
  coffeeYTD:          '-23.76%',
  cocoa:              '$3,901.00',          // ICE cocoa
  cocoaChg:           '-4.83%',
  cocoaYTD:           '-35.68%',


  /* ══════════════════════════════════════════════════════════════════════════
     §21 · COMMODITIES · INDICES
     Source: Bloomberg (BCOM), Invesco (DBC); YTD refreshed from Yahoo
     Finance chart data, 2026-05-29 close.
     YTD = index level % change YTD. Refresh from Bloomberg ticker BCOM
     and Invesco's DBC ETF page.
     ══════════════════════════════════════════════════════════════════════════ */
  bcom:               '136.20',          // Bloomberg Commodity Index
  bcomChg:            '+1.02%',
  bcomYTD:            '+24.17%',
  dbc:                '$29.48',          // Invesco DB Commodity Tracking ETF
  dbcChg:             '-0.81%',
  dbcYTD:             '+31.84%',


  /* ══════════════════════════════════════════════════════════════════════════
     §22 · CRYPTOCURRENCIES
     Source: CoinGecko / Coinbase / Yahoo Finance crypto.
     YTD = spot % change YTD (positive = rallied YTD). Refresh from CoinGecko
     "YTD" tab on each coin's page or TradingView. Coin YTD verified from
     CoinGecko Jan 1 history vs latest spot, 2026-05-29 UTC; total mcap from
     CoinGecko global mcap vs CoinCodex Jan 1 market overview.
     ══════════════════════════════════════════════════════════════════════════ */
  bitcoin:            '$73,484.05',   // BTC/USD
  bitcoinChg:         '-0.07%',
  bitcoinYTD:         '-16.0%',
  ethereum:           '$2,010.77',       // ETH/USD
  ethereumChg:        '+0.16%',
  ethereumYTD:        '-32.2%',
  cryptoMcap:         '$2.56T',          // Total crypto market cap (USD)
  cryptoMcapChg:      '-0.07%',
  cryptoMcapYTD:      '-13.7%',
  solana:             '$81.93',          // SOL/USD
  solanaChg:          '-0.07%',
  solanaYTD:          '-34.2%',


  /* ══════════════════════════════════════════════════════════════════════════
     §23 · FED POLICY & LIQUIDITY
     Source: Fed.gov, FRED (SOFR, RRPONTSYD, WALCL, M2SL), Treasury.gov.
     ══════════════════════════════════════════════════════════════════════════ */
  fedFundsTarget:     '3.50–3.75%',   // FOMC target range (held Apr 29)
  effFedFunds:        '3.62%',          // EFFR (effective fed funds rate)
  sofr:               '3.62%',        // Secured Overnight Financing Rate (May 28)
  fedBalanceSheet:    '$6.70T',          // Total assets (WALCL, $T)
  rrpBalance:         '$11.68B',       // Overnight reverse repo (May 29)
  tgaBalance:         '$830.30B',          // Treasury General Account
  m2Money:            '$22.80T',          // M2 money supply


  /* ══════════════════════════════════════════════════════════════════════════
     §24 · FINANCIAL CONDITIONS
     Source: Chicago Fed (NFCI/ANFCI), Goldman, Bloomberg.
     ══════════════════════════════════════════════════════════════════════════ */
  nfci:               '-0.510',       // Chicago Fed National FCI (negative = loose)
  anfci:              '-0.456',       // Adjusted NFCI
  goldmanFci:         '98.65',          // Goldman Sachs FCI
  bloombergFci:       '+0.80',          // Bloomberg US FCI


  /* ══════════════════════════════════════════════════════════════════════════
     §25 · MACRO ECONOMIC DATA
     Source: BLS / BEA / Atlanta Fed / ISM. Released monthly except claims (wkly).
     ══════════════════════════════════════════════════════════════════════════ */

  // ─ Growth / Activity ─
  ismMfgPmi:          '52.7',         // ISM Manufacturing PMI
  ismSvcPmi:          '53.6',         // ISM Services PMI
  gdpNowQ2:           '4.3%',         // Atlanta Fed GDPNow (current quarter nowcast)
  realGdpQ1:          '+1.6%',        // Q1 2026 real GDP (advance/2nd estimate)
  retailSalesMoM:     '+0.5%',        // Retail sales month-over-month

  // ─ Inflation · CPI / PCE ─
  cpiYoY:             '3.8%',         // CPI year-over-year (April)
  coreCpiYoY:         '2.8%',         // Core CPI year-over-year (April)
  pceYoY:             '3.8%',         // PCE year-over-year
  corePceYoY:         '3.3%',         // Core PCE year-over-year

  // ─ Inflation · Extended (PPI + market-implied) ─
  ppiYoY:             '+9.8%',        // PPI y/y (April · largest since Dec 2022)
  corePpiYoY:         '+3.8%',        // Core PPI y/y (April · 6th straight month accelerating)
  fiveYrFiveYr:       '2.27%',        // 5y5y Forward Inflation Expectations (FRED T5YIFR, May)
  nyfedCons1y:        '3.6%',         // NY Fed 1-yr Consumer Inflation Expectations (April · highest in a year)

  // ─ Labor · Core ─
  unemploymentRate:   '4.3%',         // U-3 unemployment rate
  initialClaims:      '215,000',      // Initial jobless claims
  nfpChange:          '+115,000',     // Non-farm payrolls change

  // ─ Labor · Depth (precursors + Fed-watched gauges) ─
  adpPayrolls:        '+109K',        // ADP Private Payrolls (April · beat 84K consensus)
  continuingClaims:   '1.79M',        // Continuing jobless claims (mid-May)
  avgHourlyEarnings:  '+3.6%',        // Avg hourly earnings y/y (April · wage inflation)
  joltsOpenings:      '6.9M',         // JOLTS Job Openings (March · April due Jun 2)


  /* ══════════════════════════════════════════════════════════════════════════
     §25a · HOUSING
     Most rate-sensitive sector · cleanest read on Fed-tightness biting.
     Source: Freddie Mac PMMS / NAR / Census / S&P Cotality / NAHB.
     ══════════════════════════════════════════════════════════════════════════ */
  mortgage30y:        '6.53%',        // 30-Yr Fixed Mortgage Rate (Freddie Mac May 28)
  existingHomeSales:  '4.02M',        // Existing Home Sales SAAR (April · +0.2% m/m, flat y/y)
  housingStarts:      '1.465M',       // Privately-owned housing starts SAAR (April · −2.8% m/m)
  caseShillerHpi:     '+0.7%',        // S&P Cotality Case-Shiller National HPI y/y (Feb · 13th straight month of deceleration)
  nahbHmi:            '34',           // NAHB/Wells Fargo Housing Market Index (April · 24th consecutive negative reading)


  /* ══════════════════════════════════════════════════════════════════════════
     §26 · VALUATION ANCHORS · S&P 500
     Source: FactSet Earnings Insight (Friday), Yardeni, Shiller, Damodaran.
     ══════════════════════════════════════════════════════════════════════════ */
  fwdPe:              '21.1',         // Rounded form
  fwdPeFactSet:       '21.07',        // FactSet/Yardeni precise
  fwdEps:             '$359.81',      // Forward 12M EPS
  shillerCape:        '42.66',
  trailingEps:        '$294.25',
  trailingPe:         '25.76',


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
  regimeLabel:        'SPX fresh high — rates ease, tech keeps leadership',
  regimeOneLiner:     'Risk-on but valuation-constrained. SPX closed at another high, tech and semis still lead, yields eased, and energy/commodities continued to cool from the spike.',
  regimeScore:        '+2',
  regimeScoreLabel:   'Constructive · Tranche',
  dcaStance:          'Keep core DCA on; use weekly tranches. Add only gradually while valuation is stretched and leadership remains tech-heavy.',
  confidence:         '7/10',
  spxNextResistance:  '7,600 – 7,620',
  spxFirstSupport:    '7,519.12',


  /* ══════════════════════════════════════════════════════════════════════════
     §29 · UPCOMING CATALYSTS · NEXT 2 WEEKS
     Refresh weekly. Each item: date, desc, impact (Done/Low/Med/High), cat.
     ══════════════════════════════════════════════════════════════════════════ */
  catalysts: [
    // ── Upcoming · Next 2 Weeks ───────────────────────────────────────────
    // Each event has 4 optional explainer fields (why · watch · bullish · bearish)
    // that surface in the click-through modal on daily_briefing.html.
    {
      date: 'Mon Jun 1',
      desc: 'ISM Manufacturing PMI (May) — first national read on factory demand after tariff shock',
      impact: 'Med',
      cat: 'macro',
      why: 'Manufacturing is the most cyclical part of the macro tape. New orders and prices-paid matter more than the headline when inflation and margin pressure are the market focus.',
      watch: 'Headline PMI · new orders · prices paid · employment · DXY and 10Y reaction',
      bullish: 'Orders stabilize while prices paid cool → soft-landing read, cyclicals and small caps get support.',
      bearish: 'Orders fall and prices paid rise → stagflationary mix; yields and dollar pressure duration growth.'
    },
    {
      date: 'Tue Jun 2',
      desc: 'JOLTS Job Openings (April) — labor-demand gauge before payrolls',
      impact: 'Med',
      cat: 'macro',
      why: 'The Fed watches labor demand for evidence that wage pressure is cooling without a sharp unemployment rise.',
      watch: 'Openings level · quits rate · hires rate · layoffs/discharges',
      bullish: 'Openings cool gradually while layoffs stay contained → lower wage pressure without recession signal.',
      bearish: 'Sharp drop in openings plus rising layoffs → labor market no longer simply normalizing.'
    },
    {
      date: 'Wed Jun 3',
      desc: 'ADP Employment + ISM Services PMI (May) — jobs preview and services inflation check',
      impact: 'High',
      cat: 'macro',
      why: 'Services drive most U.S. activity and sticky inflation. ADP is noisy, but paired with ISM services employment/prices it sets the tone for Friday payrolls.',
      watch: 'ADP jobs · ISM services headline · prices paid · employment · new orders',
      bullish: 'Moderate hiring and cooler services prices → yields ease, breadth can improve.',
      bearish: 'Hot services prices or weakening employment → either inflation pressure or growth scare.'
    },
    {
      date: 'Wed Jun 3',
      desc: 'Broadcom Q2 FY26 earnings — AI/cloud bellwether; consensus ~$13.85 EPS on $21.7B rev',
      impact: 'High',
      cat: 'earnings',
      why: 'Broadcom is a leading AI/5G semiconductor — its outlook is interpreted as a proxy for tech capex and AI growth. Wall Street has very high expectations. A beat would extend the tech rally; a miss/weak guide could spook semiconductor stocks and drag the Nasdaq. Broadcom influences the Nasdaq (~1.5% of SPX weight).',
      watch: 'Forward gross margin · capital spending guidance · cloud/AI cycle commentary · SOX semi index · NVDA & other AI chip stocks',
      bullish: 'Strong beat + upbeat guidance → reinforces tech rally; SOX +3-4%, NVDA/AMD/TSM rally, SPX/QQQ up ~1%, yields tick up on growth optimism.',
      bearish: 'Miss or weak guide (inventory correction in telecom) → SOX -3-4%, tech indices dip, rotation to defensives, modest flight to bonds.'
    },
    {
      date: 'Fri Jun 5',
      desc: 'May Employment Situation — payrolls, unemployment, and wages',
      impact: 'High',
      cat: 'macro',
      why: 'Payrolls are the key bridge between the soft-landing narrative and Fed policy. The market needs enough job growth to avoid recession risk, but not enough wage pressure to reprice hikes.',
      watch: 'Nonfarm payrolls · unemployment rate · average hourly earnings · labor-force participation',
      bullish: 'Payrolls near trend, unemployment stable, wage growth cools → constructive for equities and bonds.',
      bearish: 'Hot wages push yields up; weak payrolls plus rising unemployment raises recession risk.'
    },
    {
      date: 'Sun Jun 7',
      desc: 'OPEC+ Ministerial (Vienna) — output decision after crude pullback',
      impact: 'High',
      cat: 'macro',
      why: 'The oil shock has cooled, but crude remains the cleanest inflation-tail-risk channel. Any supply surprise feeds directly into breakevens and sector rotation.',
      watch: 'Brent crude price · 10Y breakeven inflation · SPX energy sector (XLE) vs industrials',
      bullish: 'OPEC holds or boosts production → oil eases, inflation expectations cool, consumer/industrial cyclicals get relief.',
      bearish: 'Surprise additional cuts → oil spikes, breakevens rise, bond yields jump. Energy stocks briefly rally but broad equities slide.'
    },
    {
      date: 'Wed Jun 10',
      desc: 'May CPI + 10Y Treasury reopening — inflation and duration-demand test',
      impact: 'High',
      cat: 'macro',
      why: 'CPI lands one week before FOMC. A hot print can undo the recent yield relief; a cool print gives the Fed room to look through energy volatility.',
      watch: 'Core CPI MoM · shelter/services ex-shelter · 10Y auction tail · indirect bidder share',
      bullish: 'Core CPI cools and auction demand is solid → yields fall, growth and semis can extend.',
      bearish: 'Hot core CPI or weak auction demand → 10Y backs up, valuation pressure returns.'
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
