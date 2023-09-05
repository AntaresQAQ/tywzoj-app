import * as React from "react";

import { usePage } from "@/Common/Hooks/Page";
import { useSortBy } from "@/Common/Hooks/SortBy";
import { runOnce } from "@/Common/Utilities/Tools";
import { useAppDispatch, useAppSelector } from "@/Features/Store";
import { injectDynamicReducer } from "@/Features/Store/Helper";

import { fetchUserListAction } from "./Action";
import { userListPageReducer } from "./Reducer";
import { CE_SortBy } from "./Types";
import { UserListPage } from "./UserListPage";

const configureStore = runOnce(() => {
    injectDynamicReducer({
        userListPage: userListPageReducer,
    });
});
configureStore();

const Wrapper: React.FC = () => {
    const dispatch = useAppDispatch();
    const takeCount = useAppSelector(state => state.pagination.userList);
    const qsPage = usePage();
    const sortBy = useSortBy<CE_SortBy>(state => state.env.sortUserBy);
    const skipCount = (qsPage - 1) * takeCount;

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        dispatch(fetchUserListAction(sortBy, skipCount, takeCount)).finally(() => setLoading(false));
    }, [dispatch, skipCount, sortBy, takeCount]);

    return <UserListPage loading={loading} takeCount={takeCount} sortBy={sortBy} />;
};

export default Wrapper;
