"use server";

import { Collection, Stat } from "@/models";
import { dataProvider } from "./utils";
import { signIn, signOut } from "@/auth";

// export const adminLogin = async (formData: FormData) => {
//     formData.append('redirectTo', '/');
//     await signIn("credentials", formData);
// }

// export const adminExit = async () => await signOut({redirectTo: "/login"});

export const getCollections = async () =>  dataProvider(async () => {
    return await Collection.find();
})