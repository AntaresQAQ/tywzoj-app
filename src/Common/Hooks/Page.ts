import * as React from "react";

import { CE_QueryKey } from "@/Common/Enums/QueryKeys";
import { useSetQuery } from "@/Common/Hooks/Url";
import { useQuery } from "@/Features/Router/Hooks";

export const usePage = () => {
    const qsPage = useQuery<number>(CE_QueryKey.Page);

    return React.useMemo(() => (Number.isInteger(qsPage) ? qsPage : 1), [qsPage]);
};

export const useSetPage = () => {
    const setQuery = useSetQuery();

    return React.useCallback((page: number) => setQuery({ [CE_QueryKey.Page]: page }), [setQuery]);
};
