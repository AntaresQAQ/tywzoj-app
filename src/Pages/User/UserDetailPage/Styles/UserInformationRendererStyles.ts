import { memoizeFunction, mergeStyleSets } from "@fluentui/react";

export const getUserInformationRendererStyles = memoizeFunction(() =>
  mergeStyleSets({
    content: {
      whiteSpace: "pre-wrap",
    },
  }),
);
