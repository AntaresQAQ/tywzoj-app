import React from "react";
import { useLocation } from "react-router-dom";

import { parseQuery } from "@/Common/Utilities/QueryString";
import { setRouter } from "@/Router/Action";
import { useAppDispatch } from "@/Store";

export const useRouterStateWatcher = () => {
  const dispatch = useAppDispatch();
  const { pathname, hash, search } = useLocation();

  React.useEffect(() => {
    dispatch(
      setRouter({
        path: pathname,
        hash: hash.substring(1),
        query: parseQuery(search),
      }),
    );
  }, [dispatch, hash, pathname, search]);
};
