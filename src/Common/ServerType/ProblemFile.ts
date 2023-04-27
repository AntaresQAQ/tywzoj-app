import { IFileEntity } from "./File";

export const enum CE_ProblemFileType {
  TestData = "T",
  AdditionalFile = "A",
}

export interface IProblemFileEntity {
  filename: string;
  uuid: string;
  type: CE_ProblemFileType;
}

export interface IProblemFileExtra {
  file: IFileEntity;
}

export type IProblemFileEntityWithExtra = IProblemFileEntity & IProblemFileExtra;
