import * as React from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { CE_RecaptchaAction } from "@/Common/Enums/RecaptchaAction";
import { getRecaptchaEnabled } from "@/Features/Environment/Selectors";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppSelector } from "@/Features/Store";

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const recaptchaEnabled = useAppSelector(getRecaptchaEnabled);

  return recaptchaEnabled
    ? async (action: CE_RecaptchaAction) => {
        try {
          return await executeRecaptcha(action);
        } catch (e) {
          console.error("Recaptcha Error:", e);
          return "";
        }
      }
    : async () => "";
};

export const useRecaptchaCopyrightMessage = (className?: string) => {
  const recaptchaEnabled = useAppSelector(getRecaptchaEnabled);
  const ls = useLocalizedStrings();
  return recaptchaEnabled ? (
    <span className={className} dangerouslySetInnerHTML={{ __html: ls.LS_APP_GOOGLE_RECAPTCHA_COPYRIGHT }} />
  ) : null;
};
