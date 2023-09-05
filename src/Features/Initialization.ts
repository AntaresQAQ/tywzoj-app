import { getSessionInfoRequestAsync } from "@/Common/Request/Common";
import { initTheme } from "@/Common/Theme";

import { setCurrentUser, setEnv, setPagination, setServerVersion } from "./Environment/Action";
import { getApiBearerToken } from "./Environment/Selectors";
import { initLocalizeStringAsync } from "./LocalizedString";
import { IAppDispatch, IRootState } from "./Store";

export async function initSessionInfoAsync(dispatch: IAppDispatch, getState: () => IRootState) {
    const token = getApiBearerToken(getState());
    const sessionInfo = await getSessionInfoRequestAsync(token);
    if (!sessionInfo) return;

    dispatch(
        setEnv({
            ...sessionInfo.preference.misc,
            ...sessionInfo.preference.security,
            domainIcpRecordInformation: sessionInfo.preference.domainIcpRecordInformation,
            siteName: sessionInfo.preference.siteName,
            serverTimeDiff: Date.now() - sessionInfo.unixTimestamp,
        }),
    );
    dispatch(
        setServerVersion({
            date: sessionInfo.serverVersion.date,
            hash: sessionInfo.serverVersion.hash,
        }),
    );
    dispatch(setPagination(sessionInfo.preference.pagination));
    if (sessionInfo.userBaseDetail) {
        dispatch(setCurrentUser(sessionInfo.userBaseDetail));
        dispatch(setEnv(sessionInfo.userPreference));
    }
}

export async function initUserPreferenceConfigAsync(dispatch: IAppDispatch) {
    dispatch(initTheme);
    await dispatch(initLocalizeStringAsync);
}
