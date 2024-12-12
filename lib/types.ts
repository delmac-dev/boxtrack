import { ObjectId } from "mongoose";

export type QueryProps = {
    params: {[key: string]: string}
    searchParams: { [key: string]: string }
}

export type LucideIconType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export type TabProps = {
    value: string;
    icon?: LucideIconType,
    onLeft?: boolean;
    onRight?: boolean;
};


export interface Box {
    _id?: string;
    digit: number;
    status: boolean;
  }
  
export interface Collections {
    _id?: string;
    label: string;
    startAt: Date;
    endAt?: Date;
    status: string;
    boxTotal: number;
    boxDone: number;
    boxLeft: number;
    boxes: Box[];
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface Stats {
    _id?: string;
    date: Date;
    collections: (ObjectId | Collections)[];
    boxDone?: number;
    boxLeft?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }