/**
 * State income tax + employee-paid state payroll taxes (2026 tax year), all 50 states + DC.
 *
 * Sources (researched November 2026):
 *  - Tax Foundation, "State Individual Income Tax Rates and Brackets, 2026" (law as of Feb 11, 2026)
 *  - Mid-2026 changes layered on top: Georgia HB 463 (4.99%, $15k/$30k standard deduction, $5k dependents),
 *    South Carolina H.4216 (1.99% to $30,000, 5.21% above), Arkansas special session (top rate 3.7%),
 *    Utah SB 60 (4.45%), West Virginia SB 392 (every rate cut 5%), Arizona HB 4168 (std deduction $15,750/$31,500),
 *    South Carolina Act 110 (SCIAD replaces the standard deduction), Maine 2026 std deduction ($15,700),
 *    Hawaii Act 46 (std deduction $8,000/$16,000 for 2026), Ohio HB 96 ($332 base), Missouri federal-tax subtraction %
 *  - Cross-checked against an independent 50-state take-home table (FedRateCalc, $60k single) — see notes in the repo
 *  - State payroll taxes: CA SDI, NJ TDI/FLI, NY DBL/PFL, RI TDI, HI TDI, WA Cares/PFML, OR, CO, MA, MN, CT paid leave
 *
 * This estimates annual state liability on annualised wages (withholding tables differ slightly).
 * UPDATE EVERY JANUARY and re-check states that legislate mid-year.
 */

export type StateFiling = "single" | "married" | "married_separate" | "head";
type Br = Array<[number, number]>; // [lower bound of taxable income, rate]

export const STATE_TAX_YEAR = 2026;
export const STATE_DATA_AS_OF = "November 2026";

const FED_STD: Record<StateFiling, number> = { single: 16100, married: 32200, married_separate: 16100, head: 24150 };
const SS_BASE = 184500; // 2026 Social Security wage base (cap for most state paid-leave programs)

interface Rule {
  s: Br;
  m?: Br; // married filing jointly brackets (defaults to s)
  std?: [number, number] | "fed"; // standard deduction [single, joint] or the federal amount
  stdH?: number; // head-of-household standard deduction where the state has its own
  exempt?: [number, number, number]; // personal exemption deductions [single, joint, per dependent]
  credit?: [number, number, number]; // non-refundable credits [single, joint, per dependent]
  taxes401k?: boolean; // state taxes 401(k) deferrals (PA, NJ)
  fedTax?: [number, number]; // max federal income tax deductible on the state return [single, joint]
  localDefault?: number; // typical local income tax % applied by default
  localHint?: string;
}

export const NO_INCOME_TAX_STATES = [
  "Alaska", "Florida", "Nevada", "New Hampshire", "South Dakota", "Tennessee", "Texas", "Washington", "Wyoming",
];

const flat = (r: number): Br => [[0, r]];

