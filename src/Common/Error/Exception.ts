import { CE_ErrorCode } from "@/Common/Error/Code";

export class AppException extends Error {
  constructor(public readonly code: CE_ErrorCode, msg?: string) {
    super(msg);
  }
}
