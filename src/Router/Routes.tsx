import * as React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { CE_PagePath } from "@/Common/Enums/PagePath";
import { parseQuery } from "@/Common/Utilities/QueryString";
import { makeUrl } from "@/Common/Utilities/Url";
import { useHomePageRoutes } from "@/Pages/Home/Routes";
import { useLoginPageRoutes } from "@/Pages/Login/Routes";
import { useRegisterPageRoutes } from "@/Pages/Register/Routes";
import { setRouter } from "@/Router/Action";
import { useAppDispatch } from "@/Store";

export const AppRoutes: React.FC = () => {
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

  return (
    <Routes>
      {useHomePageRoutes()}
      {useLoginPageRoutes()}
      {useRegisterPageRoutes()}
      <Route path={makeUrl({ base: CE_PagePath.ForgotPassword })} />
      <Route path="*" />
    </Routes>
  );
};