const RULES: Record<string, Rule> = {
  Alabama: {
    s: [[0, 0.02], [500, 0.04], [3000, 0.05]],
    m: [[0, 0.02], [1000, 0.04], [6000, 0.05]],
    fedTax: [Infinity, Infinity],
    localHint: "Some Alabama cities and counties levy an occupational tax.",
  },
  Arizona: { s: flat(0.025), std: [15750, 31500], stdH: 23625, credit: [0, 0, 100] },
  Arkansas: { s: [[0, 0.02], [4600, 0.037]], std: [2470, 4940], credit: [29, 58, 29] }, // low-income table handled below
  California: {
    s: [[0, 0.01], [11079, 0.02], [26264, 0.04], [41452, 0.06], [57542, 0.08], [72724, 0.093], [371479, 0.103], [445771, 0.113], [742953, 0.123], [1000000, 0.133]],
    m: [[0, 0.01], [22158, 0.02], [52528, 0.04], [82904, 0.06], [115084, 0.08], [145448, 0.093], [742958, 0.103], [891542, 0.113], [1000000, 0.123], [1485906, 0.133]],
    std: [5706, 11412], // 2025 actual (2026 indexed values not yet confirmed)
    stdH: 11412,
    credit: [153, 306, 153],
  },
  Colorado: { s: flat(0.044), std: "fed" },
  Connecticut: {
    s: [[0, 0.02], [10000, 0.045], [50000, 0.055], [100000, 0.06], [200000, 0.065], [250000, 0.069], [500000, 0.0699]],
    m: [[0, 0.02], [20000, 0.045], [100000, 0.055], [200000, 0.06], [400000, 0.065], [500000, 0.069], [1000000, 0.0699]],
    exempt: [15000, 24000, 0],
  },
  Delaware: {
    s: [[0, 0], [2000, 0.022], [5000, 0.039], [10000, 0.048], [20000, 0.052], [25000, 0.0555], [60000, 0.066]],
    std: [3250, 6500],
    credit: [110, 220, 110],
    localHint: "Wilmington levies a 1.25% city wage tax.",
  },
  "District of Columbia": {
    s: [[0, 0.04], [10000, 0.06], [40000, 0.065], [60000, 0.085], [250000, 0.0925], [500000, 0.0975], [1000000, 0.1075]],
    std: "fed",
  },
  Georgia: { s: flat(0.0499), std: [15000, 30000], exempt: [0, 0, 5000] },
  Hawaii: {
    s: [[0, 0.014], [9600, 0.032], [14400, 0.055], [19200, 0.064], [24000, 0.068], [36000, 0.072], [48000, 0.076], [125000, 0.079], [175000, 0.0825], [225000, 0.09], [275000, 0.1], [325000, 0.11]],
    m: [[0, 0.014], [19200, 0.032], [28800, 0.055], [38400, 0.064], [48000, 0.068], [72000, 0.072], [96000, 0.076], [250000, 0.079], [350000, 0.0825], [450000, 0.09], [550000, 0.1], [650000, 0.11]],
    std: [8000, 16000], // Act 46 step for tax years 2026-2027
    stdH: 12000,
    exempt: [1144, 2288, 1144],
  },
  Idaho: { s: [[0, 0], [4811, 0.053]], m: [[0, 0], [9622, 0.053]], std: "fed" },
  Illinois: { s: flat(0.0495), exempt: [2925, 5850, 2925] },
  Indiana: {
    s: flat(0.0295),
    exempt: [1000, 2000, 2500], // $1,000 base + $1,500 for dependent children
    localHint: "Indiana counties levy a local income tax (typically 1%–3%).",
  },
  Iowa: { s: flat(0.038), std: "fed", credit: [40, 80, 40] },
  Kansas: { s: [[0, 0.052], [23000, 0.0558]], m: [[0, 0.052], [46000, 0.0558]], std: [3605, 8240], exempt: [9160, 18320, 2320] },
  Kentucky: {
    s: flat(0.035),
    std: [3360, 3360],
    localHint: "Many Kentucky cities and counties levy an occupational tax (often 1%–2.5%).",
  },
  Louisiana: { s: flat(0.03), std: [12875, 25750] },
  Maine: {
    s: [[0, 0.058], [27399, 0.0675], [64849, 0.0715]],
    m: [[0, 0.058], [54849, 0.0675], [129749, 0.0715]],
    std: [15700, 31400], // 2026 law change (MRS Tax Alert Aug 2026); phase-out for high incomes not modelled
    stdH: 23550,
    exempt: [5300, 10600, 0],
    credit: [0, 0, 305],
  },
  Maryland: {
    s: [[0, 0.02], [1000, 0.03], [2000, 0.04], [3000, 0.0475], [100000, 0.05], [125000, 0.0525], [150000, 0.055], [250000, 0.0575], [500000, 0.0625], [1000000, 0.065]],
    m: [[0, 0.02], [1000, 0.03], [2000, 0.04], [3000, 0.0475], [150000, 0.05], [175000, 0.0525], [225000, 0.055], [300000, 0.0575], [600000, 0.0625], [1200000, 0.065]],
    localDefault: 3.2,
    localHint: "Maryland county income tax is withheld on top of state tax (roughly 2.25%–3.3% by county). Edit to your county's rate.",
  },
  Massachusetts: { s: [[0, 0.05], [1083150, 0.09]], exempt: [4400, 8800, 1000] },
  Michigan: {
    s: flat(0.0425),
    exempt: [5900, 11800, 5900],
    localHint: "About two dozen Michigan cities (e.g., Detroit) levy a city income tax.",
  },
  Minnesota: {
    s: [[0, 0.0535], [33310, 0.068], [109430, 0.0785], [203150, 0.0985]],
    m: [[0, 0.0535], [48700, 0.068], [193480, 0.0785], [337930, 0.0985]],
    std: [15300, 30600],
    exempt: [0, 0, 5300],
  },
  Mississippi: { s: [[0, 0], [10000, 0.04]], std: [2300, 4600], exempt: [6000, 12000, 1500] },
  Missouri: {
    s: [[0, 0], [1348, 0.02], [2696, 0.025], [4044, 0.03], [5392, 0.035], [6740, 0.04], [8088, 0.045], [9436, 0.047]],
    std: "fed",
    fedTax: [5000, 10000],
    localHint: "Kansas City and St. Louis levy a 1% earnings tax on wages.",
  },
  Montana: { s: [[0, 0.047], [47500, 0.0565]], m: [[0, 0.047], [95000, 0.0565]], std: "fed" },
  Nebraska: {
    s: [[0, 0.0246], [4130, 0.0351], [24760, 0.0455]],
    m: [[0, 0.0246], [8250, 0.0351], [49530, 0.0455]],
    std: [8850, 17700],
    credit: [176, 352, 176],
  },
  "New Jersey": {
    s: [[0, 0.014], [20000, 0.0175], [35000, 0.035], [40000, 0.0553], [75000, 0.0637], [500000, 0.0897], [1000000, 0.1075]],
    m: [[0, 0.014], [20000, 0.0175], [50000, 0.0245], [70000, 0.035], [80000, 0.0553], [150000, 0.0637], [500000, 0.0897], [1000000, 0.1075]],
    exempt: [1000, 2000, 1500],
    taxes401k: true,
  },
  "New Mexico": {
    s: [[0, 0.015], [5500, 0.032], [16500, 0.043], [33500, 0.047], [66500, 0.049], [210000, 0.059]],
    m: [[0, 0.015], [8000, 0.032], [25000, 0.043], [50000, 0.047], [100000, 0.049], [315000, 0.059]],
    std: "fed",
  },
  "New York": {
    s: [[0, 0.039], [8500, 0.044], [11700, 0.0515], [13900, 0.054], [80650, 0.059], [215400, 0.0685], [1077550, 0.0965], [5000000, 0.103], [25000000, 0.109]],
    m: [[0, 0.039], [17150, 0.044], [23600, 0.0515], [27900, 0.054], [161550, 0.059], [323200, 0.0685], [2155350, 0.0965], [5000000, 0.103], [25000000, 0.109]],
    std: [8000, 16050],
    stdH: 11200,
    exempt: [0, 0, 1000],
    localHint: "New York City and Yonkers residents pay an additional local income tax (NYC roughly 3%–3.9%). Edit to your rate.",
  },
  "North Carolina": { s: flat(0.0399), std: [12750, 25500] },
  "North Dakota": {
    s: [[0, 0], [48475, 0.0195], [244825, 0.025]],
    m: [[0, 0], [80975, 0.0195], [298075, 0.025]],
    std: "fed",
  },
  Ohio: {
    s: [[0, 0], [26050, 0.0275]], // plus a $332 base once taxable income passes $26,050 (handled below)
    localHint: "Most Ohio cities levy a municipal income tax (often 1%–3%). Edit to your city's rate.",
  },
  Oklahoma: {
    s: [[0, 0], [3750, 0.025], [4900, 0.035], [7200, 0.045]],
    m: [[0, 0], [7500, 0.025], [9800, 0.035], [14400, 0.045]],
    std: [6350, 12700],
    exempt: [1000, 2000, 1000],
  },
  Oregon: {
    s: [[0, 0.0475], [4550, 0.0675], [11400, 0.0875], [125000, 0.099]],
    m: [[0, 0.0475], [9100, 0.0675], [22800, 0.0875], [250000, 0.099]],
    std: [2910, 5820],
    credit: [256, 512, 256],
    fedTax: [8500, 8500],
    localHint: "Portland-area and TriMet transit taxes may apply.",
  },
  Pennsylvania: {
    s: flat(0.0307),
    taxes401k: true,
    localDefault: 1,
    localHint: "Most Pennsylvania workers also pay a local earned income tax (commonly about 1%; Philadelphia is higher). Edit to your rate.",
  },
  "Rhode Island": {
    s: [[0, 0.0375], [82050, 0.0475], [186450, 0.0599]],
    std: [11200, 22400],
    exempt: [5250, 10500, 5250],
  },
  "South Carolina": {
    s: [[0, 0.0199], [30000, 0.0521]], // 2026 Act 110: SCIAD (computed below) replaces the standard deduction
    exempt: [0, 0, 4930],
  },
  Utah: { s: flat(0.0445) }, // handled below (credit in place of standard deduction)
  Vermont: {
    s: [[0, 0.0335], [49400, 0.066], [119700, 0.076], [249700, 0.0875]],
    m: [[0, 0.0335], [82500, 0.066], [199450, 0.076], [304000, 0.0875]],
    std: [7650, 15300],
    exempt: [5300, 10600, 5300],
  },
  Virginia: {
    s: [[0, 0.02], [3000, 0.03], [5000, 0.05], [17000, 0.0575]],
    std: [8750, 17500],
    exempt: [930, 1860, 930],
  },
  "West Virginia": {
    s: [[0, 0.0211], [10000, 0.0281], [25000, 0.0316], [40000, 0.0422], [60000, 0.0458]],
    exempt: [2000, 4000, 2000],
  },
  Wisconsin: {
    s: [[0, 0.035], [15110, 0.044], [51950, 0.053], [332720, 0.0765]],
    m: [[0, 0.035], [20150, 0.044], [69260, 0.053], [443630, 0.0765]],
    exempt: [700, 1400, 700],
  },
};

