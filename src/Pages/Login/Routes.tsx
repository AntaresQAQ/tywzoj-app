import * as React from "react";
import { Navigate, Route } from "react-router-dom";

import { CE_PagePath } from "@/Common/Enums/PagePath";
import { useCurrentUser } from "@/Common/Environment/Hooks";
import { makeUrl } from "@/Common/Utilities/Url";

import { loadLoginPage } from "./Features/DynamicImport";

const LoginPageLazy = React.lazy(loadLoginPage);

export const useLoginPageRoutes = () => {
  const currentUser = useCurrentUser();
  const loginPageElement = currentUser ? <Navigate to={makeUrl({ base: CE_PagePath.Home })} /> : <LoginPageLazy />;

  return <Route path={makeUrl({ base: CE_PagePath.Login })} element={loginPageElement} />;
};
