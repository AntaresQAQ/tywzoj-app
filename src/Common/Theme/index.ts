import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  Theme,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";

export const enum CE_ThemeName {
  WebLight = "WebLight",
  WebDark = "WebDark",
  TeamsLight = "ThemesLight",
  TeamsDark = "TeamsDark",
  TeamsHighContrast = "teamsHighContrast",
}

const themes: { [name: string]: Theme } = {
  [CE_ThemeName.WebLight]: webLightTheme,
  [CE_ThemeName.WebDark]: webDarkTheme,
  [CE_ThemeName.TeamsLight]: teamsLightTheme,
  [CE_ThemeName.TeamsDark]: teamsDarkTheme,
  [CE_ThemeName.TeamsHighContrast]: teamsHighContrastTheme,
};

export function getTheme(name?: CE_ThemeName): Theme {
  return (name && themes[name]) || webLightTheme;
}
