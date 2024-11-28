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

export const addCollection = async ({collection}:{ collection: FormSchemaProp}): Promise<any> => connectionProvider(async () => {
    const { letter, total } = collection;
    const newCollection:Collections = {
        label: letter,
        boxTotal: total,
        startAt: new Date(),
        status: "active",
        boxes: createBoxes(letter, total)
    }

    await Collection.create(newCollection);
});

export const modifyCollection = async ({collection}:{collection: Collections}): Promise<any> => connectionProvider(async () => {
    if(!collection._id) throw new Error("Record Dont Exit");

    await Collection.findByIdAndUpdate(collection._id, collection);
});