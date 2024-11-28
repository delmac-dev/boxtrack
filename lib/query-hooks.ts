"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { keys } from "./query-keys";
import { addCollection, getActiveCollections, getCollections, getStats, modifyCollection } from "./queries";

export function useGetCollections() {
    const queryKey = keys.collections;
    const queryFn = async () => await getCollections();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
}

export function useGetActiveCollections() {
    const queryKey = keys.activeCollections;
    const queryFn = async () => await getActiveCollections();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
}

export function useGetStats() {
    const queryKey = keys.stats;
    const queryFn = async () => await getStats();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
}

export function useAddCollection() {
    const queryClient = useQueryClient();

    const queryKey = [keys.collections, keys.activeCollections];
    return useMutation({ 
        mutationFn: addCollection,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKey })
    })
}

export function useModifyCollection(){
    const queryClient = useQueryClient();

    const queryKey = [keys.collections, keys.activeCollections];
    return useMutation({ 
        mutationFn: modifyCollection,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKey })
    })
}