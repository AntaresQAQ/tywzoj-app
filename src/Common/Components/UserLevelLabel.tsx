import { memoizeFunction, mergeStyles, TooltipHost, useTheme } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import * as React from "react";

import { CE_UserLevel } from "@/Common/Enums/UserLevel";
import { useUserLevelText } from "@/Common/Hooks/UserLevel";
import { combineAttributes } from "@/Common/Utilities/Attributes";
import { format } from "@/Common/Utilities/String";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";

export interface IUserLevelLabelProps {
  className?: string;
  level: CE_UserLevel;
}

const getStyle = memoizeFunction((backgroundColor: string, borderColor: string) =>
  mergeStyles({
    fontSize: 12,
    fontWeight: 800,
    borderRadius: 6,
    backgroundColor: backgroundColor,
    border: `solid 1px ${borderColor}`,
    color: "#fff",
    padding: "2px 6px",
    wordBreak: "keep-all",
  }),
);

export const UserLevelLabel: React.FC<IUserLevelLabelProps> = props => {
  const { className, level } = props;
  const userLevelText = useUserLevelText();
  const theme = useTheme();
  const ls = useLocalizedStrings();

  const backgroundColor = React.useMemo(() => {
    switch (level) {
      case CE_UserLevel.Admin:
        return theme.palette.red;
      case CE_UserLevel.Manager:
        return theme.palette.orange;
      case CE_UserLevel.Internal:
        return theme.palette.purple;
      case CE_UserLevel.Paid:
        return theme.palette.green;
      case CE_UserLevel.Blocked:
        return "#000";
      case CE_UserLevel.General:
      default:
        return theme.palette.blue;
    }
  }, [level, theme]);

  const borderColor = React.useMemo(() => {
    switch (level) {
      case CE_UserLevel.Blocked:
        return theme.palette.black;
      default:
        return backgroundColor;
    }
  }, [level, backgroundColor, theme]);

  const style = getStyle(backgroundColor, borderColor);
  const text = userLevelText(level);
  const tip = format(ls.LS_USER_LEVEL_LABEL_TOOLTIP, text);

  const toolTipId = useId("tooltip");

  return (
    <TooltipHost content={tip}>
      <span className={combineAttributes(style, className)} aria-describedby={toolTipId}>
        {text}
      </span>
    </TooltipHost>
  );
};
