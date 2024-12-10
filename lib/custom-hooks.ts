import { TabContext } from "@/components/common/providers";
import { useContext } from "react";

export const useTabContext = () => {
    const tabContext = useContext(TabContext);
    if (!tabContext) throw new Error('Hook must be used within TabContext');

    return tabContext;
}