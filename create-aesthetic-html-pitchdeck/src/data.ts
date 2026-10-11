/* ------------------------------------------------------------------
   SINGLE SOURCE OF TRUTH — every figure below is transcribed from the
   "Meta Ads Performance Analysis & 2-Month Growth Strategy" report.
------------------------------------------------------------------- */

export type Tone = "good" | "warn" | "bad" | "none";
export type Status = "Strong" | "Needs Improvement" | "Critical";

export const META = {
  title: "Meta Ads Performance Analysis",
  subtitle: "& 2-Month Growth Strategy",
  preparedBy: "DREAM MEDIA",
  preparedFor: "puredays.store | Malaysia & Singapore",
  strategyPeriod: "October – December 2026",
  dataWindow: "8 September to 7 October 2026",
  email: "drreammedia@gmail.com",
};

/* ------------------------------ Account ------------------------------ */
export const ACCOUNT = {
  spend: 14086.34,
  purchases: 132,
  revenue: 20903,
  roas: 1.48,
  cpa: 106.71,
  impressions: 736229,
  clicks: 7550,
  cpm: 19.13,
  cpc: 1.87,
  ctr: 1.03,
  lpv: 5709,
  lpvRate: 75.62,
  atc: 822,
  atcRate: 14.4,
  checkouts: 356,
  atcCheckout: 43.31,
  checkoutPurchase: 37.08,
  cvr: 2.31,
  dailyBudget: 300,
};

export const METHOD = [
  {
    metric: "Link CTR",
    formula: "Link Clicks ÷ Impressions × 100",
    measures: "How compelling the ad is — are people clicking?",
  },
  {
    metric: "LPV / Click",
    formula: "LPV ÷ Link Clicks × 100",
    measures: "Landing page accessibility — are clicks reaching the page?",
  },
  {
    metric: "ATC Rate",
    formula: "ATC ÷ LPV × 100",
    measures: "Product-page intent — does the product page persuade?",
  },
  {
    metric: "ATC → Checkout",
    formula: "Checkouts ÷ ATC × 100",
    measures: "Cart quality — are cart adds progressing to checkout?",
  },
  {
    metric: "Checkout → Purchase",
    formula: "Purchases ÷ Checkouts × 100",
    measures: "Checkout completion — are buyers getting through the final step?",
  },
  {
    metric: "Purchase CVR",
    formula: "Purchases ÷ LPV × 100",
    measures: "End-to-end efficiency from landing page to purchase",
  },
];

/* ----------------------------- Scorecard ----------------------------- */
export const BENCH = {
  roas: "3x+",
  cpm: "RM15–25",
  ctr: "1%+",
  cpc: "<RM2.50",
  atc: "15%+",
  atcChk: "40%+",
  chkPur: "35%+",
  cvr: "3%+",
};

export type Score = {
  roas: number;
  cpm: number;
  ctr: number;
  cpc: number;
  atc: number;
  atcChk: number;
  chkPur: number;
  cvr: number;
};

export type Row = {
  metric: string;
  actual: string;
  target: string;
  assessment: string;
  tone: Tone;
};

export type Campaign = {
  id: string;
  section: string;
  short: string;
  scoreName: string;
  title: string[];
  markets: string;
  status: Status;
  score: Score;
  spend: number;
  purchases: number;
  revenue: number;
  cpa: number;
  cpaLabel: string;
  rows: Row[];
  telling: string[];
  bottleneckLabel: string;
  bottleneck: string;
  actions: string[];
  impact: string;
  impactMetric: string;
  impactFrom: string;
  impactTo: string;
  note?: string;
};

const r = (
  metric: string,
  actual: string,
  target: string,
  assessment: string,
  tone: Tone
): Row => ({ metric, actual, target, assessment, tone });

