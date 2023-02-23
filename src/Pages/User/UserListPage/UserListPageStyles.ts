import { ITheme, memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { flex } from "@/Common/Styles/Flex";

export const getUserListPageStyles = memoizeFunction((theme: ITheme) =>
  mergeStyleSets({
    root: {
      ...flex({
        flexDirection: "row",
        justifyContent: "center",
      }),
      width: "100%",
    },
    mainContainer: {
      ...flex({
        flexDirection: "column",
        alignItems: "flex-start",
      }),
      width: "100%",
      maxWidth: 1200,
      gap: 20,
    },
    headerContainer: {
      ...flex({}),
    },
    tableContainer: {
      width: "100%",
      boxSizing: "border-box",
      boxShadow: theme.effects.elevation8,
      borderRadius: theme.effects.roundedCorner6,
      padding: 10,
    },
    table: {
      ".ms-DetailsHeader": {
        paddingTop: 1,
      },
    },
    paginateContainer: {
      ...flex({
        justifyContent: "center",
      }),
      width: "100%",
    },
  }),
);
