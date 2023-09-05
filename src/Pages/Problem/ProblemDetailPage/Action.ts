import { createAction } from "@reduxjs/toolkit";

import { IProblemEntityWithExtra } from "@/Common/ServerType/Problem";
import { getShowTagsOnProblemDetail } from "@/Features/Environment/Selectors";
import { IAppDispatch, IRootState } from "@/Features/Store";
import { getProblemDetail } from "@/Pages/Problem/ProblemDetailPage/Selectors";

import { getProblemDetailRequestAsync, getProblemTagsRequestAsync } from "./Request";
import { IProblemDetailPageState } from "./Types";

const UPDATE_PROBLEM_DETAIL_PAGE = "ProblemDetailPage/Update";
const UPDATE_PROBLEM_DETAIL_PAGE_PROBLEM = "ProblemDetailPage/Problem/Update";

export const setProblemDetailPage = createAction(
    UPDATE_PROBLEM_DETAIL_PAGE,
    (props: Partial<Omit<IProblemDetailPageState, "problemDetail">>) => ({
        payload: props,
    }),
);

export const setProblemDetailPageProblem = createAction(
    UPDATE_PROBLEM_DETAIL_PAGE_PROBLEM,
    (props: Partial<IProblemEntityWithExtra>) => ({
        payload: props,
    }),
);

export const fetchProblemDetailAction =
    (displayId: string, showTags?: boolean) => async (dispatch: IAppDispatch, getState: () => IRootState) => {
        const queryTags = showTags ?? getShowTagsOnProblemDetail(getState());
        const { data } = await getProblemDetailRequestAsync(displayId, queryTags);
        if (data) {
            dispatch(setProblemDetailPageProblem(data));
        }
    };

export const fetchProblemTagsAction = () => async (dispatch: IAppDispatch, getState: () => IRootState) => {
    const problemDetail = getProblemDetail(getState());
    if (problemDetail.tags) return;
    const { data } = await getProblemTagsRequestAsync(problemDetail.id, true);
    if (data && data.tags) {
        dispatch(setProblemDetailPageProblem({ tags: data.tags }));
    }
};
