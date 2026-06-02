# China Market · 中国A股板块与行业研究

宏观交易者视角的中国 A 股板块、行业、风格、ETF 研究 — 只投基金 / ETF。
姊妹目录：`../Macro Trader html/`（美股 + 全球宏观）。

## Project Structure

```text
.
├── .github/          # GitHub issue and pull request templates
├── assets/           # Images, icons, and other static media
├── data/             # Source datasets and exported analysis files
├── docs/             # Supporting notes, documentation, and archives
│   └── archive/
│       └── a_share_2025_research.html
├── scripts/          # Utility scripts for data prep or publishing
├── src/              # Future dashboard/source modules
├── tests/            # Checks and test assets
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── index.html        # 主入口 · 当前主研报（10 章 · 交互式）
```

## Dashboards

| 入口 | 内容 | 数据期 | 状态 |
|------|------|--------|------|
| **[index.html](index.html)** | A 股板块、行业回报与轮动分析（10 章 · 交互式） | **2025-05 → 2026-04** 滚动 12 个月 | **当前主版本** |
| [docs/archive/a_share_2025_research.html](docs/archive/a_share_2025_research.html) | 中国A股基金与ETF组合投资研究报告（10 章 · 交互式） | 2025 全年快照 + 2026 H1 监测点 | 存档（vintage） |

### 当前主版本 (`index.html`) 涵盖

1. **主要指数表现统计** — 7 大指数 12 月涨幅（创业板 +100.9%、科创 50 +89.3%、深证成指 +56.7% …）+ Chart.js 横向条形图
2. **申万 / 中信一级行业排行** — 强势 / 弱势 tab 切换，自绘条形 + 主题驱动卡
3. **热门主题与概念板块** — 11 行主题表（含 ↑↑↑/↓↓ 涨幅符号）+ 趋势 vs 情绪判断
4. **风格与因子表现** — 大盘/小盘、成长/价值、高股息、动量、估值、风险偏好 6 张因子卡
5. **行业轮动的宏观逻辑** — 周期 / 政策 / 流动性 / 海外 4 个维度
6. **ETF 与基金配置视角** — 宽基 / 行业 / 主题 三 tab 切换，25 只 ETF 含代码
7. **行业配置框架** — 5 类（核心 / 景气上行 / 低估修复 / 高波动 / 回避）含色条 + pill
8. **未来 3–12 个月展望** — 8 大方向（高配 / 标配 / 观察 / 低配）含逻辑 + 风险
9. **风险监控指标** — 20 项，周 / 月 / 季 三频率切换
10. **结论** — 6 段总结卡 + 印章

### 存档版本 (`docs/archive/a_share_2025_research.html`)

基于 2025 全年总结文档生成的早期版本（9 章正文 + 第 拾 章 2026 H1 监测点）。保留作为 2025-vintage 快照与时序对照参考。

## 数据来源

- **主版本**：`A股市场过去一年板块、行业回报与分析.md`（统计区间 2025-05 → 2026-04，原始引用 Wind、东方财富、券商研报等）
- **存档**：`中国A股市场研究.md` + `A股ETF投资研究报告生成.docx`（2025 全年口径）

## Tech

页面使用 CDN 加载 Chart.js 与 Noto Sans / Serif SC，无构建步骤。直接在浏览器打开 `index.html` 即可使用。
中式金融配色 — 红涨绿跌、深蓝顶栏、烫金分隔。