export const STATE_LIST: string[] = [...Object.keys(RULES), ...NO_INCOME_TAX_STATES].sort((a, b) => a.localeCompare(b));

/* ---------------------------------------------------------------- */

const bracketTax = (income: number, br: Br): number => {
  let tax = 0;
  for (let i = 0; i < br.length; i++) {
    const lo = br[i][0];
    const hi = i + 1 < br.length ? br[i + 1][0] : Infinity;
    if (income > lo) tax += (Math.min(income, hi) - lo) * br[i][1];
  }
  return tax;
};
const steps = (excess: number, size: number) => (excess > 0 ? Math.ceil(excess / size) : 0);
const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/* ---------------- employee-paid state payroll taxes ---------------- */

export interface PayrollLine { name: string; amount: number }

function statePayroll(state: string, w: number): PayrollLine[] {
  const L = (name: string, amount: number): PayrollLine => ({ name, amount: r2(amount) });
  switch (state) {
    case "California": return [L("CA SDI (1.3%)", w * 0.013)];
    case "New Jersey": return [L("NJ TDI (0.19%)", Math.min(w, 171100) * 0.0019), L("NJ FLI (0.23%)", Math.min(w, 171100) * 0.0023), L("NJ unemployment/workforce (0.425%)", Math.min(w, 44800) * 0.00425)];
    case "Pennsylvania": return [L("PA unemployment (0.07%)", w * 0.0007)];
    case "Alaska": return [L("AK unemployment (0.5%)", Math.min(w, 54200) * 0.005)];
    case "Maine": return [L("ME Paid Family & Medical Leave (0.5%)", Math.min(w, SS_BASE) * 0.005)];
    case "Delaware": return [L("DE Paid Family & Medical Leave (0.4%)", Math.min(w, SS_BASE) * 0.004)];
    case "New York": return [L("NY DBL", Math.min(w * 0.005, 31.2)), L("NY PFL (0.432%)", Math.min(Math.min(w, 95348.76) * 0.00432, 411.91))];
    case "Rhode Island": return [L("RI TDI (1.1%)", Math.min(w, 100000) * 0.011)];
    case "Hawaii": return [L("HI TDI (max $390/yr)", Math.min(w * 0.005, 390))];
    case "Washington": return [L("WA Cares (0.58%)", w * 0.0058), L("WA Paid Family & Medical Leave", Math.min(w, SS_BASE) * 0.0113 * 0.7143)];
    case "Oregon": return [L("Oregon Paid Leave (0.6%)", Math.min(w, SS_BASE) * 0.006), L("OR statewide transit tax (0.1%)", w * 0.001)];
    case "Colorado": return [L("CO FAMLI (0.44%)", Math.min(w, SS_BASE) * 0.0044)];
    case "Massachusetts": return [L("MA Paid Family & Medical Leave (0.46%)", Math.min(w, SS_BASE) * 0.0046)];
    case "Minnesota": return [L("MN Paid Leave (0.44%)", Math.min(w, SS_BASE) * 0.0044)];
    case "Connecticut": return [L("CT Paid Leave (0.5%)", Math.min(w, SS_BASE) * 0.005)];
    default: return [];
  }
}

