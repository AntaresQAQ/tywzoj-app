import { ITheme } from "@fluentui/react";

import { darkTheme } from "./Dark";
import { highContrastTheme } from "./HighContrast";
import { lightTheme } from "./Light";

export const enum CE_ThemeName {
  Light = "Light",
  Dark = "Dark",
  HighContrast = "HighContrast",
}

const themes: { [name: string]: ITheme } = {
  [CE_ThemeName.Light]: lightTheme,
  [CE_ThemeName.Dark]: darkTheme,
  [CE_ThemeName.HighContrast]: highContrastTheme,
};

export function getTheme(name?: CE_ThemeName): ITheme {
  return name && themes[name];
}
