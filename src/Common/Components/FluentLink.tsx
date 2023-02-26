import { ILinkProps, Link as FluentLink } from "@fluentui/react";
import * as React from "react";
import { Link, LinkProps, NavLink, NavLinkProps } from "react-router-dom";

export const FluentNavLink = (props: Omit<ILinkProps & NavLinkProps, "as">) => {
  return <FluentLink as={NavLink} {...props} />;
};

export const FluentRouterLink = (props: Omit<ILinkProps & LinkProps, "as">) => {
  return <FluentLink as={Link} {...props} />;
};
