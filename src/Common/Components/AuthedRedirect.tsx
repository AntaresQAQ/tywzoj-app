import * as React from "react";
import { Navigate } from "react-router-dom";

import { CE_Page } from "@/Common/Enums/PagePath";
import { CE_QueryKey } from "@/Common/Enums/QueryKeys";
import { useCurrentUser } from "@/Features/Environment/Hooks";
import { useQuery } from "@/Features/Router/Hooks";

export interface IAuthRedirectProps {
    children?: React.ReactElement;
}

export const AuthedRedirect: React.FC<IAuthRedirectProps> = props => {
    const currentUser = useCurrentUser();
    const redirectTo = useQuery<string>(CE_QueryKey.LoginRedirect) || CE_Page.Home;

    if (currentUser) {
        return <Navigate to={redirectTo} />;
    } else {
        return props.children;
    }
};
