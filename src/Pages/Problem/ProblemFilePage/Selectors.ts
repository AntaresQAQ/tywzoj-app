import { IRootState } from "@/Features/Store";

export const getProblemTestDataFiles = (state: IRootState) => state.problemFilePage.testDataFiles;
export const getProblemAdditionalFiles = (state: IRootState) => state.problemFilePage.additionalFiles;
export const getProblemTestDataUploadTasks = (state: IRootState) => state.problemFilePage.testDataUploadTasks;
export const getProblemAdditionalFileUploadTasks = (state: IRootState) =>
    state.problemFilePage.additionalFileUploadTasks;
