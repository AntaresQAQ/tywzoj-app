import { DefaultButton, Spinner, SpinnerSize } from "@fluentui/react";
import * as React from "react";

import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";

export interface ISendEmailVerificationCodeButtonProps {
    sendTime: number;
    delta: number;
    onSend: (onSent: () => void) => void;
    className?: string;
    tabIndex?: number;
    disabled?: boolean;
}

export const SendEmailVerificationCodeButton: React.FC<ISendEmailVerificationCodeButtonProps> = props => {
    const { sendTime, delta, onSend, className, tabIndex, disabled } = props;

    const ls = useLocalizedStrings();
    const [timeLeft, setTimeLeft] = React.useState(0);
    const [sending, setSending] = React.useState(false);

    React.useEffect(() => {
        let interval: number;
        let diff = sendTime + delta - Date.now();
        if (diff > 0) {
            setTimeLeft(Math.ceil(diff / 1000));
            interval = setInterval(() => {
                diff = sendTime + delta - Date.now();
                setTimeLeft(Math.ceil(diff / 1000));
                if (diff < 0) {
                    clearInterval(interval);
                    interval = null;
                }
            }, 1000);
        }
        return () => interval && clearInterval(interval);
    }, [delta, sendTime]);

    const onClick = React.useCallback(() => {
        setSending(true);
        onSend(() => setSending(false));
    }, [onSend]);

    return (
        <DefaultButton
            disabled={sending || !!timeLeft || disabled}
            onClick={onClick}
            className={className}
            tabIndex={tabIndex}
        >
            {sending ? <Spinner size={SpinnerSize.medium} /> : timeLeft || ls.LS_COMMON_SEND_CODE_BUTTON_LABEL}
        </DefaultButton>
    );
};
