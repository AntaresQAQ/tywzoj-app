import { DefaultButton } from "@fluentui/react";
import { IButtonProps } from "@fluentui/react/lib/components/Button/Button.types";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { parseUrlIfSameOrigin } from "@/Common/Utilities/Url";

export interface IButtonAnchorProps extends Omit<IButtonProps, "href"> {
    href: string;
}

export const ButtonAnchor: React.FC<IButtonAnchorProps> = props => {
    const navigate = useNavigate();

    return (
        <DefaultButton
            target="_blank"
            {...props}
            onClick={e => {
                if (props.onClick) {
                    props.onClick(e);
                    return;
                }

                const url = parseUrlIfSameOrigin(props.href);
                if (url) {
                    e.preventDefault();
                    navigate(url.pathname + url.search + url.hash);
                }
            }}
        />
    );
};
