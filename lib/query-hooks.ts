"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { keys } from "./query-keys";
import { getCollections } from "./queries";

export function useGetCollections() {
    const queryKey = keys.collections;
    const queryFn = async () => await getCollections();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
}