export function loadUserListPage() {
  return import("./UserListPage/UserListPage").then(({ UserListPage }) => ({ default: UserListPage }));
}

export function loadUserDetailPage() {
  return import("./UserDetailPage/UserDetailPage").then(({ UserDetailPage }) => ({ default: UserDetailPage }));
}

export function loadUserEditPage() {
  return import("./UserEditPage/UserEditPage").then(({ UserEditPage }) => ({ default: UserEditPage }));
}

export function loadUserSettingPage() {
  return import("./UserSettingPage/UserSettingPage").then(({ UserSettingPage }) => ({ default: UserSettingPage }));
}
