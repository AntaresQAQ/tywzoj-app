import { CE_RecaptchaAction } from "@/Common/Enums/RecaptchaAction";

export type RecaptchaType = (action: CE_RecaptchaAction) => Promise<string>;
