import * as React from "react";
import { Route } from "react-router-dom";

import { CE_PagePath } from "@/Common/Enums/PagePath";

export const useUserPageRoutes = () => {
  return (
    <Route path={CE_PagePath.User}>
      <Route path={":userId"} />
      <Route path={":userId/edit"} />
      <Route path={":userId/setting"} />
    </Route>
  );
};
