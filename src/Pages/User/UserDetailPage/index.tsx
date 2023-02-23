import * as React from "react";

import { PageLoading } from "@/Common/Components/PageLoading";
import { runOnce } from "@/Common/Utilities/Tools";
import { useAppDispatch } from "@/Features/Store";
import { injectDynamicReducer } from "@/Features/Store/Helper";
import { useUserPageParams } from "@/Pages/User/Routes";

import { fetchUserDetailAction } from "./Action";
import { userDetailPageReducer } from "./Reducer";
import { UserDetailPage } from "./UserDetailPage";

const configureStore = runOnce(() => {
  injectDynamicReducer({
    userDetailPage: userDetailPageReducer,
  });
});
configureStore();

const Wrapper: React.FC = () => {
  const { id } = useUserPageParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    dispatch(fetchUserDetailAction(id)).finally(() => setLoading(false));
  }, [dispatch, id]);

  return loading ? <PageLoading /> : <UserDetailPage />;
};

export default Wrapper;
