import { ILinkProps, Link as FluentLink } from "@fluentui/react";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";

export const FluentNavLink = (props: Omit<ILinkProps, "as">) => {
  return <FluentLink as={NavLink} {...props} />;
};

export const FluentRouterLink = (props: Omit<ILinkProps, "as">) => {
  return <FluentLink as={Link} {...props} />;
};
