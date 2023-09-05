import { Callout, DirectionalHint, PrimaryButton, Spinner, SpinnerSize, TextField, useTheme } from "@fluentui/react";
import * as React from "react";

import { FluentRouterLink } from "@/Common/Components/FluentLink";
import { SendEmailVerificationCodeButton } from "@/Common/Components/SendEmailVerificationCodeButton";
import { CE_Page } from "@/Common/Enums/PagePath";
import { useRecaptchaCopyrightMessage } from "@/Common/Hooks/Recaptcha";
import { registerHideIcon, registerRedEyeIcon } from "@/Common/IconRegistration";
import { makeUrl } from "@/Common/Utilities/Url";
import { setPageName } from "@/Features/Environment/Action";
import { useIsSmallScreen } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppDispatch } from "@/Features/Store";

import { useRegisterProps, useSendingCodeError } from "./Hooks";
import { getRegisterPageStyles } from "./RegisterPageStyles";

registerRedEyeIcon();
registerHideIcon();
export const RegisterPage: React.FC = () => {
    const {
        enableVerification,
        loading,
        sendCodeTime,
        username,
        email,
        password,
        secondaryPassword,
        verificationCode,
        updateUsername,
        updateEmail,
        updatePassword,
        updateSecondaryPassword,
        updateVerificationCode,
        hasError,
        usernameError,
        emailError,
        passwordError,
        secondaryPasswordError,
        verificationCodeError,
        sendVerificationCode,
        doRegister,
    } = useRegisterProps();
    const theme = useTheme();
    const styles = getRegisterPageStyles(theme);
    const ls = useLocalizedStrings();
    const isSmallScreen = useIsSmallScreen();
    const recaptchaMsg = useRecaptchaCopyrightMessage();
    const dispatch = useAppDispatch();
    const { sendingErrorMessage, onSendingErrorDismiss } = useSendingCodeError();
    const codeFieldsRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        dispatch(setPageName(ls.LS_COMMON_SIGN_UP_TITLE));
    }, [dispatch, ls.LS_COMMON_SIGN_UP_TITLE]);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <h1 className={styles.title}>{ls.LS_COMMON_SIGN_UP_TITLE}</h1>
                <form className={styles.fields}>
                    <TextField
                        label={ls.LS_COMMON_USERNAME_LABEL}
                        value={username}
                        onChange={(e, v) => updateUsername(v)}
                        errorMessage={usernameError}
                        disabled={loading}
                    />
                    <TextField
                        label={ls.LS_COMMON_EMAIL_LABEL}
                        value={email}
                        onChange={(e, v) => updateEmail(v)}
                        errorMessage={emailError}
                        type="email"
                        disabled={loading}
                    />
                    {enableVerification && (
                        <div className={styles.inlineFields} ref={codeFieldsRef}>
                            <TextField
                                className={styles.codeField}
                                label={ls.LS_COMMON_VER_CODE_LABEL}
                                value={verificationCode}
                                onChange={(e, v) => updateVerificationCode(v)}
                                errorMessage={verificationCodeError}
                                disabled={loading}
                            />
                            <SendEmailVerificationCodeButton
                                className={styles.sendCodeButton}
                                sendTime={sendCodeTime}
                                delta={60 * 1000}
                                onSend={sendVerificationCode}
                                disabled={loading}
                            />
                        </div>
                    )}
                    <TextField
                        label={ls.LS_COMMON_PASSWORD_LABEL}
                        value={password}
                        onChange={(e, v) => updatePassword(v)}
                        errorMessage={passwordError}
                        type="password"
                        canRevealPassword={true}
                        revealPasswordAriaLabel={ls.LS_COMMON_REVEAL_PASSWORD_LABEL}
                        disabled={loading}
                    />
                    <TextField
                        label={ls.LS_COMMON_REPEAT_PASSWORD_LABEL}
                        value={secondaryPassword}
                        onChange={(e, v) => updateSecondaryPassword(v)}
                        errorMessage={secondaryPasswordError}
                        type="password"
                        canRevealPassword={true}
                        revealPasswordAriaLabel={ls.LS_COMMON_REVEAL_PASSWORD_LABEL}
                        disabled={loading}
                    />
                    <PrimaryButton
                        className={styles.registerButton}
                        disabled={loading || hasError}
                        onClick={doRegister}
                    >
                        {loading ? <Spinner size={SpinnerSize.medium} /> : ls.LS_COMMON_SIGN_UP_TITLE}
                    </PrimaryButton>
                </form>
                <div className={styles.footer}>
                    <span>{ls.LS_REGISTER_PAGE_FOOTER_TEXT}</span>
                    <FluentRouterLink to={makeUrl({ page: CE_Page.Login })}>
                        {ls.LS_COMMON_SIGN_IN_TITLE}
                    </FluentRouterLink>
                </div>
                {isSmallScreen && <div className={styles.recaptcha}>{recaptchaMsg}</div>}
            </div>
            {sendingErrorMessage && (
                <Callout
                    className={styles.sendCodeError}
                    target={codeFieldsRef}
                    isBeakVisible={false}
                    directionalHint={DirectionalHint.bottomRightEdge}
                    onDismiss={onSendingErrorDismiss}
                    gapSpace={10}
                    ariaLabel={sendingErrorMessage}
                >
                    {sendingErrorMessage}
                </Callout>
            )}
        </div>
    );
};
