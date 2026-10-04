export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const inrShort = (n: number) => (n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`);

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function twoDigit(n: number): string {
  if (n < 20) return ONES[n];
  return `${TENS[Math.floor(n / 10)]}${n % 10 ? " " + ONES[n % 10] : ""}`;
}

function threeDigit(n: number): string {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  return `${h ? `${ONES[h]} Hundred` : ""}${h && rest ? " " : ""}${rest ? twoDigit(rest) : ""}`.trim();
}

/** Indian numbering system: lakh / crore. */
export function amountInWords(n: number): string {
  const num = Math.round(Math.abs(n));
  if (num === 0) return "Zero Rupees Only";
  const crore = Math.floor(num / 1e7);
  const lakh = Math.floor((num % 1e7) / 1e5);
  const thousand = Math.floor((num % 1e5) / 1000);
  const rest = num % 1000;
  const parts: string[] = [];
  if (crore) parts.push(`${threeDigit(crore)} Crore`);
  if (lakh) parts.push(`${twoDigit(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigit(thousand)} Thousand`);
  if (rest) parts.push(threeDigit(rest));
  return `${parts.join(" ")} Rupees Only`;
}
