export const enum CE_Page {
  Home = "/",
  Problem = "/p", // ProblemList
  ProblemDetail = "/p/:displayId",
  ProblemDetailById = "/p/i/:id",
  ProblemEdit = "/p/:id/edit",
  ProblemManage = "/p/:id/manage",
  ProblemFile = "/p/:id/file",
  ProblemSet = "/ps", // ProblemSetList
  Homework = "/h", // HomeworkList
  Contest = "/c", // ContestList
  ContestDetail = "/c/:id",
  ContestProblem = "/c/:id/p/:pid",
  Submission = "/s", // SubmissionList
  SubmissionDetail = "/s/:id",
  User = "/u", // UserList
  Discussion = "/d", //DiscussionList
  DiscussionDetail = "/d/:id",
  UsernameRedirect = "/username/:username",
  UserDetail = "/u/:id",
  UserSetting = "/u/:id/setting",
  UserEdit = "/u/:id/edit",
  Login = "/login",
  Register = "/register",
  ForgotPassword = "/forget",
}
