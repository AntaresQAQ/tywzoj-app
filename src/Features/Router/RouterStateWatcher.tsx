import * as React from "react";
import { useLocation } from "react-router-dom";

import { parseQuery } from "@/Common/Utilities/QueryString";
import { setRouter } from "@/Features/Router/Action";
import { useAppDispatch } from "@/Features/Store";

interface IProps {
  children: React.ReactElement;
}

export const RouterStateWatcher: React.FC<IProps> = props => {
  const dispatch = useAppDispatch();
  const { pathname, hash, search } = useLocation();

  React.useEffect(() => {
    dispatch(
      setRouter({
        path: decodeURIComponent(pathname.endsWith("?") ? pathname.substring(0, pathname.length - 1) : pathname),
        hash: decodeURIComponent(hash.substring(1)),
        queries: parseQuery(search, true),
      }),
    );
  }, [dispatch, hash, pathname, search]);

  return props.children;
};
