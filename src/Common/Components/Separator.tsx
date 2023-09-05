import { ISeparatorProps as IFluentSeparatorProps, Separator as FluentSeparator, useTheme } from "@fluentui/react";
import * as React from "react";

export interface ISeparatorProps extends IFluentSeparatorProps {
    customLineColor?: string;
}

export const Separator: React.FC<ISeparatorProps> = (props) => {
    const theme = useTheme();
    return (
        <FluentSeparator
            {...props}
            theme={{
                ...theme,
                palette: {
                    ...theme.palette,
                    neutralLighter: props.customLineColor ?? theme.palette.neutralLighter,
                },
            }}
        />
    );
};