export const CAMPAIGNS: Campaign[] = [
  /* ------------------------------ 5.1 ------------------------------ */
  {
    id: "wordament",
    section: "5.1",
    short: "Wordament",
    scoreName: "Wordament",
    title: ["Wordament", "Sales Campaign"],
    markets: "Singapore & Malaysia",
    status: "Needs Improvement",
    score: { roas: 1.15, cpm: 14.68, ctr: 1.05, cpc: 1.4, atc: 11.52, atcChk: 37.96, chkPur: 32.41, cvr: 1.42 },
    spend: 6108.58,
    purchases: 47,
    revenue: 7043,
    cpa: 129.97,
    cpaLabel: "CPA",
    rows: [
      r("Spend", "RM6,108.58", "—", "—", "none"),
      r("Purchases", "47", "—", "—", "none"),
      r("Revenue", "RM7,043", "—", "—", "none"),
      r("ROAS", "1.15x", "3x+", "Below target", "warn"),
      r("CPA", "RM129.97", "—", "—", "none"),
      r("CPM", "RM14.68", "RM15–25", "Efficient — good reach cost", "good"),
      r("Link CTR", "1.05%", "1%+", "On target", "good"),
      r("Link CPC", "RM1.40", "< RM2.50", "Strong", "good"),
      r("LPV / Click Rate", "76.13%", "75%+", "Acceptable", "good"),
      r("ATC Rate", "11.52%", "15%+", "Below — main bottleneck", "bad"),
      r("ATC → Checkout", "37.96%", "40%+", "Slightly below target", "warn"),
      r("Checkout → Purchase", "32.41%", "35%+", "Below — needs attention", "warn"),
      r("Purchase CVR", "1.42%", "3%+", "Well below — priority fix", "bad"),
    ],
    telling: [
      "Wordament is delivering traffic at one of the lowest costs in the account — a CPM of RM14.68 and CPC of RM1.40 are genuinely efficient. People are seeing the ad and clicking through. The landing page is loading reasonably well at 76.13%.",
      "The problem starts when visitors arrive on the product page. Only 11.52% — barely 1 in 9 visitors — are adding to cart. That means the page is not successfully communicating the product's value to the vast majority of visitors.",
      "The funnel then continues to leak: of those who add to cart, only 37.96% make it to checkout, and just 32.41% of those complete the purchase. The resulting 1.42% purchase CVR explains the 1.15x ROAS.",
      "Importantly, this is not a targeting or CPM problem. The traffic is coming in cheaply — the opportunity is to convert more of it once it arrives.",
    ],
    bottleneckLabel: "Product-page conversion",
    bottleneck:
      "The ad is doing its job, but the product page is not persuading enough visitors to take the next step. Fixing ATC rate from 11.52% is the highest-leverage move for this campaign.",
    actions: [
      "Audit the Wordament product page for clarity: Is the age range clearly stated? Are the learning benefits explained simply and visibly above the fold? Parents need to understand the value within seconds.",
      "Add or improve social proof — customer reviews, star ratings, and real-world usage photos. For a word puzzle toy, parental reassurance is a key purchase driver.",
      "Check creative-to-page message alignment. If the ad leads with a specific benefit (e.g. vocabulary building), that same benefit should be the first thing the visitor sees. Mismatches cause immediate bounces.",
      "Test a stronger offer to lower the ATC decision threshold — a modest discount, bundle with a complementary product, or a free-shipping incentive.",
      "Add a short product demonstration video if not already present. Seeing the toy in use by a real child significantly increases confidence.",
      "Also investigate the checkout completion rate (32.41%) — a separate product-specific checkout audit may reveal a shipping or payment friction point.",
    ],
    impact:
      "Improving ATC rate from 11.52% to 15–16% would add 10–15 additional purchases per month at the same spend. Improving checkout completion to 40% compounds that further. Together, these changes could move purchase CVR from 1.42% toward 2.5–3.0%, which translates to a ROAS improvement from 1.15x toward approximately 2x–2.5x.",
    impactMetric: "ROAS",
    impactFrom: "1.15x",
    impactTo: "≈2x–2.5x",
  },

  /* ------------------------------ 5.2 ------------------------------ */
  {
    id: "mustrun",
    section: "5.2",
    short: "Must-Run Sale",
    scoreName: "Must-Run Sale",
    title: ["Must-Run", "Sale Campaign"],
    markets: "Malaysia & Singapore",
    status: "Critical",
    score: { roas: 0.35, cpm: 12.96, ctr: 0.8, cpc: 1.61, atc: 19.18, atcChk: 21.28, chkPur: 10.0, cvr: 0.41 },
    spend: 539.06,
    purchases: 1,
    revenue: 189,
    cpa: 539.06,
    cpaLabel: "CPA",
    rows: [
      r("Spend", "RM539.06", "—", "—", "none"),
      r("Purchases", "1", "—", "—", "none"),
      r("Revenue", "RM189", "—", "—", "none"),
      r("ROAS", "0.35x", "3x+", "Critical — deeply unprofitable", "bad"),
      r("CPA", "RM539.06", "—", "—", "none"),
      r("CPM", "RM12.96", "RM15–25", "Efficient reach", "good"),
      r("Link CTR", "0.80%", "1%+", "Below — modest creative issue", "warn"),
      r("Link CPC", "RM1.61", "< RM2.50", "Acceptable", "good"),
      r("LPV / Click Rate", "73.35%", "75%+", "Slightly below", "warn"),
      r("ATC Rate", "19.18%", "15%+", "Strong — well above target", "good"),
      r("ATC → Checkout", "21.28%", "40%+", "Critical collapse", "bad"),
      r("Checkout → Purchase", "10.00%", "35%+", "Critical — extremely low", "bad"),
      r("Purchase CVR", "0.41%", "3%+", "Extremely low", "bad"),
    ],
    telling: [
      "This campaign has a counterintuitive profile. Traffic is inexpensive, and the ATC rate of 19.18% is actually one of the strongest in the account — people are interested in the product and willing to add it to cart. That is a meaningful signal that the audience and product are reasonably matched.",
      "But something goes catastrophically wrong the moment someone adds to cart. Only 21.28% of people who add to cart reach the checkout page — barely 1 in 5. And of those who do reach checkout, just 10% complete the purchase. These figures are not marginally below benchmark. They indicate a structural barrier — something is actively preventing users from progressing.",
      "The most likely causes are: unexpected shipping charges appearing at cart or checkout, a payment method that does not function correctly for this audience, a promotional code that is required but not working, stock showing unavailable at the payment step, or a checkout error. This is not an audience problem, and it is not a creative problem.",
    ],
    bottleneckLabel: "Cart-to-checkout collapse",
    bottleneck:
      "78.72% of people who add to cart never reach the checkout page, and 90% of those who do never complete the purchase. This is a checkout mechanics or offer problem, not a targeting or creative problem.",
    actions: [
      "Pause this campaign immediately. Continuing to spend without fixing the post-cart barrier generates purchases at RM539 each, which is unsustainable at any margin.",
      "Conduct an end-to-end checkout audit specific to this product: walk through the entire journey from ad click to payment confirmation, testing with each available payment method.",
      "Check whether any promotional or sale pricing is applied correctly at every stage — cart, checkout page, and payment confirmation. A common failure point is a discount that does not carry through to the final payment screen.",
      "Review whether shipping cost is communicated before the cart, and whether any unexpected fees are appearing at checkout.",
      "Verify payment method availability for Malaysian and Singaporean buyers — FPX, GrabPay, Touch'n Go, PayNow, and other local options should be active.",
      "Once the issue is resolved, rebuild with a small test budget (RM10–15/day) for 5–7 days before reinstating full spend.",
    ],
    impact:
      "Given that ATC rate is already 19.18%, fixing the post-cart issue alone could transform this campaign. If ATC → Checkout improves from 21% to 50% and Checkout → Purchase from 10% to 35%, purchase CVR moves from 0.41% to approximately 3.4% — a transformation from the worst-performing to a solid contributor.",
    impactMetric: "Purchase CVR",
    impactFrom: "0.41%",
    impactTo: "≈3.4%",
  },

  /* ------------------------------ 5.3 ------------------------------ */
  {
    id: "baby",
    section: "5.3",
    short: "Baby Campaign",
    scoreName: "Baby Campaign",
    title: ["Jun 2026", "Baby Campaign"],
    markets: "Malaysia & Singapore",
    status: "Strong",
    score: { roas: 2.39, cpm: 21.84, ctr: 1.15, cpc: 1.9, atc: 20.35, atcChk: 51.56, chkPur: 42.42, cvr: 4.45 },
    spend: 1497.18,
    purchases: 28,
    revenue: 3575,
    cpa: 53.47,
    cpaLabel: "CPA (Calculated)*",
    rows: [
      r("Spend", "RM1,497.18", "—", "—", "none"),
      r("Purchases", "28", "—", "—", "none"),
      r("Revenue", "RM3,575", "—", "—", "none"),
      r("ROAS", "2.39x", "3x+", "Below target but healthiest in account", "warn"),
      r("CPA (Calculated)*", "RM53.47", "—", "—", "none"),
      r("CPM", "RM21.84", "RM15–25", "Within target range", "good"),
      r("Link CTR", "1.15%", "1%+", "On target", "good"),
      r("Link CPC", "RM1.90", "< RM2.50", "Acceptable", "good"),
      r("LPV / Click Rate", "79.82%", "75%+", "Strong", "good"),
      r("ATC Rate", "20.35%", "15%+", "Strong — well above target", "good"),
      r("ATC → Checkout", "51.56%", "40%+", "Strong", "good"),
      r("Checkout → Purchase", "42.42%", "35%+", "Above target", "good"),
      r("Purchase CVR", "4.45%", "3%+", "Strong — above the 3% target", "good"),
    ],
    telling: [
      "This is the standout campaign in the account. Every stage of the funnel is performing at or above benchmark: a 79.82% LPV rate, a 20.35% ATC rate, a 51.56% cart-to-checkout progression, a 42.42% checkout completion, and a 4.45% purchase CVR. This campaign is proof that the website, the checkout, and the overall infrastructure are working — the same website that the other campaigns struggle with is converting well here.",
      "The ROAS of 2.39x is the highest in the account and approaching the 3x mark. The main constraint is not performance — it is reach. With a frequency of 3.30 against 20,751 users, the current audience may be approaching saturation. The strategic challenge is expanding reach without disrupting the funnel that is already working.",
    ],
    bottleneckLabel: "No critical bottleneck",
    bottleneck:
      "The funnel is healthy at every measured stage. The priority is protecting efficiency while expanding reach and refreshing creatives to manage frequency.",
    actions: [
      "Protect the current structure — do not make major changes to audience, creative format, or campaign settings. Unnecessary changes reset learning and risk breaking what works.",
      "Increase budget gradually — no more than 20–30% over 3–5 day windows. Sudden jumps trigger Meta's learning phase and can destabilise performance.",
      "Introduce 2–3 fresh creatives to address the rising frequency (3.30). Test different hooks: UGC-style footage of parents using the toy, benefit-led messaging, or a \"milestone moments\" emotional angle.",
      "Explore broader audience targeting (lookalikes from purchasers, Advantage+ audiences) to find more users without paying a higher CPM for the same saturated pool.",
      "Test a gifting creative angle ahead of the year-end period: \"The perfect starter toy for your little one,\" \"The gift every new parent wishes they had.\"",
      "Test a bundle or slightly higher-value offer — increasing average order value lifts ROAS without requiring more purchases or lower ad costs.",
    ],
    impact:
      "A controlled 20–30% budget increase with fresh creatives should sustain or improve the current ROAS. If AOV can be lifted even modestly through bundling, ROAS could push from 2.39x toward 2.80x–3.20x within 30 days, making this the anchor campaign for the year-end push.",
    impactMetric: "ROAS",
    impactFrom: "2.39x",
    impactTo: "2.80x–3.20x",
    note: "* Data note: The CPA figure provided for this campaign was RM55.45. Our independent calculation (RM1,497.18 ÷ 28 purchases) gives RM53.47. We use the calculated figure. The discrepancy likely reflects a rounding or attribution difference in the Meta export and does not affect the strategic analysis.",
  },

  /* ------------------------------ 5.4 ------------------------------ */
  {
    id: "flash",
    section: "5.4",
    short: "Flash Cards",
    scoreName: "Flash Cards",
    title: ["Flash Cards", "Campaign"],
    markets: "Singapore & Malaysia",
    status: "Needs Improvement",
    score: { roas: 1.96, cpm: 27.65, ctr: 0.9, cpc: 3.06, atc: 19.01, atcChk: 50.0, chkPur: 50.77, cvr: 4.82 },
    spend: 3050.07,
    purchases: 33,
    revenue: 5966,
    cpa: 92.43,
    cpaLabel: "CPA",
    rows: [
      r("Spend", "RM3,050.07", "—", "—", "none"),
      r("Purchases", "33", "—", "—", "none"),
      r("Revenue", "RM5,966", "—", "—", "none"),
      r("ROAS", "1.96x", "3x+", "Below target — traffic cost is the drag", "warn"),
      r("CPA", "RM92.43", "—", "—", "none"),
      r("CPM", "RM27.65", "RM15–25", "Above target — expensive reach", "warn"),
      r("Link CTR", "0.90%", "1%+", "Slightly below — creative can improve", "warn"),
      r("Link CPC", "RM3.06", "< RM2.50", "High — needs to come down", "warn"),
      r("LPV / Click Rate", "68.61%", "75%+", "Below — some traffic not landing", "warn"),
      r("ATC Rate", "19.01%", "15%+", "Strong", "good"),
      r("ATC → Checkout", "50.00%", "40%+", "Strong", "good"),
      r("Checkout → Purchase", "50.77%", "35%+", "Excellent", "good"),
      r("Purchase CVR", "4.82%", "3%+", "Excellent — best in account", "good"),
    ],
    telling: [
      "Flash Cards has the best post-click funnel in the entire account. A 4.82% purchase CVR, a 50.77% checkout completion, and a strong 19.01% ATC rate together paint a clear picture: people who land on this product page are very likely to buy. That is a valuable asset.",
      "The problem is not what happens after the click — it is what happens before it. At RM27.65 CPM and RM3.06 CPC, this campaign is paying a significant premium to deliver visitors to that strong landing page. The CTR of 0.90% is not generating enough clicks per impression, and the LPV rate of 68.61% suggests that a meaningful proportion of clicks are not fully loading the product page — pointing to potential tracking, redirect, or creative destination issues.",
      "The core lever here is traffic cost. If CPM can be reduced from RM27.65 toward RM20–22 while the post-click funnel stays intact, ROAS moves significantly without any product-page changes.",
    ],
    bottleneckLabel: "Traffic efficiency",
    bottleneck:
      "CPM is too high and CTR is below 1%, meaning this campaign is paying more per qualified visitor than it should. The post-click funnel is excellent; the traffic acquisition is the problem.",
    actions: [
      "Focus creative investment here: test 2–3 new ad concepts with different visual approaches and hooks. Educational benefit hooks (\"The flashcard set that actually keeps them focused\"), parent pain-point angles (\"Tired of flashcards your child ignores?\"), and comparison messaging.",
      "Test UGC-style creative — a parent demonstrating the cards with their child in a natural setting tends to outperform polished studio content and typically achieves lower CPMs.",
      "Investigate the 68.61% LPV rate: check whether the campaign landing URL includes redirects, and whether the destination page loads correctly on mobile.",
      "Test broader or alternative audiences — expanding to Advantage+ audiences or broader interest layers may unlock cheaper inventory.",
      "Test alternative ad placements — if the campaign is heavily weighted toward Feed, Reels placements typically offer lower CPMs and can reach the same demographic.",
      "Add gifting-angle creatives ahead of the year-end season — Flash Cards have strong gift appeal and \"educational gift\" messaging resonates well in both markets.",
    ],
    impact:
      "Reducing CPM from RM27.65 toward RM20–22 and improving CTR from 0.90% to 1.20–1.30%, while maintaining the same post-click conversion rate, could push ROAS from 1.96x toward 2.80x–3.30x. That improvement is achievable through creative testing alone — without changing the product page.",
    impactMetric: "ROAS",
    impactFrom: "1.96x",
    impactTo: "2.80x–3.30x",
  },

  /* ------------------------------ 5.5 ------------------------------ */
  {
    id: "tangram",
    section: "5.5",
    short: "Tangram & Stacking Stones",
    scoreName: "Tangram & Stones",
    title: ["Tangram &", "Stacking Stones"],
    markets: "Singapore & Malaysia",
    status: "Needs Improvement",
    score: { roas: 1.43, cpm: 29.0, ctr: 1.08, cpc: 2.69, atc: 16.19, atcChk: 51.85, chkPur: 32.86, cvr: 2.76 },
    spend: 2891.45,
    purchases: 23,
    revenue: 4130,
    cpa: 125.72,
    cpaLabel: "CPA",
    rows: [
      r("Spend", "RM2,891.45", "—", "—", "none"),
      r("Purchases", "23", "—", "—", "none"),
      r("Revenue", "RM4,130", "—", "—", "none"),
      r("ROAS", "1.43x", "3x+", "Well below target", "bad"),
      r("CPA", "RM125.72", "—", "—", "none"),
      r("CPM", "RM29.00", "RM15–25", "Highest in account — expensive", "bad"),
      r("Link CTR", "1.08%", "1%+", "Meets target", "good"),
      r("Link CPC", "RM2.69", "< RM2.50", "Slightly above target", "warn"),
      r("LPV / Click Rate", "77.65%", "75%+", "Good", "good"),
      r("ATC Rate", "16.19%", "15%+", "Meets target", "good"),
      r("ATC → Checkout", "51.85%", "40%+", "Strong", "good"),
      r("Checkout → Purchase", "32.86%", "35%+", "Below target — worth investigating", "warn"),
      r("Purchase CVR", "2.76%", "3%+", "Slightly below — room to improve", "warn"),
    ],
    telling: [
      "This campaign has two distinct problems that together suppress its ROAS to 1.43x.",
      "The first is traffic cost. At RM29.00 CPM — the highest of all five campaigns — this account is paying the most to reach an audience that, while clicking at a reasonable 1.08% CTR, is simply too expensive to acquire profitably at the current conversion rate. The CPC of RM2.69 reflects that CPM pressure.",
      "The second is checkout completion. ATC → Checkout is actually strong at 51.85% — people who add to cart are moving to checkout confidently. But the Checkout → Purchase rate of 32.86% falls below the 35% benchmark, meaning only about 1 in 3 people who reach the payment page complete the purchase. Combined with the high CPM, this additional leak compounds the ROAS drag. This warrants a product-specific checkout audit — particularly around shipping charges, delivery timelines, or payment method compatibility.",
    ],
    bottleneckLabel: "Dual problem",
    bottleneck:
      "(1) CPM of RM29.00 makes traffic expensive, inflating cost per purchase, and (2) a 32.86% checkout completion rate means only about 1 in 3 people who reach checkout complete the purchase.",
    actions: [
      "On traffic cost: test new creative formats and hooks specifically designed to reduce CPM — Reels-first content, strong visual openings, and Advantage+ audience targeting often unlock cheaper inventory.",
      "On checkout: conduct a specific audit for the Tangram and Stacking Stones products. Check whether shipping charges for these items (which may be heavier or bulkier) are surprising buyers, and whether delivery timelines are clearly communicated.",
      "Hold daily spend stable and do not attempt to scale. Scaling a campaign with RM29 CPM without first improving creative efficiency will increase absolute spend without proportional ROAS improvement.",
      "Test a broader audience to reduce CPM pressure — narrower audiences in competitive interest segments often carry higher CPMs than Advantage+ or broader targeting.",
      "Once a lower-CPM creative is identified and validated, increase budget in 15–20% increments and monitor checkout completion closely before committing further spend.",
    ],
    impact:
      "Reducing CPM from RM29.00 toward RM22–24 would lower CPC proportionally, delivering more qualified visitors per RM spent. If checkout completion improves from 32.86% to 40%+, purchase CVR would move from 2.76% toward 3.5–4.0%. Combined, ROAS could shift from 1.43x toward 2.20x–2.60x within 30–45 days.",
    impactMetric: "ROAS",
    impactFrom: "1.43x",
    impactTo: "2.20x–2.60x",
  },
];

