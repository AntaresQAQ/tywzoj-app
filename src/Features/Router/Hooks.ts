import { CE_QueryKey } from "@/Common/Enums/QueryKeys";
import { getQueries } from "@/Features/Router/Selectors";
import { useAppSelector } from "@/Features/Store";

export const useQuires = () => useAppSelector(getQueries) || {};
export const useQuery = <T extends number | string>(key: CE_QueryKey) => useQuires()[key] as T;
