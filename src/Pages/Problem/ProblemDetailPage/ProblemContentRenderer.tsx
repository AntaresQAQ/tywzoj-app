import { Spinner, SpinnerSize } from "@fluentui/react";
import * as React from "react";

import { loadMarkdownRenderer } from "@/Features/Markdown/DynamicImport";

const MarkdownRendererLazy = React.lazy(loadMarkdownRenderer);
export interface IProblemContentRendererProps {
  content: string;
}

export const ProblemContentRenderer: React.FC<IProblemContentRendererProps> = props => {
  return (
    <React.Suspense fallback={<Spinner size={SpinnerSize.large} />}>
      <MarkdownRendererLazy content={props.content} />
    </React.Suspense>
  );
};
