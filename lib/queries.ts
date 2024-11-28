"use server";

import { Collection, Stat } from "@/models";
import { connectionProvider } from "./utils";
import { Collections, Stats } from "./types";

export const getCollections = async (): Promise<Collections[]> =>  connectionProvider(async () => {
    return await Collection.find();
});

export const getActiveCollections = async (): Promise<Collections[]> => connectionProvider(async() => {
    return [];
});

export const getStats = async (): Promise<Stats[]> => connectionProvider(async () => {
    return [];
});

const handleStats = async () => {

}

export const addCollection = async (): Promise<any> => connectionProvider(async () => {
    return [];
});

export const modifyCollection = async (): Promise<any> => connectionProvider(async () => {
    return [];
});