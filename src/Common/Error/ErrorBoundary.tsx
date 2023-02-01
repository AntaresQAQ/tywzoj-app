import * as React from "react";
import { useNavigate } from "react-router-dom";

import { clearError } from "@/Common/Error/Action";
import { CE_ErrorCode } from "@/Common/Error/Code";
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (errorCode === CE_ErrorCode.AuthRequired) {
      dispatch(clearError());
      const url = makeUrl({ path, queries, hash });
      navigate(url);
    }
  }, [dispatch, errorCode, hash, navigate, path, queries]);

  if (errorCode) {
    return <ErrorPage code={errorCode} />;
  }

  return props.children;
};
