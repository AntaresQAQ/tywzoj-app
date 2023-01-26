import { createAction } from "@reduxjs/toolkit";

import { ILocaleState } from "@/Common/LocalizeString/Types";

const UPDATE_LOCALE = "Locale/Update";
export const setLocale = createAction(UPDATE_LOCALE, (props: Partial<ILocaleState>) => ({
  payload: props,
}));
