import { memoizeFunction, mergeStyles } from "@fluentui/react";
import * as React from "react";

import { combineAttributes } from "@/Common/Utilities/Attributes";
import { isLightColor } from "@/Common/Utilities/Color";

export interface ILabelProps extends React.HTMLProps<HTMLSpanElement> {
  backgroundColor: string;
  borderColor?: string;
  textColor?: string;
}

const getStyle = memoizeFunction((backgroundColor: string, borderColor: string) =>
  mergeStyles({
    fontSize: 12,
    fontWeight: 800,
    borderRadius: 6,
    backgroundColor: backgroundColor,
    border: `solid 1px ${borderColor}`,
    color: isLightColor(backgroundColor) ? "#000" : "#fff",
    padding: "2px 6px",
    wordBreak: "keep-all",
  }),
);

export const Label: React.FC<ILabelProps> = props => {
  const { backgroundColor, borderColor, className } = props;
  const cls = getStyle(backgroundColor, borderColor ?? backgroundColor);
  const newProps = { ...props };
  delete newProps.backgroundColor;
  delete newProps.borderColor;
  return <span {...newProps} className={combineAttributes(cls, className)} />;
};
