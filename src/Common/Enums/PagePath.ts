export const enum CE_Page {
  Home = "/",
  Problem = "/p", // ProblemList
  ProblemDetail = "/p/:displayId",
  ProblemEdit = "/p/:id/edit",
  ProblemManage = "/p/:id/manage",
  ProblemData = "/p/:id/data",
  ProblemSet = "/s", // ProblemSetList
  Homework = "/h", // HomeworkList
  Contest = "/c", // ContestList
  ContestDetail = "/c/:id",
  ContestProblem = "/c/:id/p/:pid",
  User = "/u", // UserList
  UsernameRedirect = "/un/:username",
  UserDetail = "/u/:id",
  UserSetting = "/u/:id/setting",
  UserEdit = "/u/:id/edit",
  Login = "/login",
  Register = "/register",
  ForgotPassword = "/forget",
}
