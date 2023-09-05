import { IconButton as FluentIconButton, mergeStyles } from "@fluentui/react";
import { IButtonProps } from "@fluentui/react/lib/components/Button/Button.types";
import * as React from "react";

import { combineAttributes } from "@/Common/Utilities/Attributes";

const styles = mergeStyles({
    ".ms-Button-icon": {
        color: "inherit",
        fontSize: "inherit",
        height: "unset",
        span: {
            verticalAlign: "unset",
        },
    },
});

export const IconButton: React.FC<IButtonProps> = (props) => {
    const cls = combineAttributes(styles, props.className);
    return <FluentIconButton {...props} className={cls} />;
};
