import * as React from "react";
import { Route } from "react-router-dom";

import { AuthedRedirect } from "@/Common/Components/AuthedRedirect";
import { CE_PagePath } from "@/Common/Enums/PagePath";

import { loadForgotPasswordPage, loadLoginPage, loadRegisterPage } from "./DynamicImport";

const LoginPageLazy = React.lazy(loadLoginPage);
const RegisterPageLazy = React.lazy(loadRegisterPage);
const ForgotPasswordPageLazy = React.lazy(loadForgotPasswordPage);

export const useAuthPageRoutes = () => {
  return (
    <>
      <Route
        path={CE_PagePath.Login}
        element={
          <AuthedRedirect>
            <LoginPageLazy />
          </AuthedRedirect>
        }
      />
      <Route
        path={CE_PagePath.Register}
        element={
          <AuthedRedirect>
            <RegisterPageLazy />
          </AuthedRedirect>
        }
      />
      <Route
        path={CE_PagePath.ForgotPassword}
        element={
          <AuthedRedirect>
            <ForgotPasswordPageLazy />
          </AuthedRedirect>
        }
      />
    </>
  );
};
