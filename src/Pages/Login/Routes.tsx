import * as React from "react";
import { Route } from "react-router-dom";

import { AuthedRedirect } from "@/Common/Components/AuthedRedirect";
import { CE_PagePath } from "@/Common/Enums/PagePath";
import { makeUrl } from "@/Common/Utilities/Url";

import { loadLoginPage } from "./Features/DynamicImport";

const LoginPageLazy = React.lazy(loadLoginPage);

export const useLoginPageRoutes = () => {
  return (
    <Route
      path={makeUrl({ base: CE_PagePath.Login })}
      element={
        <AuthedRedirect>
          <LoginPageLazy />
        </AuthedRedirect>
      }
    />
  );
};
