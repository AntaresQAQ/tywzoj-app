import * as React from "react";
import { Navigate } from "react-router-dom";

import { CE_ErrorCode } from "@/Common/Enums/ErrorCode";
import { clearError } from "@/Common/Error/Action";
import { ErrorPage } from "@/Common/Error/ErrorPage";
import { getErrorCode } from "@/Common/Error/Selectors";
import { makeUrl } from "@/Common/Utilities/Url";
import { getHash, getPath, getQueries } from "@/Router/Selectors";
import { useAppDispatch, useAppSelector } from "@/Store";

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
  const dispatch = useAppDispatch();
  const [shown, setShown] = React.useState(false);

  // Clear error on route changed.
  React.useEffect(() => {
    if (shown) {
      dispatch(clearError());
      setShown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, path, queries]);

  // Redirect to login page on AuthRequiredError
  if (errorCode === CE_ErrorCode.AuthRequired) {
    return <Navigate to={makeUrl({ path, queries, hash })} />;
  }

  if (errorCode) {
    return <ErrorPage code={errorCode} onShow={() => setShown(true)} />;
  }

  return props.children;
};
