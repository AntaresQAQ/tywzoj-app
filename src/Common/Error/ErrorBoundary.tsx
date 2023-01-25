import * as React from "react";

interface IProps {
  children: React.ReactElement;
}

export class ErrorBoundary extends React.Component<IProps> {
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
