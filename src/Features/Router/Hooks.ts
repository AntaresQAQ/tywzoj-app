import { getQueries } from "@/Features/Router/Selectors";
import { useAppSelector } from "@/Features/Store";

export const useQuires = () => useAppSelector(getQueries) || {};
export const useQuery = <T extends number | string>(key: string) => useQuires()[key] as T;
