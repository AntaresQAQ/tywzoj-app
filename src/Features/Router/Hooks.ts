import { useLocation } from "react-router-dom";

import { CE_QueryKey } from "@/Common/Enums/QueryKeys";
import { IQueryObj, parseQuery } from "@/Common/Utilities/QueryString";

export const usePath = (decode = true) => {
    const { pathname } = useLocation();
    const ps = pathname.endsWith("?") ? pathname.substring(0, pathname.length - 1) : pathname;
    return decode ? decodeURIComponent(ps) : ps;
};
export const useHash = (decode = true) => {
    const { hash } = useLocation();
    const hs = hash.substring(1);
    return decode ? decodeURIComponent(hs) : hs;
};
export const useQuires = <T extends IQueryObj>(decode = true) => {
    const { search } = useLocation();
    return parseQuery<T>(search, decode);
};
export const useQuery = <T extends number | string>(key: CE_QueryKey) => useQuires<{ [k in CE_QueryKey]: T }>()[key];
