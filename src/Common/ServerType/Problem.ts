import { CE_UserLevel } from "@/Features/Permission/Enums/UserLevel";

import { IProblemJudgeInfoEntity } from "./ProblemJudgeInfo";
import { IProblemSampleEntity } from "./ProblemSample";
import { IProblemTagEntityWithExtra } from "./ProblemTag";
import { IUserAtomicEntity } from "./User";

export enum CE_ProblemType {
    Traditional = "Traditional",
    Interaction = "Interaction",
    SubmitAnswer = "SubmitAnswer",
}

export enum CE_ProblemScope {
    Global = "Global",
    Group = "Group",
    Personal = "Personal",
}

// Problem level just effects on "Global" scope
export const enum CE_ProblemLevel {
    All = CE_UserLevel.General,
    Paid = CE_UserLevel.Paid,
    Internal = CE_UserLevel.Internal,
}

export interface IProblemAtomicEntity {
    id: number;
    displayId: number;
    title: string;
}

export interface IProblemBaseEntity extends IProblemAtomicEntity {
    subtitle: string;

    // isPublic just effects on "Global" scope
    isPublic: boolean;
    publicTime: string;
    scope: CE_ProblemScope;
    submissionCount: number;
    acceptedSubmissionCount: number;
}

export interface IProblemEntity extends IProblemBaseEntity {
    description: string;
    inputFormat: string;
    outputFormat: string;
    limitAndHint: string;
    type: CE_ProblemType;
    level: CE_ProblemLevel;
}

export interface IProblemAtomicExtra {}

export interface IProblemBaseExtra extends IProblemAtomicExtra {
    tags?: IProblemTagEntityWithExtra[];
}

export interface IProblemExtra extends IProblemBaseExtra {
    owner: IUserAtomicEntity;
    samples: IProblemSampleEntity[];
    judgeInfo: IProblemJudgeInfoEntity;
}

export type IProblemAtomicEntityWithExtra = IProblemAtomicEntity & IProblemAtomicExtra;
export type IProblemBaseEntityWithExtra = IProblemBaseEntity & IProblemBaseExtra;
export type IProblemEntityWithExtra = IProblemEntity & IProblemExtra;
