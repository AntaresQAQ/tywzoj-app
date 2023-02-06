import * as React from "react";
import { Route, useParams } from "react-router-dom";

import { CE_PagePath } from "@/Common/Enums/PagePath";

import { loadUserDetailPage, loadUserEditPage, loadUserListPage, loadUserSettingPage } from "./DynamicImport";

const UserListPageLazy = React.lazy(loadUserListPage);
const UserDetailPageLazy = React.lazy(loadUserDetailPage);
const UserEditPageLazy = React.lazy(loadUserEditPage);
const UserSettingPageLazy = React.lazy(loadUserSettingPage);

export const useUserPageRoutes = () => {
  return (
    <>
      <Route path={`${CE_PagePath.User}/:id/edit`} element={<UserEditPageLazy />} />
      <Route path={`${CE_PagePath.User}/:id/setting`} element={<UserSettingPageLazy />} />
      <Route path={`${CE_PagePath.User}/:id`} element={<UserDetailPageLazy />} />
      <Route path={CE_PagePath.User} element={<UserListPageLazy />} />
    </>
  );
};

export const useUserPageParams = () => useParams<{ id: string }>();
