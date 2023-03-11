import { ITheme } from "@fluentui/react";

import { setTheme } from "@/Features/Environment/Action";
import { IAppDispatch, IRootState } from "@/Features/Store";

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

const matchMediaDarkTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
let callback: (e: MediaQueryListEvent) => void;

export function initTheme(dispatch: IAppDispatch, getState: () => IRootState) {
  const userPreferenceTheme = getState().env.userPreferTheme;
  if (userPreferenceTheme) {
    if (callback && matchMediaDarkTheme) {
      matchMediaDarkTheme.removeEventListener("change", callback);
      callback = undefined;
    }
    dispatch(setTheme(userPreferenceTheme));
  } else if (matchMediaDarkTheme) {
    dispatch(setTheme(matchMediaDarkTheme.matches ? CE_ThemeName.Dark : CE_ThemeName.Light));
    callback = e => dispatch(setTheme(e.matches ? CE_ThemeName.Dark : CE_ThemeName.Light));
    matchMediaDarkTheme.addEventListener("change", callback);
  }
}
