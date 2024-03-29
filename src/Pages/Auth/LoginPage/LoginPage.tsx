import {
    ChoiceGroup,
    IChoiceGroupOption,
    PrimaryButton,
    Spinner,
    SpinnerSize,
    TextField,
    useTheme,
} from "@fluentui/react";
import * as React from "react";

import { FluentRouterLink } from "@/Common/Components/FluentLink";
import { CE_Page } from "@/Common/Enums/PagePath";
import { useRecaptchaCopyrightMessage } from "@/Common/Hooks/Recaptcha";
import { registerHideIcon, registerRedEyeIcon } from "@/Common/IconRegistration";
import { makeUrl } from "@/Common/Utilities/Url";
import { setPageName } from "@/Features/Environment/Action";
import { useIsSmallScreen } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppDispatch } from "@/Features/Store";

import { useLoginProps } from "./Hooks";
import { getLoginPageStyles } from "./LoginPageStyles";
import { CE_LoginType } from "./Types";

registerRedEyeIcon();
registerHideIcon();
export const LoginPage: React.FC = () => {
    const {
        loginType,
        usernameOrEmail,
        password,
        updateUsernameOrEmail,
        updatePassword,
        updateLoginType,
        isLoading,
        uErr,
        pErr,
        doLogin,
    } = useLoginProps();
    const dispatch = useAppDispatch();
    const ls = useLocalizedStrings();
    const theme = useTheme();
    const isSmallScreen = useIsSmallScreen();
    const styles = getLoginPageStyles(theme);
    const recaptchaMsg = useRecaptchaCopyrightMessage();

    React.useEffect(() => {
        dispatch(setPageName(ls.LS_COMMON_SIGN_IN_TITLE));
    }, [dispatch, ls]);

    const loginTypeOptions = React.useMemo(
        (): IChoiceGroupOption[] => [
            { key: CE_LoginType.Username, text: ls.LS_COMMON_USERNAME_LABEL },
            { key: CE_LoginType.Email, text: ls.LS_COMMON_EMAIL_LABEL },
        ],
        [ls],
    );

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <h1 className={styles.title}>{ls.LS_COMMON_SIGN_IN_TITLE}</h1>
                <form className={styles.fields}>
                    <ChoiceGroup
                        label={ls.LS_LOGIN_PAGE_LOGIN_TYPE_LABEL}
                        className={styles.typeChoice}
                        options={loginTypeOptions}
                        selectedKey={loginType}
                        onChange={(e, v) => updateLoginType(v.key as CE_LoginType)}
                        disabled={isLoading}
                    />
                    <TextField
                        label={
                            loginType === CE_LoginType.Username ? ls.LS_COMMON_USERNAME_LABEL : ls.LS_COMMON_EMAIL_LABEL
                        }
                        type={loginType === CE_LoginType.Email ? "email" : "text"}
                        value={usernameOrEmail}
                        onChange={(e, v) => updateUsernameOrEmail(v)}
                        disabled={isLoading}
                        errorMessage={uErr}
                    />
                    <TextField
                        label={ls.LS_COMMON_PASSWORD_LABEL}
                        value={password}
                        type="password"
                        canRevealPassword={true}
                        revealPasswordAriaLabel={ls.LS_COMMON_REVEAL_PASSWORD_LABEL}
                        onChange={(e, v) => updatePassword(v)}
                        disabled={isLoading}
                        errorMessage={pErr}
                    />
                    <PrimaryButton className={styles.loginButton} onClick={doLogin} disabled={isLoading} id="login-btn">
                        {isLoading ? <Spinner size={SpinnerSize.medium} /> : ls.LS_COMMON_SIGN_IN_TITLE}
                    </PrimaryButton>
                </form>
                <div className={styles.footer}>
                    <FluentRouterLink to={makeUrl({ page: CE_Page.ForgotPassword })}>
                        {ls.LS_LOGIN_PAGE_FORGOT_PASSWORD}
                    </FluentRouterLink>
                    <FluentRouterLink to={makeUrl({ page: CE_Page.Register })}>
                        {ls.LS_COMMON_SIGN_UP_TITLE}
                    </FluentRouterLink>
                </div>
                {isSmallScreen && <div className={styles.recaptcha}>{recaptchaMsg}</div>}
            </div>
        </div>
    );
};