/* ------------------------------ Audit ------------------------------ */
export type Check = { title: string; body: string };

export const AUDIT = {
  global: [
    {
      title: "Mobile page speed and Core Web Vitals",
      body: "Most paid traffic from Malaysia and Singapore arrives on mobile. Pages that take more than 3–4 seconds to load see significantly higher bounce rates. Use Google PageSpeed Insights and test on mid-range Android devices common in the region.",
    },
    {
      title: "Mobile navigation and UX",
      body: "Verify that product pages, the cart drawer, and the checkout are fully usable and error-free on iOS Safari and Android Chrome.",
    },
    {
      title: "Pixel and CAPI integrity",
      body: "Confirm that Purchase, AddToCart, InitiateCheckout, and ViewContent events are all firing correctly and de-duplicating between browser pixel and server-side CAPI. Misfiring or double-firing events distort every ROAS figure in this report.",
    },
    {
      title: "Redirects and broken destination URLs",
      body: "Any campaign landing URL that redirects before loading adds latency and risks losing visitors. The Flash Cards campaign's LPV rate of 68.61% (below the 75% benchmark) may partly reflect this — worth checking directly.",
    },
    {
      title: "Cross-device checkout testing",
      body: "Complete a test purchase end-to-end on multiple device types and browsers to catch technical errors that may not surface in standard QA.",
    },
  ] as Check[],
  product: [
    {
      title: "Product imagery and video",
      body: "High-quality photos from multiple angles, and a short video showing the toy in use by a real child. Parents need to visualise the play experience before buying.",
    },
    {
      title: "Benefit communication above the fold",
      body: "Are learning outcomes, age suitability and play type immediately visible without scrolling? Most mobile visitors decide within 3 seconds whether to stay.",
    },
    {
      title: "Age range and developmental stage",
      body: "Clearly stating the target age and what developmental milestone the toy supports removes a primary hesitation for parents choosing children's gifts.",
    },
    {
      title: "Social proof",
      body: "Reviews, ratings, and user photos. Wordament's 11.52% ATC rate suggests the product page is not yet building enough buyer confidence. Check how reviews are displayed on mobile.",
    },
    {
      title: "Creative-to-page message consistency",
      body: "If the ad leads with a specific angle (e.g. \"builds vocabulary\"), the landing page should reinforce that exact benefit immediately. A mismatch is a significant source of bounce.",
    },
    {
      title: "Price and offer clarity",
      body: "Is the price clearly justified by the perceived value? Is any promotional pricing or offer clearly displayed and applied throughout the journey?",
    },
  ] as Check[],
  checkout: [
    {
      title: "Shipping cost transparency",
      body: "Unexpected shipping charges revealed at cart or checkout are the leading cause of abandonment in e-commerce. If shipping is not communicated on the product page, test surfacing it earlier.",
    },
    {
      title: "Payment method coverage",
      body: "Buyers in Malaysia and Singapore expect: FPX, credit/debit cards, GrabPay, Touch'n Go eWallet, PayNow (SG), PayLah! (SG), and ideally a buy-now-pay-later option. Verify all are functioning.",
    },
    {
      title: "Discount and promotional code functionality",
      body: "If any campaign runs with an associated promo code, test that code at every checkout stage. A code that fails to apply at payment will cause abandonment without any visible error.",
    },
    {
      title: "Stock availability at checkout",
      body: "If a product displays as \"available\" on the product page but triggers an out-of-stock error at checkout, purchases cannot complete.",
    },
    {
      title: "Checkout error logging",
      body: "Use your analytics or error monitoring tool to capture any JavaScript errors or payment gateway failures that may be silently blocking completions.",
    },
  ] as Check[],
  tracking: [
    {
      title: "Events Manager audit",
      body: "Verify that all standard events (Purchase, AddToCart, InitiateCheckout, ViewContent) are firing and showing correct deduplication status between pixel and CAPI.",
    },
    {
      title: "Revenue passing",
      body: "Confirm that every Purchase event is passing the correct order value. A misconfigured event that fires without revenue data will count the purchase but show RM0 in conversion value, directly understating ROAS.",
    },
    {
      title: "Attribution window consistency",
      body: "Confirm that a 7-day click, 1-day view attribution window is applied uniformly across all campaigns for a fair comparison of results.",
    },
  ] as Check[],
};

