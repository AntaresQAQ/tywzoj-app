import React from "react";
import { Route, Routes } from "react-router-dom";

import { CE_PagePath } from "@/Common/Url/PagePath";
import { makeUrl } from "@/Common/Url/Utils";

import { useRouterStateWatcher } from "./Hooks";

export const AppRoutes: React.FC = () => {
  useRouterStateWatcher();

  return (
    <Routes>
      <Route path={makeUrl({ base: CE_PagePath.Home })}></Route>
      {/* TODO: problem, user... */}
      <Route path={makeUrl({ base: CE_PagePath.Login })} />
      <Route path={makeUrl({ base: CE_PagePath.Register })} />
      <Route path={makeUrl({ base: CE_PagePath.ForgotPassword })} />
      <Route path="*" />
    </Routes>
  );
};
