import { CE_UserLevel } from "@/Common/Enums/UserLevel";

export const enum CE_UserGender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export interface IUserBaseEntity {
  id: number;
  username: string;
  email: string;
  nickname?: string;
  information?: string;
  level: CE_UserLevel;
  avatar: string;
}

export interface IUserEntity extends IUserBaseEntity {
  gender?: CE_UserGender;
  acceptedProblemCount: number;
  submissionCount: number;
  rating: number;
  registrationTime: string;
}
