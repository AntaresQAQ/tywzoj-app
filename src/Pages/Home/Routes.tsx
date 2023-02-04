import * as React from "react";
import { Route } from "react-router-dom";

import { CE_PagePath } from "@/Common/Enums/PagePath";

export const useHomePageRoutes = () => {
  return <Route path={CE_PagePath.Home} />;
};
