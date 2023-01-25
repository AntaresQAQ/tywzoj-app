import React from "react";
export interface IAppLayoutProps {
  children: React.ReactElement;
}

export const AppLayout: React.FC<IAppLayoutProps> = props => {
  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
};
