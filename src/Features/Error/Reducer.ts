import { createReducer } from "@reduxjs/toolkit";

import { catchError, clearError } from "@/Features/Error/Action";
import { IErrorState } from "@/Features/Error/Types";

export const initialErrorState: IErrorState = {
    code: null,
};

export const errorReducer = createReducer<IErrorState>(initialErrorState, builder => {
    builder
        .addCase(catchError, (state, action) => ({
            ...state,
            ...action.payload,
        }))
        .addCase(clearError, () => ({
            code: null,
        }));
});
