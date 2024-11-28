import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import connectToDB from "./db";
import { Box } from "./types";

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

  return await callback();
}

export function createBoxes(letter: string, total: number): Box[] {
  const boxes: Box[] = [];

  for (let i = 1; i <= total; i++) {
    boxes.push({
      label: `${letter}${i}`,
      modifiedAt: new Date(),
      content: 0
    });
  }

  return boxes;
}