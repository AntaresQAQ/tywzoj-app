import { TooltipHost, useTheme } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import * as React from "react";

import { Label } from "@/Common/Components/Label";
import { format } from "@/Common/Utilities/String";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_UserLevel } from "@/Features/Permission/Enums/UserLevel";
import { useUserLevelText } from "@/Features/Permission/Hooks/User";

export interface IUserLevelLabelProps {
  className?: string;
  level: CE_UserLevel;
}

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

  const text = userLevelText(level);
  const tip = format(ls.LS_USER_LEVEL_LABEL_TOOLTIP, text);

  const toolTipId = useId("tooltip");

  return (
    <TooltipHost content={tip} id={toolTipId}>
      <Label
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        className={className}
        aria-describedby={toolTipId}
      >
        {text}
      </Label>
    </TooltipHost>
  );
};
