import { createReducer } from "@reduxjs/toolkit";

import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";
import { catchError, clearError } from "@/Common/Error/Action";
import { IErrorState } from "@/Common/Error/Types";

export const initialErrorState: IErrorState = {
  code: CE_ErrorCode.OK,
};

export const errorReducer = createReducer<IErrorState>(initialErrorState, builder => {
  builder
    .addCase(catchError, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase(clearError, () => ({
      code: CE_ErrorCode.OK,
    }));
});