/* ----------------------------- Roadmap ----------------------------- */
export type Week = { label: string; dates: string; name: string; items: string[] };

export const WEEKS: Week[] = [
  {
    label: "Week 1",
    dates: "Oct 8–14",
    name: "Audit and Stabilise",
    items: [
      "Pause the Must-Run Sale campaign immediately. Do not resume until the checkout audit is complete and the blocking issue is identified.",
      "Complete global website audit: page speed (mobile), pixel/CAPI event accuracy, checkout error logging, URL redirect check.",
      "Walk the checkout end-to-end for each product: complete test purchases using all available payment methods. Document any friction points.",
      "Pull ad-level performance data for all remaining campaigns — identify which specific creatives are driving spend, and whether any are clearly underperforming.",
      "Review each product page against the checklist in Section 6.2. Prioritise Wordament and Tangram product pages.",
    ],
  },
  {
    label: "Week 2",
    dates: "Oct 15–21",
    name: "Launch Creative Tests",
    items: [
      "Launch 2–3 new creative variants for Flash Cards — focus on hooks, UGC style, and educational benefit framing. Keep all other variables the same.",
      "Launch 1–2 new creative variants for Tangram & Stacking Stones — test Reels-first format to target lower CPM inventory.",
      "Implement product-page improvements for Wordament — at minimum: add social proof, clarify age suitability and benefit copy, verify creative-to-page message alignment.",
      "Refresh 1–2 Baby Campaign creatives to manage the rising frequency (3.30) without changing campaign structure or budget.",
      "If Must-Run Sale checkout issue is identified and resolved, launch a clean retest at RM10–15/day with a single ad set.",
    ],
  },
  {
    label: "Week 3",
    dates: "Oct 22–28",
    name: "Review and Iterate",
    items: [
      "Evaluate Flash Cards creative test: pause any variant with CPM ≥ RM28 or CTR < 0.80% after 4–5 days of spend. Scale any variant showing CPM < RM22.",
      "Check Wordament ATC rate daily — look for movement from 11.52% toward 13–15%. If no movement after 7–10 days, escalate the product-page changes.",
      "Review Tangram Reels performance — compare CPM versus the existing campaign. If Reels CPM is lower by >15%, shift budget allocation accordingly.",
      "Begin planning November and December offers: gifting bundles, Buy More Save More tiers, free-shipping thresholds, product pairing ideas.",
    ],
  },
  {
    label: "Week 4",
    dates: "Oct 29 – Nov 4",
    name: "Assess and Prepare",
    items: [
      "Conduct full performance review: which campaigns showed measurable improvement? Which metrics moved? What remains unresolved?",
      "For any campaign with confirmed funnel improvement, plan a 20% budget increase in early November.",
      "Finalise November creative brief — gifting angles, product bundle messaging, year-end calls to action. Creatives should be in production before November begins.",
      "Build retargeting audiences from October traffic: product-page visitors, ATC non-buyers, and checkout abandoners from all campaigns.",
    ],
  },
  {
    label: "Week 5–6",
    dates: "Nov 5–18",
    name: "Scale Proven Winners",
    items: [
      "Increase Baby Campaign budget by 20–30% if creative refresh is performing. This is the highest-priority campaign for scaling.",
      "Scale Flash Cards if CPM has reduced below RM22 — the post-click funnel is too good to leave underinvested.",
      "Launch gifting-angle creative variants across all active campaigns. Year-end purchase intent begins building in November in both Malaysia and Singapore.",
      "Launch retargeting campaigns targeting October's ATC and checkout abandoners. November is an ideal time for warm retargeting — buyers are beginning to think about gifts and are more responsive to reminder ads.",
    ],
  },
  {
    label: "Week 7–8",
    dates: "Nov 19–30",
    name: "Year-End Ramp",
    items: [
      "Launch pre-holiday promotional messaging: early-bird offers, limited-time bundles, free-shipping thresholds. Test which offer resonates best before committing it to December.",
      "Ensure all winning campaigns are at stable, tested budgets before December 1. Do not introduce major structural changes in December — that is the time to execute, not to experiment.",
      "Increase retargeting audience pools to include all November site visitors. The larger the warm audience entering December, the more efficiently December retargeting campaigns will perform.",
      "Final budget allocation review: confirm which campaigns are scaling efficiently and deserve December priority budget.",
    ],
  },
];

