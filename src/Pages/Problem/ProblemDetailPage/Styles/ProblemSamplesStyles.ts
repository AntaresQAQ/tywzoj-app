import { memoizeFunction, mergeStyleSets } from "@fluentui/react";

import { flex } from "@/Common/Styles/Flex";

export const getProblemSamplesStyles = memoizeFunction(isMiddleScreen =>
    mergeStyleSets({
        inOrOutContainer: {
            ...flex({
                flexDirection: isMiddleScreen ? "column" : "row",
                justifyContent: "space-between",
            }),
            gap: isMiddleScreen ? 10 : 20,
            width: "100%",
            boxSizing: "border-box",
        },
        inOrOut: {
            boxSizing: "border-box",
            width: isMiddleScreen ? "100%" : "calc(50% - 10px)",
            flexGrow: 1,
        },
        exp: {
            ...flex({
                flexDirection: "column",
            }),
            marginTop: 10,
        },
        title: {
            margin: 0,
        },
    }),
);
