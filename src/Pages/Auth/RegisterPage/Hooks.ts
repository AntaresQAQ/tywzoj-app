import * as React from "react";

import { useRecaptcha } from "@/Common/Hooks/Recaptcha";
import { getRequireEmailVerification } from "@/Features/Environment/Selectors";
import { useAppDispatch, useAppSelector } from "@/Features/Store";

import {
    checkUsernameAction,
    registerAction,
    sendEmailEmailVerificationCodeAction,
    setRegisterPageState,
} from "./Action";
import {
    getHasError,
    getRegisterPage2ndPasswordError,
    getRegisterPageCode,
    getRegisterPageCodeError,
    getRegisterPageEmail,
    getRegisterPageEmailError,
    getRegisterPagePassword,
    getRegisterPagePasswordError,
    getRegisterPageSecondaryPassword,
    getRegisterPageUsername,
    getRegisterPageUsernameError,
} from "./Selectors";

export const useRegisterProps = () => {
    const dispatch = useAppDispatch();
    const recaptcha = useRecaptcha();

    const requireEmailVerification = useAppSelector(getRequireEmailVerification);
    const loading = useAppSelector(state => state.registerPage.loading);
    const sendCodeTime = useAppSelector(state => state.registerPage.sendCodeTime);

    const username = useAppSelector(getRegisterPageUsername);
    const email = useAppSelector(getRegisterPageEmail);
    const password = useAppSelector(getRegisterPagePassword);
    const secondaryPassword = useAppSelector(getRegisterPageSecondaryPassword);
    const code = useAppSelector(getRegisterPageCode);

    const hasError = useAppSelector(getHasError);
    const usernameError = useAppSelector(getRegisterPageUsernameError);
    const emailError = useAppSelector(getRegisterPageEmailError);
    const passwordError = useAppSelector(getRegisterPagePasswordError);
    const secondaryPasswordError = useAppSelector(getRegisterPage2ndPasswordError);
    const codeError = useAppSelector(getRegisterPageCodeError);

    const debounceTimeout = React.useRef<number>(null);

    // Clear timeout while the component is being unmounted
    React.useEffect(() => () => debounceTimeout.current && clearTimeout(debounceTimeout.current), []);

    const updateUsername = React.useCallback(
        (username: string) => {
            debounceTimeout.current && clearTimeout(debounceTimeout.current);
            dispatch(setRegisterPageState({ username, uError: null }));
            debounceTimeout.current = setTimeout(() => {
                dispatch(checkUsernameAction(recaptcha));
                debounceTimeout.current = null;
            }, 500);
        },
        [dispatch, recaptcha],
    );

    const updateEmail = React.useCallback(
        (email: string) => {
            dispatch(setRegisterPageState({ email, eError: null }));
        },
        [dispatch],
    );

    const updatePassword = React.useCallback(
        (password: string) => {
            dispatch(setRegisterPageState({ password, pError: null }));
        },
        [dispatch],
    );

    const updateSecondaryPassword = React.useCallback(
        (password: string) => {
            dispatch(setRegisterPageState({ secondaryPassword: password, spError: null }));
        },
        [dispatch],
    );

    const updateVerificationCode = React.useCallback(
        (code: string) => {
            dispatch(setRegisterPageState({ code, cError: null }));
        },
        [dispatch],
    );

    const sendVerificationCode = React.useCallback(
        (onSent: () => void) => {
            dispatch(sendEmailEmailVerificationCodeAction(recaptcha)).finally(onSent);
        },
        [dispatch, recaptcha],
    );

    const doRegister = React.useCallback(() => {
        dispatch(registerAction(recaptcha));
    }, [dispatch, recaptcha]);

    return {
        enableVerification: requireEmailVerification,
        loading,
        sendCodeTime,
        username,
        email,
        password,
        secondaryPassword,
        verificationCode: code,
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
        verificationCodeError: codeError,
        sendVerificationCode,
        doRegister,
    };
};

export const useSendingCodeError = () => {
    const dispatch = useAppDispatch();
    const err = useAppSelector(state => state.registerPage.sError);
    const timeout = React.useRef<number>(null);

    React.useEffect(() => {
        if (err) {
            timeout.current && clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                dispatch(setRegisterPageState({ sError: null }));
                timeout.current = null;
            }, 5000);
        }

        return () => timeout.current && clearTimeout(timeout.current);
    }, [dispatch, err]);

    const onDismiss = React.useCallback(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
            timeout.current = null;
        }
        dispatch(setRegisterPageState({ sError: null }));
    }, [dispatch]);

    return { sendingErrorMessage: err, onSendingErrorDismiss: onDismiss };
};
