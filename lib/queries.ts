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

export const addCollection = async ({collection}:{ collection: FormSchemaProp}): Promise<string[]> => connectionProvider(async () => {
    const { letter } = collection;
    const newCollection:Collections = {
        label: letter,
        boxTotal: 100,
        startAt: new Date(),
        status: "active",
        boxes: createBoxes(letter, 100),
        boxLeft: 100,
        boxDone: 0
    }

    await Collection.create(newCollection);

    return ["success"]
});

export const modifyCollection = async (props: Collections): Promise<string[]> => connectionProvider(async () => {
    if(!props._id) throw new Error("Record Dont Exit");
    let modifiedCollection: Collections = {
        ...props,
        boxLeft: 0, // minus 100 - boxes done
        boxDone: 0, // number of boxes done
        status: "active" // check if box done = box total
    }

    await Collection.findByIdAndUpdate(props._id, modifiedCollection);

    return ["success"];
});

export const removeCollection = async ({id}:{id: string}): Promise<string[]> => connectionProvider(async () => {

    await Collection.findByIdAndDelete(id);

    return ["success"];
});