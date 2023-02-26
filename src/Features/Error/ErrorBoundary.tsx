import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";
import { CE_Page } from "@/Common/Enums/PagePath";
import { CE_QueryKey } from "@/Common/Enums/QueryKeys";
import { makeUrl } from "@/Common/Utilities/Url";
import { setCurrentUser, setEnvApiBearerToken } from "@/Features/Environment/Action";
import { clearError } from "@/Features/Error/Action";
import { ErrorPage } from "@/Features/Error/ErrorPage";
import { getErrorCode } from "@/Features/Error/Selectors";
import { useAppDispatch, useAppSelector } from "@/Features/Store";

interface IProps {
  children: React.ReactElement;
}

export class GlobalErrorBoundary extends React.Component<IProps> {
  public static getDerivedStateFromError(error: Error) {
    if (window.onerror) {
      window.onerror(error.message, null, null, null, error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {}

  public render() {
    return this.props.children;
  }
}

export const AppErrorBoundary: React.FC<IProps> = props => {
  const errorCode = useAppSelector(getErrorCode);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname, search, hash } = useLocation();

  const shown = React.useRef(false);

  const url = pathname + search + hash;

  React.useEffect(() => {
    if (errorCode === CE_ErrorCode.AuthRequired && !shown.current) {
      shown.current = true;
      navigate(
        makeUrl({
          page: CE_Page.Login,
          queries: {
            [CE_QueryKey.LoginRedirect]: url,
          },
        }),
      );
      dispatch(setEnvApiBearerToken(null));
      dispatch(setCurrentUser(null));
    }
  }, [dispatch, errorCode, navigate, url]);

  // Clear error on route changed.
  React.useEffect(() => {
    if (shown.current) {
      dispatch(clearError());
      shown.current = false;
    }
  }, [dispatch, url]);

  if (errorCode === CE_ErrorCode.AuthRequired) {
    return null;
  }

  if (errorCode) {
    return <ErrorPage code={errorCode} onShow={() => (shown.current = true)} />;
  }

  return props.children;
};
