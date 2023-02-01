import { getQueries } from "@/Router/Selectors";
import { useAppSelector } from "@/Store";

export const useQuires = () => useAppSelector(getQueries) || {};
export const useQuery = <T extends number | string>(key: string) => useQuires()[key] as T;
