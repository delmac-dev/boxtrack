"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { keys } from "./query-keys";
import { addCollection, getActiveCollections, getCollections, getStats, modifyCollection, removeCollection } from "./queries";

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

    return useMutation({ 
        mutationFn: addCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.collections})
            queryClient.invalidateQueries({queryKey: keys.activeCollections})
        }
    })
}

export function useModifyCollection(){
    const queryClient = useQueryClient();

    return useMutation({ 
        mutationFn: modifyCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.collections})
            queryClient.invalidateQueries({queryKey: keys.activeCollections})
        }
    })
}

export function useRemoveCollection(){
    const queryClient = useQueryClient();

    return useMutation({ 
        mutationFn: removeCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.collections})
            queryClient.invalidateQueries({queryKey: keys.activeCollections})
        }
    })
}