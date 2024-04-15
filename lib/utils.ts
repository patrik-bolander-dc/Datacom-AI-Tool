import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { carPartType } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function haveCommonItems(arr1: carPartType[], arr2: carPartType[]) {
  const set1 = new Set(arr1);
  const commonItems = arr2.filter(item => set1.has(item));
  return commonItems.length > 0;
}

export function formatBytes(bytes: number) {
  return (bytes / Math.pow(1024, 2)).toFixed(3);
}
