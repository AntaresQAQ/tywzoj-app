import { createReducer } from "@reduxjs/toolkit";

import { setProblemFilePage } from "@/Pages/Problem/ProblemFilePage/Action";

import { IProblemFilePageState } from "./Types";

const initialProblemFilePageState: IProblemFilePageState = {
  testDataFiles: [],
  additionalFiles: [],
  additionalFileUploadTasks: [],
  testDataUploadTasks: [],
};

export const problemFilePageReducer = createReducer(initialProblemFilePageState, builder => {
  builder.addCase(setProblemFilePage, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});
