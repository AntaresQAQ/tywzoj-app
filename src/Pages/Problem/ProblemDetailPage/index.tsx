import * as React from "react";

import { CE_Page } from "@/Common/Enums/PagePath";
import { usePageParams } from "@/Common/Hooks/Params";
import { useAppDispatch } from "@/Features/Store";

import { fetchProblemDetailAction } from "./Action";
import { configureStore } from "./Configure";
import { ProblemDetailPage } from "./ProblemDetailPage";

configureStore();

const Wrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { displayId } = usePageParams<CE_Page.ProblemDetail>();

  React.useEffect(() => {
    dispatch(fetchProblemDetailAction(displayId));
  }, [dispatch, displayId]);

  return <ProblemDetailPage />;
};

export default Wrapper;
