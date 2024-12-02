"use server";

import { Collection, Stat } from "@/models";
import { connectionProvider, createBoxes } from "./utils";
import { Collections, Stats } from "./types";
import { FormSchemaProp } from "@/components/common/add-form";

export const getCollections = async (): Promise<Collections[]> =>  connectionProvider(async () => {
    return await Collection.find();
});

export const getActiveCollections = async (): Promise<Collections[]> => connectionProvider(async () => {
    return await Collection.find({ status: "active" });
});

export const getStats = async (): Promise<Stats[]> => connectionProvider(async () => {
    return await Stat.find()
});

const handleStats = async () => {

}

export const addCollection = async ({collection}:{ collection: FormSchemaProp}): Promise<Collections[]> => connectionProvider(async () => {
    const { letter } = collection;
    const newCollection:Collections = {
        label: letter,
        boxTotal: 100,
        startAt: new Date(),
        status: "active",
        boxes: createBoxes(letter, 100)
    }

    return await Collection.create(newCollection);
});

export const modifyCollection = async ({collection}:{collection: Collections}): Promise<Collections[]> => connectionProvider(async () => {
    if(!collection._id) throw new Error("Record Dont Exit");

    const col = await Collection.findByIdAndUpdate(collection._id, collection);
    const colArray = [col] as Collections[]

    return colArray;
});