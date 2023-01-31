import * as React from "react";
import { Route } from "react-router-dom";

import { CE_PagePath } from "@/Common/Enums/PagePath";
import { makeUrl } from "@/Common/Utilities/Url";

export const useHomePageRoutes = () => {
  return <Route path={makeUrl({ base: CE_PagePath.Home })} />;
};
