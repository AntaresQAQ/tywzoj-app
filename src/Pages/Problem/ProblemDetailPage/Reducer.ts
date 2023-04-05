import { createReducer } from "@reduxjs/toolkit";

import { setProblemDetailPage, setProblemDetailPageProblem } from "@/Pages/Problem/ProblemDetailPage/Action";
import { IProblemDetailPageState } from "@/Pages/Problem/ProblemDetailPage/Types";

const initialProblemDetailPageState: IProblemDetailPageState = {
  problemDetail: {
    samples: [],
  },
  showTags: undefined,
} as unknown as IProblemDetailPageState;

export const problemDetailPageReducer = createReducer(initialProblemDetailPageState, builder => {
  builder
    .addCase(setProblemDetailPage, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase(setProblemDetailPageProblem, (state, action) => ({
      ...state,
      problemDetail: {
        ...state.problemDetail,
        ...action.payload,
      },
    }));
});
