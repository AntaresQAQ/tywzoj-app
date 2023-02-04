import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { CE_PagePath } from "@/Common/Enums/PagePath";
import { makeUrl } from "@/Common/Utilities/Url";
import { useHomePageRoutes } from "@/Pages/Home/Routes";
import { useLoginPageRoutes } from "@/Pages/Login/Routes";
import { useRegisterPageRoutes } from "@/Pages/Register/Routes";
import { useUserPageRoutes } from "@/Pages/User/Routes";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {useHomePageRoutes()}
      {useLoginPageRoutes()}
      {useRegisterPageRoutes()}
      {useUserPageRoutes()}
      <Route path={makeUrl({ base: CE_PagePath.ForgotPassword })} />
      <Route path="*" />
    </Routes>
  );
};
