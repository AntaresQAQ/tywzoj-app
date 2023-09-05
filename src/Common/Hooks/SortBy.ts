import * as React from "react";

import { CE_QueryKey } from "@/Common/Enums/QueryKeys";
import { useSetQuery } from "@/Common/Hooks/Url";
import { useQuery } from "@/Features/Router/Hooks";
import { IRootState, useAppSelector } from "@/Features/Store";

export const useSortBy = <T extends string>(defaultSortBy: T | ((state: IRootState) => unknown)) => {
    const selector = typeof defaultSortBy === "string" ? () => defaultSortBy : defaultSortBy;
    const qsSortBy = useQuery<T>(CE_QueryKey.SortBy);
    const dftSortBy = useAppSelector(selector);

    return React.useMemo(() => qsSortBy || (dftSortBy as T), [dftSortBy, qsSortBy]);
};

export const useSetSortBy = <T extends string>() => {
    const setQuery = useSetQuery();

    return React.useCallback((sortBy: T) => setQuery({ [CE_QueryKey.SortBy]: sortBy }), [setQuery]);
};
