import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";

export interface IErrorState {
    code: CE_ErrorCode;
    msg?: string;
}