/* ------------------------------ Gifting ------------------------------ */
export const GIFT = {
  intro:
    "The year-end period is typically the strongest gifting window for children's toys in Malaysia and Singapore. While Christmas is relevant — particularly in Singapore and among non-Muslim Malaysian consumers — the broader driver is year-end gifting intent, school holiday purchases, and family gathering dynamics. The strategy below treats this as a gifting season rather than a single-event promotion.",
  creative: [
    "Lead with gifting narratives: \"The gift that grows with them,\" \"Give the gift of learning this holiday,\" \"Guaranteed smiles on Christmas morning.\" Warm, emotionally resonant imagery outperforms hard-sell approaches in this period.",
    "Develop creative tailored to different gifting relationships — parents choosing for their child, grandparents buying for grandchildren, friends selecting a baby shower gift. Each relationship has a different emotional trigger.",
    "Use time-sensitivity appropriately: delivery cutoff dates, last-order-before-Christmas reminders, and limited stock messaging all perform well when used with honesty. Avoid fake urgency — it erodes trust and suppresses repeat purchases.",
    "Test lifestyle imagery of children playing with the toys in a festive or family home setting. The warmer and more real the imagery, the stronger it tends to perform in the gifting window.",
  ],
  offers: [
    {
      title: "Bundles",
      body: "Pair products that complement each other across campaigns — Wordament + Flash Cards (language and literacy), Tangram + Stacking Stones (spatial and fine motor). Bundles increase average order value and simplify the gifting decision.",
    },
    {
      title: "Buy More Save More",
      body: "A tiered incentive (e.g. spend RM100 save RM10, spend RM180 save RM25) encourages higher cart values, improves AOV, and strengthens ROAS without requiring lower per-unit pricing.",
    },
    {
      title: "Free shipping threshold",
      body: "If margins allow, offering free shipping above a basket value (e.g. free shipping over RM90) reduces cart abandonment and nudges buyers toward adding a second item. This is one of the most effective conversion levers in the SEA market.",
    },
    {
      title: "Gift-ready packaging option",
      body: "A small paid add-on for gift wrapping or a personalised card. Minimal cost to fulfil, strong gifting appeal, and adds incremental revenue per order.",
    },
  ],
  campaign: [
    "Scale proven performers only in December. The Baby Campaign and Flash Cards (if CPM has improved) are the priority. Do not experiment with untested structures when purchase intent is at its seasonal peak.",
    "Retargeting is the highest-priority tactic for December. Anyone who visited a product page, added to cart, or initiated checkout in October and November is a warm, high-intent prospect. Retargeting these audiences with gifting creative and a clear offer is typically the most efficient spend in the year-end window.",
    "Prepare December campaigns in November — creatives, offers, and audience lists should all be ready before December 1. Changes made mid-December during Meta's most competitive auction period are risky and expensive.",
  ],
  dates: [
    {
      date: "Nov 11",
      event: "11.11 — Singles Day",
      body: "Major promotional moment in Malaysia and Singapore. Align an offer launch around this date — it is now a mainstream shopping event in both markets.",
    },
    {
      date: "Dec 12",
      event: "12.12 — Double 12",
      body: "Second major sales date of the year-end period. Good anchor for a mid-December campaign push with urgency messaging.",
    },
    {
      date: "Dec 20–25",
      event: "Christmas",
      body: "Relevant in Singapore and among non-Muslim Malaysian consumers. Gift-focused creative peaks in the week before Christmas.",
    },
    {
      date: "Mid-Dec",
      event: "Year-End School Holidays",
      body: "Both Malaysian and Singaporean schools break in mid-to-late December, creating a natural window for family purchases and toy gifts.",
    },
    {
      date: "Dec 31 – Jan 1",
      event: "New Year",
      body: "Carry gifting and \"new year, new skills\" messaging into the last week of December for continued momentum.",
    },
  ],
};

