import * as React from "react";

import { PageLoading } from "@/Common/Components/PageLoading";
import { CE_Page } from "@/Common/Enums/PagePath";
import { usePageParams } from "@/Common/Hooks/Params";
import { useAppDispatch } from "@/Features/Store";
import { ProblemFilePage } from "@/Pages/Problem/ProblemFilePage/ProblemFilePage";

import { configureStore as configureProblemDetailPageStore } from "../ProblemDetailPage/Configure";
import { fetchProblemFileWithDetailAction } from "./Action";
import { configureStore } from "./Configure";

// This page depends on ProblemDetailPage
configureProblemDetailPageStore();
configureStore();

const Wrapper: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id } = usePageParams<CE_Page.ProblemFile>();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        dispatch(fetchProblemFileWithDetailAction(id)).finally(() => setLoading(false));
    }, [dispatch, id]);

    return loading ? <PageLoading /> : <ProblemFilePage />;
};

export default Wrapper;
