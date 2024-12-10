"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext, useState } from "react";

export const TabContext = createContext<{activeTab: string, setActiveTab: (tab: string) => void } | null>(null);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
    },
});
 
export function Providers({ children }:{ children: React.ReactNode}) {
    const [activeTab, setActiveTab] = useState("home");

    return (
        <QueryClientProvider client={queryClient}>
            <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                <TabContext.Provider value={{activeTab, setActiveTab}}>
                    {children}
                </TabContext.Provider>
            </NextThemesProvider>
        </QueryClientProvider>
    )
}