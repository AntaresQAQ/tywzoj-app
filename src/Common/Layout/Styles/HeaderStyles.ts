import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

export const getHeaderStyles = memoizeFunction((theme: ITheme) =>
  mergeStyleSets({
    root: {},
  }),
);
