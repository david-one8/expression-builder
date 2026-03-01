import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FormulaRow, OperandNode } from "@/types/expression";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Walk a dot-path like "a.b.a" to set a deeply nested operand
export function setAtPath(row: FormulaRow, path: string, node: OperandNode): FormulaRow {
  const parts = path.split(".");
  const clone  = structuredClone(row) as unknown as Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cursor: any = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    cursor = cursor[parts[i]];
  }
  cursor[parts[parts.length - 1]] = node;
  return clone as unknown as FormulaRow;
}

export function numberToWords(n: number): string {
  if (!Number.isInteger(n)) return String(n);
  const units = ["zero","one","two","three","four","five","six","seven","eight",
    "nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen",
    "seventeen","eighteen","nineteen"];
  const tens  = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
  if (n < 0)   return "minus " + numberToWords(-n);
  if (n < 20)  return units[n];
  if (n < 100) return tens[Math.floor(n/10)] + (n % 10 ? "-" + units[n % 10] : "");
  if (n < 1000) return units[Math.floor(n/100)] + " hundred"
    + (n % 100 ? " " + numberToWords(n % 100) : "");
  return String(n);
}
