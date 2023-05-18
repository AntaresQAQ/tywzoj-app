import { createAction } from "@reduxjs/toolkit";

import { CE_ProblemFileType } from "@/Common/ServerType/ProblemFile";
import { IAppDispatch, IRootState } from "@/Features/Store";
import { getProblemDetail } from "@/Pages/Problem/ProblemDetailPage/Selectors";

import { setProblemDetailPageProblem } from "../ProblemDetailPage/Action";
import { getProblemDetailRequestAsync, getProblemFilesRequestAsync } from "./Request";
import { IProblemFilePageState } from "./Types";

const UPDATE_PROBLEM_FILE_PAGE = "ProblemFilePage/Update";

export const setProblemFilePage = createAction(UPDATE_PROBLEM_FILE_PAGE, (props: Partial<IProblemFilePageState>) => ({
  payload: props,
}));

export const fetchProblemFileAction = (id: string) => async (dispatch: IAppDispatch) => {
  const { data } = await getProblemFilesRequestAsync(id);
  if (data) {
    const { files } = data;
    const testDataFiles: typeof files = [];
    const additionalFiles: typeof files = [];

    for (const file of files) {
      if (file.type === CE_ProblemFileType.TestData) {
        testDataFiles.push(file);
      } else if (file.type === CE_ProblemFileType.AdditionalFile) {
        additionalFiles.push(file);
      }
    }

    dispatch(setProblemFilePage({ testDataFiles, additionalFiles }));
  }
};

// Please ensure that ProblemDetailPage's store has been initialized before using this function.
export const fetchProblemFileWithDetailAction =
  (id: string) => async (dispatch: IAppDispatch, getState: () => IRootState) => {
    const problemDetail = getProblemDetail(getState());

    // If the problem detail is existed, only fetch problem files.
    if (problemDetail && problemDetail.id === Number(id)) {
      await dispatch(fetchProblemFileAction(id));
      return;
    }

    // Fetch problem detail firstly, then fetch problem files.
    const { data } = await getProblemDetailRequestAsync(id);
    if (data) {
      dispatch(setProblemDetailPageProblem(data));
      await dispatch(fetchProblemFileAction(id));
    }
  };
