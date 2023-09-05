export const flex = ({
    display = "flex",
    flexDirection = "row",
    alignItems = "initial",
    justifyContent = "initial",
    flexWrap = "nowrap",
}: {
    display?: "flex" | "inline-flex";
    flexDirection?: "row" | "column" | "column-reverse" | "row-reverse";
    alignItems?: "center" | "baseline" | "flex-end" | "flex-start" | "stretch" | "initial";
    justifyContent?:
        | "center"
        | "flex-end"
        | "flex-start"
        | "space-around"
        | "space-between"
        | "space-evenly"
        | "initial";
    flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
}) => ({
    display,
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap,
});
