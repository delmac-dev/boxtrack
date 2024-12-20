"use server";

import { Collection } from "@/models";
import { connectionProvider, createBoxes } from "./utils";
import { Collections } from "./types";
import { FormSchemaProp } from "@/components/common/add-form";

export const getCollections = async (): Promise<Collections[]> =>  connectionProvider(async () => {
    return await Collection.find();
});

export const getActiveCollections = async (): Promise<Collections[]> => connectionProvider(async () => {
    return await Collection.find({ status: "active" });
});

export const addCollection = async ({collection}:{ collection: FormSchemaProp}): Promise<Collections> => connectionProvider(async () => {
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

    const data = await Collection.create(newCollection);

    return data;
});

export const modifyCollection = async (props: Collections): Promise<Collections> => connectionProvider(async () => {
    if(!props._id) throw new Error("Record Dont Exit");
    const boxDone = props.boxes.reduce((count, {status}) => status ? count + 1 : count, 0);
    const boxLeft = props.boxTotal - boxDone;
    const newStatus = !boxLeft ? "done" : "active";
    const status = props.status === "done" ? props.status : newStatus;
    const endAt = status === "done" ? new Date() : undefined;
    const modifiedCollection: Collections = { ...props, boxLeft, boxDone, status, endAt }

    await Collection.findByIdAndUpdate(props._id, modifiedCollection);

    return modifiedCollection;
});

export const removeCollection = async ({id}:{id: string}): Promise<string[]> => connectionProvider(async () => {

    await Collection.findByIdAndDelete(id);

    return ["success"];
});