/* ---------------------------- main API ----------------------------- */

export interface StateTaxInput {
  state: string;
  filing: StateFiling;
  grossAnnual: number;
  k401Annual: number; // traditional 401(k)/403(b) deferrals
  sec125Annual: number; // pre-tax health/HSA premiums (cafeteria plan)
  federalTaxAnnual: number; // used where a state lets you deduct federal tax (AL, MO, OR)
  dependents: number; // children
  localRatePct?: number; // optional local income tax rate; defaults to the state's typical rate
}

export interface StateTaxResult {
  incomeTax: number;
  local: number;
  payroll: PayrollLine[];
  payrollTotal: number;
  total: number;
  taxableIncome: number;
  localDefaultPct: number;
  localHint?: string;
  notes: string[];
}

export function defaultLocalRate(state: string): number {
  return RULES[state]?.localDefault ?? 0;
}
export function localHintFor(state: string): string | undefined {
  return RULES[state]?.localHint;
}

export function calcStateTax(inp: StateTaxInput): StateTaxResult {
  const { state, filing } = inp;
  const gross = Math.max(0, inp.grossAnnual || 0);
  const sec125 = Math.min(Math.max(0, inp.sec125Annual || 0), gross);
  const k401 = Math.min(Math.max(0, inp.k401Annual || 0), gross - sec125);
  const deps = Math.max(0, Math.floor(inp.dependents || 0));
  const joint = filing === "married";
  const rule = RULES[state];
  const payroll = statePayroll(state, gross - sec125);
  const ficaPaid = Math.min(gross - sec125, SS_BASE) * 0.062 + (gross - sec125) * 0.0145;
  const payrollTotal = r2(payroll.reduce((a, p) => a + p.amount, 0));
  const notes: string[] = [];
  const localDefaultPct = rule?.localDefault ?? 0;
  const localPct = Math.max(0, inp.localRatePct ?? localDefaultPct);

  if (!rule) {
    // no wage income tax (incl. WA, NH)
    const income0 = Math.max(0, gross - sec125 - k401);
    const local0 = r2(income0 * (localPct / 100));
    return { incomeTax: 0, local: local0, payroll, payrollTotal, total: r2(local0 + payrollTotal), taxableIncome: 0, localDefaultPct, localHint: undefined, notes: ["No state income tax on wages."] };
  }

  const income = Math.max(0, gross - sec125 - (rule.taxes401k ? 0 : k401)); // AGI proxy
  if (rule.taxes401k) notes.push(`${state} taxes 401(k) deferrals as wages.`);

  let br: Br = joint && rule.m ? rule.m : rule.s;
  let std = rule.std === "fed" ? FED_STD[filing] : rule.std ? (joint ? rule.std[1] : filing === "head" && rule.stdH != null ? rule.stdH : rule.std[0]) : 0;
  let exempt = rule.exempt ? (joint ? rule.exempt[1] : rule.exempt[0]) + deps * rule.exempt[2] : 0;
  const persons = (joint ? 2 : 1) + deps;
  let tax = 0;
  let taxable = 0;
  let credit = rule.credit ? (joint ? rule.credit[1] : rule.credit[0]) + deps * rule.credit[2] : 0;

  switch (state) {
    case "Alabama": {
      const base = joint ? 8500 : 3000, floor = joint ? 5000 : 2500, thr = joint ? 25999 : 25499, per = joint ? 175 : 25;
      std = Math.max(floor, base - per * steps(income - thr, 500));
      const depEx = income <= 50000 ? 1000 : income <= 100000 ? 500 : 300;
      exempt = (joint ? 3000 : filing === "head" ? 3000 : 1500) + deps * depEx;
      break;
    }
    case "Arkansas":
      if (income - std <= 92300) br = [[0, 0], [5500, 0.02], [10900, 0.03], [15600, 0.034], [25700, 0.037]];
      break;
    case "Connecticut": {
      const thr = joint ? 48000 : 30000;
      exempt = Math.max(0, (joint ? 24000 : 15000) - 1000 * steps(income - thr, 1000));
      break;
    }
    case "Illinois":
      if (income > (joint ? 500000 : 250000)) exempt = 0;
      break;
    case "Maryland": {
      std = joint ? Math.min(6700, Math.max(3600, income * 0.15)) : Math.min(3350, Math.max(1800, income * 0.15));
      const [t1, t2, t3] = joint ? [150000, 175000, 200000] : [100000, 125000, 150000];
      const ex = income <= t1 ? 3200 : income <= t2 ? 1600 : income <= t3 ? 800 : 0;
      exempt = ex * persons;
      break;
    }
    case "New Mexico":
      exempt = 4000 * Math.max(0, deps - 1);
      break;
    case "Ohio": {
      const ex = income <= 40000 ? 2400 : income <= 80000 ? 2150 : income < 500000 ? 1900 : 0;
      exempt = ex * persons;
      break;
    }
    case "Oregon":
      if (income > (joint ? 200000 : 100000)) credit = 0;
      break;
    case "Massachusetts":
      exempt += Math.min(2000, ficaPaid); // deduction for Social Security + Medicare paid, up to $2,000
      break;
    case "South Carolina": {
      // SC Income Adjusted Deduction: replaces the federal standard deduction, phased out by AGI
      const [base, lo, den] = joint ? [30000, 80000, 110000] : filing === "head" ? [22500, 60000, 82500] : [15000, 40000, 55000];
      std = Math.max(0, base * (1 - Math.max(0, income - lo) / den));
      break;
    }
    case "Wisconsin":
      std = joint
        ? Math.max(0, 25840 - 0.19778 * Math.max(0, income - 29039))
        : Math.max(0, 13960 - 0.12 * Math.max(0, income - 20119));
      break;
    default:
      break;
  }

  let fedTaxShare = 1;
  if (state === "Missouri") fedTaxShare = income <= 25000 ? 0.35 : income <= 50000 ? 0.25 : income <= 100000 ? 0.15 : income <= 125000 ? 0.05 : 0;
  const fedTaxDed = rule.fedTax ? Math.min(Math.max(0, inp.federalTaxAnnual || 0) * fedTaxShare, joint ? rule.fedTax[1] : rule.fedTax[0]) : 0;

  if (state === "Utah") {
    // Utah: flat tax less a phased-out credit worth 6% of the federal standard deduction; dependents get a deduction
    const depDed = deps * 2111;
    taxable = Math.max(0, income - depDed);
    tax = bracketTax(taxable, br);
    const base = 0.06 * FED_STD[filing];
    const thr = joint ? 36426 : 18213;
    credit = Math.max(0, base - 0.013 * Math.max(0, income - thr));
  } else {
    taxable = Math.max(0, income - std - exempt - fedTaxDed);
    tax = bracketTax(taxable, br);
    if (state === "Ohio") tax = taxable > 26050 ? 332 + 0.0275 * (taxable - 26050) : 0;
    if (state === "Connecticut") {
      // 2% band phase-out and recapture (simplified; personal tax credits not modelled)
      const t1 = joint ? 100500 : 56500;
      const reduce = Math.min(joint ? 20000 : 10000, (joint ? 2000 : 1000) * steps(income - t1, 5000));
      tax += Math.min(reduce, taxable) * (0.045 - 0.02);
      if (joint) {
        if (income > 210000) tax += Math.min(500, 50 * steps(income - 210000, 10000));
        if (income > 400000) tax += Math.min(5400, 180 * steps(income - 400000, 10000));
      } else {
        if (income > 105000) tax += Math.min(250, 25 * steps(income - 105000, 5000));
        if (income > 200000) tax += Math.min(3150, 90 * steps(income - 200000, 5000));
      }
    }
  }
  const incomeTax = r2(Math.max(0, tax - credit));

  // local income tax: Maryland applies to state taxable income, others to state wages
  const localBase = state === "Maryland" ? taxable : income;
  const local = r2(localBase * (localPct / 100));

  return {
    incomeTax, local, payroll, payrollTotal, total: r2(incomeTax + local + payrollTotal),
    taxableIncome: r2(taxable), localDefaultPct, localHint: rule.localHint, notes,
  };
}

