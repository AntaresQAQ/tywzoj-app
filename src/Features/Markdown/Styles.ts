import { ITheme, memoizeFunction, mergeStyles, mergeStyleSets } from "@fluentui/react";

import { themedAnchorStyle } from "@/Common/Styles/Anchor";
import { flex } from "@/Common/Styles/Flex";

export const getMarkdownContentStyles = memoizeFunction((theme: ITheme) =>
    mergeStyles({
        position: "relative",
        overflow: "hidden",
        transform: "translate3d(0, 0, 0)",

        ...themedAnchorStyle(theme),

        "h1, h2, h3, h4, h5, h6": { margin: "0.5em 0 0" },

        h1: { fontSize: 24 },
        h2: { fontSize: 22 },
        h3: { fontSize: 18 },
        h4: { fontSize: 16 },
        h5: { fontSize: 14 },
        h6: { fontSize: 12 },

        "pre, code": { fontSize: 12 },

        "p, blockquote": {
            overflow: "auto",
            overflowY: "hidden",
            margin: "0.5em 0",
        },

        blockquote: {
            color: theme.palette.neutralPrimaryAlt,
            backgroundColor: theme.palette.neutralLighter,
            paddingLeft: "1em",
            borderLeft: `0.25em solid ${theme.palette.neutralTertiaryAlt}`,
            margin: "1em 0",
        },

        "ul, ol, blockquote": {
            "&:first-child": {
                marginTop: "0 !important",
            },

            "&:last-child": {
                marginBottom: "0 !important",
            },
        },

        "p > img:only-child": {
            display: "block",
            margin: "0 auto",
            maxWidth: "100%",
        },

        "ul, ol": {
            paddingLeft: "2em",
            "ul, ol": {
                paddingLeft: "1.5em",
            },
        },
    }),
);

export const getMarkdownEditorStyles = memoizeFunction((theme: ITheme, isActive: boolean, height: number) =>
    mergeStyleSets({
        root: {
            ...flex({
                flexDirection: "column",
            }),
            width: "100%",
        },
        header: {
            ...flex({
                justifyContent: "space-between",
                alignItems: "center",
            }),
            height: 30,
            width: "100%",
        },
        label: {
            fontSize: 14,
            fontWeight: 600,
        },
        switch: {
            ...flex({
                alignItems: "center",
            }),
        },
        editor: {
            borderRadius: theme.effects.roundedCorner2,
            border: `${isActive ? 2 : 1}px solid ${
                isActive ? theme.palette.themePrimary : theme.palette.neutralPrimary
            }`,
            padding: isActive ? "3px 1px" : "4px 2px", // 1px for border
        },
        perview: {
            width: "100%",
            borderRadius: theme.effects.roundedCorner2,
            border: `1px solid ${theme.palette.neutralPrimary}`,
            padding: "0 14px",
            height,
            maxHeight: height,
            overflow: "auto",
        },
        spinner: {
            width: "100%",
            height: "100%",
        },
    }),
);
