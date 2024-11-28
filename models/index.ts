import { Schema, model, models } from "mongoose"; 

const CollectionSchema = new Schema({
    label: String,
    startAt: Date,
    endAt: Date,
    status: String,
    boxTotal: { type: Number, default: 0 },
    boxDone: { type: Number, default: 0 },
    boxLeft: { type: Number, default: 0 },
    boxes: [{
        label: String,
        modifiedAt: Date,
        content: Number
    }]
}, {timestamps: true});

const StatSchema = new Schema({
    date: Date,
    collections: [{ type: Schema.Types.ObjectId, ref: 'Collection'}],
    boxDone: { type: Number, default: 0 },
    boxLeft: { type: Number, default: 0 },
}, {timestamps: true});

export const Collection = models.Collection || model("Collection", CollectionSchema, "collections");
export const Stat = models.Stat || model("Stat", StatSchema, "stats");