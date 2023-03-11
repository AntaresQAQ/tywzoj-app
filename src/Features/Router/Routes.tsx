import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";
import { ErrorPage } from "@/Features/Error/ErrorPage";
import { useAuthPageRoutes } from "@/Pages/Auth/Routes";
import { useHomePageRoutes } from "@/Pages/Home/Routes";
import { useProblemRoutes } from "@/Pages/Problem/Routes";
import { useUserPageRoutes } from "@/Pages/User/Routes";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {useHomePageRoutes()}
      {useProblemRoutes()}
      {useAuthPageRoutes()}
      {useUserPageRoutes()}
      <Route path="*" element={<ErrorPage code={CE_ErrorCode.NotFound} />} />
    </Routes>
  );
};
