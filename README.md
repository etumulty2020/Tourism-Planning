# Tourism & Place

National tourism comparison for the 16 countries in the original energy dataset. Live site: https://etumulty2020.github.io/Tourism-Planning/

The static website is served from `dist/` by the GitHub Pages workflow. No build step is required. `dist/index.html` is the tourism dashboard; `dist/energy.html` retains the original electricity dashboard. Both read the same `dist/data.js` snapshot of `dist/energy-data.csv`.

## Data release: 20 September 2026

The CSV retains all 49 original fields and appends 47 tourism fields. There are 16 country records. Tourism uses a 2024 baseline, airline activity uses 2023, and original energy periods are unchanged. This is a historical snapshot, not a live feed or exhaustive global ranking.

Verified numeric coverage:

| Measure | Countries |
|---|---:|
| Arrivals | 14 |
| Travel receipts | 12 |
| Inbound accommodation nights | 9 |
| Monthly accommodation nights | 3 |
| Accommodation bed places | 3 |
| Airline passengers | 16 |
| National resident survey | 1 |

Russia and Iran have no verified 2024 arrival or travel-receipts observation in this release. They remain selectable, with original energy data, airline context and a heritage example. Monthly nights/capacity cover Croatia, France and Germany. Resident feedback covers Canada only. Missing values are empty strings, never zero.

## Sources and definitions

- [OECD Tourism Trends and Policies 2026, tables 1.1 and 1.2](https://www.oecd.org/en/publications/oecd-tourism-trends-and-policies-2026_3fd3cd75-en/full-report/tourism-trends-performance-and-outlook_e87d10cf.html): manually transcribed 2024 arrivals and current-USD travel receipts for 12 countries. Receipts exclude international passenger transport. Source arrival categories differ; Germany and Croatia count accommodation arrivals. Japan, Korea and Indonesia use visitors rather than overnight tourists. The UK-labelled series has a 2024 Great Britain coverage break.
- [OECD inbound tourism](https://sdmx.oecd.org/public/rest/v1/data/OECD.CFE.TOU,DSD_TOURISM_INTER@DF_INBOUND,1.0/.?startPeriod=2024): archived CSV in `data-sources/`; select 2024, `NIGHTS_ACCOM`, accommodation `_T`. `TSS` means accommodation-provider/supply survey; `TDS` means visitor/demand survey. These methods and populations differ; do not derive occupancy or length of stay by mixing series.
- [China NBS 2024 communiqué](https://www.stats.gov.cn/english/PressRelease/202502/t20250228_1958822.html): 131.9m inbound visits, including same-day visits and residents of Hong Kong, Macao and Taiwan.
- [India Ministry of Tourism](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2220107&lang=1&reg=1): 20.57m international tourist arrivals, provisional. Distinct from 9.95m foreign tourist arrivals.
- [Eurostat TOUR_OCC_NIM](https://doi.org/10.2908/TOUR_OCC_NIM) and [TOUR_CAP_NAT](https://doi.org/10.2908/TOUR_CAP_NAT): archived JSON; 2024; countries DE, FR, HR; accommodation I551-I553. Monthly data use total resident/non-resident guest nights. Capacity uses `BEDPL`, `NR`. National reporting thresholds apply. The two busiest months' share is calculated as the sum of the largest two monthly counts divided by the sum of all 12 counts.
- [World Bank / ICAO IS.AIR.PSGR](https://data.worldbank.org/indicator/IS.AIR.PSGR): archived API response for all 16 countries; 2023 observations (2024 absent). Domestic and international passengers carried by airlines registered in each country, not airport throughput or inbound tourism. Not a measure of route connectivity or local transport.
- [Destination Canada Resident Sentiment Index 2024](https://www.tourismdatacollective.ca/system/files/2025-07/Resident%20Sentiment%20Index%20-%202024%20Annual%20Report.pdf): 75% agree their city should continue promoting itself to attract tourists. This is a response share, not the net sentiment index. The short summary does not supply sample size/weighting. Do not rank countries by this measure.
- [UNESCO World Heritage List](https://whc.unesco.org/en/list): one illustrative place per country, with shortened common names. No visitor counts, popularity or current operating status are inferred.

All source URLs and years are embedded in each CSV row. National aggregates cannot diagnose local crowding, capacity, housing impacts or resident sentiment. The site deliberately avoids synthetic scores, causal claims and investment recommendations.

## Updating

Maintain the CSV as the source of truth; regenerate `data.js` as `window.ENERGY_DATA = <JSON records>;`. Keep all fields as strings and preserve blanks. The amended original CSV is also saved one directory above this repository. Keep that copy and the deployed CSV identical when updating. Review definitions and geography before substituting new data.

To preview, serve `dist/` using a static HTTP server. Publishing a commit to `main` triggers `.github/workflows/pages.yml`.

Tourism navigation uses separate static pages: `index.html` (overview), `compare.html`, `season.html`, `places.html`, `residents.html`, `data.html`, `findings.html`, and `methodology.html`. Each page supports direct links and normal browser navigation. Shared rendering reads the page identifier from the HTML body; country controls start with Croatia and France on each visit.

Project submission materials are linked from `resources.html`: the original downloadable CSV, `methodology-note.html` (one-page print layout), `presentation.html` (six browser slides with a five-minute running order and live demonstration links), and `reflection.html`. Print controls use the browser's print/save-as-PDF facility. Presentation notes are included when printing; no personal information is collected.
