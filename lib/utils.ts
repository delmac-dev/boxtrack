import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import connectToDB from "./db";
import { NavigationProps } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * FETCH DATA FROM THE DATABASE
 * 
 * @param callback a callback that returns the data from the database
 */
export const dataProvider = async (callback: () => Promise<any>)=> {
  await connectToDB();

  return await callback();
}

export const parseNavigation = (pathname: string, navigation: NavigationProps[]) => {
  const logic = (link: string ) => link === pathname;

  return navigation.map(navigationItem => ({
    ...navigationItem,
    active: logic(navigationItem.link || "")
  }));
};