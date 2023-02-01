import { CE_ErrorCode } from "@/Common/Error/Code";

export interface IErrorState {
  code: CE_ErrorCode;
  msg?: string;
}
