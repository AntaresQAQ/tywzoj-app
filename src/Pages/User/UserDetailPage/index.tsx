import * as React from "react";

import { PageLoading } from "@/Common/Components/PageLoading";
import { useAsyncFunctionResult } from "@/Common/Hooks/Async";
import { useAppDispatch } from "@/Features/Store";
import { useUserPageParams } from "@/Pages/User/Routes";

import { fetchUserDetailAction } from "./Action";
import { UserDetailPage } from "./UserDetailPage";

const Wrapper: React.FC = () => {
  const { id } = useUserPageParams();
  const dispatch = useAppDispatch();

  const [, pending] = useAsyncFunctionResult((id: string) => dispatch(fetchUserDetailAction(id)), [id]);

  return pending ? <PageLoading /> : <UserDetailPage />;
};

export default Wrapper;
