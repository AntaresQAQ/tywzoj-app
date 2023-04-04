import { IAppDispatch, IRootState } from "@/Features/Store";

import { updateLocaleAction } from "./Action";
import { getPreferLanguage } from "./Utils";

export async function initLocalizeStringAsync(dispatch: IAppDispatch, getState: () => IRootState) {
  const preferLang = getState().env.userPreferLanguage || getPreferLanguage();
  await dispatch(updateLocaleAction(preferLang));
}
