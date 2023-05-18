import { IRootState } from "@/Features/Store";

export const getProblemTestDataFiles = (state: IRootState) => state.problemFilePage.testDataFiles;
export const getProblemAdditionalFiles = (state: IRootState) => state.problemFilePage.additionalFiles;