export const STATE_LIMITATIONS: string[] = [
  "Estimates annual state tax on annualised wages; employer withholding tables differ slightly by state.",
  "Head of household and married filing separately use single-filer state brackets (with state-specific head-of-household standard deductions where known).",
  "Connecticut personal tax credits, state high-income phase-outs (e.g., MN, ME) and some credits are not modelled; California uses 2025 indexed amounts.",
  "Local income taxes must be entered (Maryland and Pennsylvania default to typical rates).",
  "State laws change mid-year; verify against your state revenue department.",
];

/** Only the caveats that apply to the selected state and filing status. */
export function stateCaveats(state: string, filing: StateFiling): string[] {
  const out: string[] = [];
  if (filing === "head" || filing === "married_separate") {
    out.push("Head of household and married filing separately use single-filer state brackets (with the state's own head-of-household deduction where known).");
  }
  const specific: Record<string, string> = {
    Connecticut: "Connecticut personal tax credits are not modelled, so state tax may be slightly overstated.",
    Minnesota: "Minnesota's high-income deduction phase-out is not modelled.",
    Maine: "Maine's high-income deduction phase-out is not modelled.",
    California: "California uses 2025 indexed amounts; 2026 values may differ slightly.",
  };
  if (specific[state]) out.push(specific[state]);
  return out;
}