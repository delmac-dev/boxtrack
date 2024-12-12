"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { keys } from "./query-keys";
import { addCollection, getActiveCollections, getCollections, modifyCollection, removeCollection } from "./queries";
import { useTabContext } from "./custom-hooks";

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

export function useAddCollection() {
    const queryClient = useQueryClient();
    const { setActiveTab } = useTabContext();

    return useMutation({ 
        mutationFn: addCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.collections})
            queryClient.invalidateQueries({queryKey: keys.activeCollections})
        },
        onSettled(data) {
            setActiveTab(data?.label || "home")
        },
    })
}

export function useModifyCollection(){
    const queryClient = useQueryClient();
    const { setActiveTab } = useTabContext();

    return useMutation({ 
        mutationFn: modifyCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.collections})
            queryClient.invalidateQueries({queryKey: keys.activeCollections})
        },
        onSettled(data) {
            if(data?.status === "done") setActiveTab("home");
        },
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