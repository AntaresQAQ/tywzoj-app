import * as React from "react";
import { Route, useParams } from "react-router-dom";

import { CE_Page } from "@/Common/Enums/PagePath";

import { loadUserDetailPage, loadUserEditPage, loadUserListPage, loadUserSettingPage } from "./DynamicImport";

const UserListPageLazy = React.lazy(loadUserListPage);
const UserDetailPageLazy = React.lazy(loadUserDetailPage);
const UserEditPageLazy = React.lazy(loadUserEditPage);
const UserSettingPageLazy = React.lazy(loadUserSettingPage);

export const useUserPageRoutes = () => {
  return (
    <>
      <Route path={CE_Page.UserEdit} element={<UserEditPageLazy />} />
      <Route path={CE_Page.UserSetting} element={<UserSettingPageLazy />} />
      <Route path={CE_Page.UserDetail} element={<UserDetailPageLazy />} />
      <Route path={CE_Page.User} element={<UserListPageLazy />} />
    </>
  );
};

export const useUserPageParams = () => useParams<{ id: string }>();
