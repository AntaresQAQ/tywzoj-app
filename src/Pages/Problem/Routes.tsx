import * as React from "react";
import { Route } from "react-router-dom";

import { CE_Page } from "@/Common/Enums/PagePath";
import { loadProblemDetailPage } from "@/Pages/Problem/DynamicImport";

const ProblemDetailPageLazy = React.lazy(loadProblemDetailPage);

export const useProblemRoutes = () => {
  return (
    <>
      <Route path={CE_Page.Problem} />
      <Route path={CE_Page.ProblemDetail} element={<ProblemDetailPageLazy />} />
    </>
  );
};
