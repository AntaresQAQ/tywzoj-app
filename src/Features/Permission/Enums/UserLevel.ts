// Please keep this enum the same as server side
export const enum CE_UserLevel {
  Admin = 1000, // Someone can manage anything
  Manager = 500, // Someone can manage content except security
  Internal = 100, // Inner school user (students)
  Paid = 50, // External paid user
  General = 1,
  Blocked = -1000,
}