/* ------------------------------ Path to 4x ------------------------------ */
export const PATH = [
  { lever: "CPM", current: "RM19.13", target: "RM15–18", why: "Lower CPM = cheaper reach = more visitors per RM spent" },
  { lever: "Link CTR", current: "1.03%", target: "1.30–1.50%", why: "Higher CTR = more clicks per impression = lower effective CPC" },
  { lever: "Link CPC", current: "RM1.87", target: "< RM1.50", why: "Cheaper clicks allow the same budget to buy more traffic" },
  { lever: "LPV / Click", current: "75.62%", target: "80%+", why: "Better page load = more visitors who actually see the product" },
  { lever: "ATC Rate", current: "14.40%", target: "17–19%", why: "More visitors adding to cart means a larger pool entering the checkout" },
  { lever: "ATC → Checkout", current: "43.31%", target: "48–52%", why: "Fewer cart abandoners means more checkout attempts" },
  { lever: "Checkout → Purchase", current: "37.08%", target: "42–46%", why: "Higher checkout completion directly increases purchases" },
  { lever: "Purchase CVR", current: "2.31%", target: "3.50–4.50%", why: "Combined funnel improvement: more buyers from the same traffic" },
  { lever: "AOV (Avg Order Value)", current: "Current level", target: "Higher via bundles", why: "More revenue per purchase without spending more on ads" },
  { lever: "CPA (Cost per Purchase)", current: "RM106.71", target: "RM65–80", why: "Lower CPA = more purchases within the same budget" },
  { lever: "ROAS", current: "1.48x", target: "4.00x", why: "Every RM1 spent returns RM4 — the combined outcome of all the above" },
];

