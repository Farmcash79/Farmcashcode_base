export function nairaToKobo(amount: number) {
  return Math.round(amount * 100);
}

export function koboToNaira(kobo: number) {
  return (kobo / 100).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
