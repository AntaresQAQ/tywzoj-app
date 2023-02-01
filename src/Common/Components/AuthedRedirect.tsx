import * as React from "react";
import { Navigate } from "react-router-dom";

import { CE_PagePath } from "@/Common/Enums/PagePath";
import { useCurrentUser } from "@/Common/Environment/Hooks";
import { makeUrl } from "@/Common/Utilities/Url";
import { useQuery } from "@/Router/Hooks";

export interface IAuthRedirectProps {
  children?: React.ReactElement;
}

export const AuthedRedirect: React.FC<IAuthRedirectProps> = props => {
  const currentUser = useCurrentUser();
  const redirectTo = useQuery<string>("redirect") || makeUrl({ base: CE_PagePath.Home });

  if (currentUser) {
    return <Navigate to={redirectTo} />;
  } else {
    return props.children;
  }
};