/* ------------------------------ Budget ------------------------------ */
export const BUDGET = [
  {
    campaign: "Baby Campaign",
    direction: "Maintain, then increase gradually if creative refresh holds",
    priority: "Highest",
    rationale: "Strongest funnel efficiency. Protect and scale carefully — up to 20–30% if performance is stable.",
    tone: "good" as Tone,
  },
  {
    campaign: "Flash Cards",
    direction: "Hold — reduce if CPM stays above RM27 after creative tests",
    priority: "High",
    rationale: "Excellent post-click funnel. Wait for CPM improvement before scaling. The upside here is significant.",
    tone: "good" as Tone,
  },
  {
    campaign: "Wordament",
    direction: "Hold or slight reduction while product page is being fixed",
    priority: "Medium",
    rationale: "Low CPM is a positive worth protecting. Hold spend while ATC rate is being improved, then reassess.",
    tone: "warn" as Tone,
  },
  {
    campaign: "Tangram",
    direction: "Hold — no increase until CPM and checkout are addressed",
    priority: "Medium",
    rationale: "Dual bottleneck: expensive traffic and weak checkout completion. Fix both before committing more budget.",
    tone: "warn" as Tone,
  },
  {
    campaign: "Must-Run Sale",
    direction: "Pause immediately — rebuild only when checkout is fixed",
    priority: "Pause",
    rationale: "Every purchase at RM539 CPA generates a significant loss. Spending here without fixing the issue compounds the loss daily.",
    tone: "bad" as Tone,
  },
];

/* ------------------------------ KPIs ------------------------------ */
export const KPIS = [
  { kpi: "ROAS", current: "1.48x", d30: "1.80–2.20x", d60: "2.50–3.00x" },
  { kpi: "CPA (Cost per Purchase)", current: "RM106.71", d30: "RM85–95", d60: "RM70–85" },
  { kpi: "Link CTR", current: "1.03%", d30: "1.10–1.20%", d60: "1.20–1.40%" },
  { kpi: "Link CPC", current: "RM1.87", d30: "RM1.70–1.80", d60: "RM1.50–1.65" },
  { kpi: "LPV / Click Rate", current: "75.62%", d30: "77–79%", d60: "79–82%" },
  { kpi: "ATC Rate", current: "14.40%", d30: "15.5–17%", d60: "17–19%" },
  { kpi: "ATC → Checkout", current: "43.31%", d30: "45–48%", d60: "48–52%" },
  { kpi: "Checkout → Purchase", current: "37.08%", d30: "39–42%", d60: "42–46%" },
  { kpi: "Purchase CVR", current: "2.31%", d30: "2.70–3.10%", d60: "3.20–4.00%" },
  { kpi: "CPM", current: "RM19.13", d30: "RM17–19", d60: "RM15–18" },
];
