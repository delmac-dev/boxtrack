"use server";

import { Collection, Stat } from "@/models";
import { dataProvider } from "./utils";

export const getCollections = async () =>  dataProvider(async () => {
    return await Collection.find();
});