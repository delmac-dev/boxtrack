import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import connectToDB from "./db";
import { Box } from "./types";
import { format } from 'date-fns';
import { pdf } from '@react-pdf/renderer';

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

export function formatDate(dateInput: Date | undefined): { day: string | null; date: string | null } {
  
  if(!dateInput) return { day: null, date: null}

  const day = format(dateInput, 'EEEE');
  const formattedDate = format(dateInput, 'do MMM. yyyy');

  return { day, date: formattedDate };
}

export async function handlePrint(doc: React.ReactElement, title: string) {
  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `collection-${title}.pdf`;

  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}