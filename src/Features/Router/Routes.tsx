import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { useAuthPageRoutes } from "@/Pages/Auth/Routes";
import { useHomePageRoutes } from "@/Pages/Home/Routes";
import { useUserPageRoutes } from "@/Pages/User/Routes";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {useHomePageRoutes()}
      {useAuthPageRoutes()}
      {useUserPageRoutes()}
      <Route path="*" />
    </Routes>
  );
};
