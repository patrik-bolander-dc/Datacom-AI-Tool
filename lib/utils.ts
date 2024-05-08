import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { carPartType } from "@/types";


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

export function roundDp(number: number){
  return +number.toFixed(1);
}

//Converts Base 64 String to a File
export function dataURLtoFile(dataurl: any, filename: string) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}