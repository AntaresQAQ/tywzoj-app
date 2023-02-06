import * as React from "react";

import { PageLoading } from "@/Common/Components/PageLoading";
import { useAppDispatch } from "@/Features/Store";
import { fetchUserDetailAction } from "@/Pages/User/Features/UserDetailPage/Action";
import { UserDetailPage } from "@/Pages/User/Features/UserDetailPage/UserDetailPage";
import { useUserPageParams } from "@/Pages/User/Routes";

const Wrapper: React.FC = () => {
  const [dataFetched, setDataFetched] = React.useState(false);
  const { id } = useUserPageParams();
  const dispatch = useAppDispatch();

  // Fetch data
  React.useEffect(() => {
    dispatch(fetchUserDetailAction(id)).then(succeed => {
      if (succeed) {
        setDataFetched(true);
      }
    });
  }, [dispatch, id]);

  return dataFetched ? <UserDetailPage /> : <PageLoading />;
};

export default Wrapper;
