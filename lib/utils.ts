import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskBvn(bvn: string) {
  const clean = bvn.replaceAll(/\D/g, "");
  if (clean.length < 4) return "****";
  return `${"*".repeat(clean.length - 4)}${clean.slice(-4)}`;
}
