import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function truncateString(input: string, maxLength: number = 60): string {
  const ellipsis = '...';
  if (input.length <= maxLength) {
    return input;
  } else {
    return input.substring(0, maxLength) + ellipsis;
  }
}
