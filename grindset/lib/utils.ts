import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, includeTime = false): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: includeTime ? "numeric" : undefined,
    minute: includeTime ? "numeric" : undefined,
    hour12: includeTime ? true : undefined,
  };

  return date.toLocaleString("en-US", options);
}
