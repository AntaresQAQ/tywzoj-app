import * as React from "react";

import { CE_ProblemType } from "@/Common/ServerType/Problem";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";

export const useProblemTypeText = () => {
  const ls = useLocalizedStrings();

  return React.useCallback(
    (problemType: CE_ProblemType) => {
      switch (problemType) {
        case CE_ProblemType.Traditional:
          return ls.LS_PROBLEM_TYPE_TRADITIONAL;
        case CE_ProblemType.SubmitAnswer:
          return ls.LS_PROBLEM_TYPE_SUBMIT_ANSWER;
        case CE_ProblemType.Interaction:
          return ls.LS_PROBLEM_TYPE_INTERACTION;
        default:
          return null;
      }
    },
    [ls],
  );
};
