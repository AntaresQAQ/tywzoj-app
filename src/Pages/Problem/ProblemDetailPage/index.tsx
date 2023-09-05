import * as React from "react";

import { PageLoading } from "@/Common/Components/PageLoading";
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
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        dispatch(fetchProblemDetailAction(displayId)).finally(() => setLoading(false));
    }, [dispatch, displayId]);

    return loading ? <PageLoading /> : <ProblemDetailPage />;
};

export default Wrapper;
