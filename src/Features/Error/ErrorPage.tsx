/* eslint-disable @typescript-eslint/ban-ts-comment */

import { mergeStyles, MessageBar, MessageBarType } from "@fluentui/react";
import * as React from "react";

import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";
import { registerBlocked2Icon, registerErrorBadgeIcon, registerWarningIcon } from "@/Common/IconRegistration";
import { flex } from "@/Common/Styles/Flex";
import { setPageName } from "@/Features/Environment/Action";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppDispatch } from "@/Features/Store";

registerErrorBadgeIcon();
registerBlocked2Icon();
registerWarningIcon();

interface IErrorPageProps {
    code: CE_ErrorCode;
    onShow?: () => void;
}

const messageStyle = mergeStyles({
    padding: "15px 25px",
    ".ms-MessageBar-content": {
        ...flex({
            alignItems: "center",
        }),
    },
    ".ms-MessageBar-icon": {
        fontSize: 30,
        margin: "0 0 10px 0",
    },
    ".ms-MessageBar-text": {
        fontSize: 16,
        margin: "0 0 0 15px",
    },
});

export const ErrorPage: React.FC<IErrorPageProps> = props => {
    const { code, onShow } = props;
    const ls = useLocalizedStrings();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(setPageName(ls.LS_COMMON_ERROR_PAGE_TITLE));
    }, [dispatch, ls]);

    React.useEffect(() => {
        onShow && onShow();
    }, [onShow]);

    const msgType = React.useMemo((): MessageBarType => {
        switch (code) {
            case CE_ErrorCode.PermissionDenied:
                return MessageBarType.blocked;
            case CE_ErrorCode.RecaptchaError:
                return MessageBarType.severeWarning;

            default:
                return MessageBarType.error;
        }
    }, [code]);

    const msgContent = React.useMemo(() => {
        // @ts-ignore
        if (ls[`LS_ERROR_${code}_MESSAGE`]) {
            // @ts-ignore
            return ls[`LS_ERROR_${code}_MESSAGE`];
        }

        // Custom message without code.
        switch (code) {
            default:
                return ls.LS_ERROR_UNKNOWN_MESSAGE;
        }
    }, [code, ls]);

    return (
        <MessageBar className={messageStyle} messageBarType={msgType} isMultiline={true}>
            {msgContent}
        </MessageBar>
    );
};
