/* eslint-disable @typescript-eslint/ban-ts-comment */

import { MessageBar, MessageBarType } from "@fluentui/react";
import * as React from "react";

import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";

interface IErrorPageProps {
  code: CE_ErrorCode;
  onShow: () => void;
}

export const ErrorPage: React.FC<IErrorPageProps> = props => {
  const { code, onShow } = props;
  const ls = useLocalizedStrings();

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      timeout = null;
      onShow();
    }, 100);

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [onShow]);

  const msgType = React.useMemo((): MessageBarType => {
    switch (code) {
      case CE_ErrorCode.PermissionDenied:
        return MessageBarType.blocked;

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

  return <MessageBar messageBarType={msgType}>{msgContent}</MessageBar>;
};
