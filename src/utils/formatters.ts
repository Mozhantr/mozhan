export function toPersianDigits(n: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n
    .toString()
    .replace(/\d/g, (x) => persianDigits[parseInt(x, 10)]);
}

export function formatPrice(amount: number): string {
  const formattedWithCommas = amount.toLocaleString('en-US');
  return `${toPersianDigits(formattedWithCommas)} تومان`;
}

export function generateTrackingNumber(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DST-${randomNum}`;
}

export const FREE_SHIPPING_THRESHOLD = 1500000; // 1,500,000 Tomans
