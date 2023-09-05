import * as React from "react";
import { Route } from "react-router-dom";

import { CE_Page } from "@/Common/Enums/PagePath";

import { loadProblemDetailPage, loadProblemFilePage } from "./DynamicImport";

const ProblemDetailPageLazy = React.lazy(loadProblemDetailPage);
const ProblemFilePageLazy = React.lazy(loadProblemFilePage);

export const useProblemRoutes = () => {
    return (
        <>
            <Route path={CE_Page.Problem} />
            <Route path={CE_Page.ProblemDetail} element={<ProblemDetailPageLazy />} />
            <Route path={CE_Page.ProblemFile} element={<ProblemFilePageLazy />} />
        </>
    );
};
