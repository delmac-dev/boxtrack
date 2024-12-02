import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import connectToDB from "./db";
import { Box } from "./types";
import { format } from 'date-fns';
import { format as formatOrdinal } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * FETCH DATA FROM THE DATABASE
 * 
 * @param callback a callback that returns the data from the database
 */

export async function connectionProvider<T>(callback: () => Promise<T>): Promise<T> {
  await connectToDB();

  const data = JSON.stringify(await callback());

  return JSON.parse(data || "[]") as T
}

export function createBoxes(letter: string, total: number): Box[] {
  const boxes: Box[] = [];

  for (let i = 1; i <= total; i++) {
    boxes.push({
      digit: i,
      status: false
    });
  }

  return boxes;
}

export function formatDate(date: Date): string {
  const dayWithOrdinal = formatOrdinal(date, 'do'); // Adds the ordinal suffix
  const formattedDate = format(date, `EEEE, '${dayWithOrdinal}' MMMM yyyy`);
  return formattedDate;
}