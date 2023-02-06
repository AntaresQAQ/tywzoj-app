import * as React from "react";
import { useNavigate } from "react-router-dom";

import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";
import { CE_PagePath } from "@/Common/Enums/PagePath";
import { makeUrl } from "@/Common/Utilities/Url";
import { clearError } from "@/Features/Error/Action";
import { ErrorPage } from "@/Features/Error/ErrorPage";
import { getErrorCode } from "@/Features/Error/Selectors";
import { getHash, getPath, getQueries } from "@/Features/Router/Selectors";
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
  const path = useAppSelector(getPath);
  const queries = useAppSelector(getQueries);
  const hash = useAppSelector(getHash);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const shown = React.useRef(false);
  const redirecting = React.useRef(false);

  React.useEffect(() => {
    if (errorCode === CE_ErrorCode.AuthRequired && !redirecting.current) {
      redirecting.current = true;
      const url = makeUrl({ path, queries, hash });
      navigate(
        makeUrl({
          base: CE_PagePath.Login,
          queries: {
            redirect: url,
          },
        }),
      );
    }
  }, [dispatch, errorCode, hash, navigate, path, queries]);

  // Clear error on route changed.
  React.useEffect(() => {
    if (shown.current || redirecting.current) {
      dispatch(clearError());
      shown.current = false;
      redirecting.current = false;
    }
  }, [dispatch, hash, path, queries]);

  if (errorCode === CE_ErrorCode.AuthRequired) {
    return null;
  }

  if (errorCode) {
    return <ErrorPage code={errorCode} onShow={() => (shown.current = true)} />;
  }

  return props.children;
};
