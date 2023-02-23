import * as React from "react";
import { useNavigate } from "react-router-dom";

import { IQueryObj } from "@/Common/Utilities/QueryString";
import { makeUrl } from "@/Common/Utilities/Url";
import { useHash, usePath, useQuires } from "@/Features/Router/Hooks";

export const useSetQuery = () => {
  const path = usePath();
  const queries = useQuires();
  const hash = useHash();
  const navigate = useNavigate();

  return React.useCallback(
    (q: IQueryObj) =>
      navigate(
        makeUrl({
          path,
          queries: {
            ...queries,
            ...q,
          },
          hash,
        }),
      ),
    [path, queries, hash, navigate],
  );
};

export const useSetHash = () => {
  const path = usePath();
  const queries = useQuires();
  const navigate = useNavigate();

  return React.useCallback(
    (hash: string) =>
      navigate(
        makeUrl({
          path,
          queries,
          hash,
        }),
      ),
    [navigate, path, queries],
  );
};
