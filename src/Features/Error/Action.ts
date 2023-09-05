import { createAction } from "@reduxjs/toolkit";

import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";

const CATCH_ERROR = "Error/Catch";
const CLEAR_ERROR = "Error/Clear";

export const catchError = createAction(CATCH_ERROR, (code: CE_ErrorCode, msg?: string) => {
    return {
        payload: { code, msg },
    };
});

export const clearError = createAction(CLEAR_ERROR, () => {
    return { payload: null };
});
