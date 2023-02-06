import { useAppSelector } from "@/Features/Store";

import {
  getCurrentUser,
  getIsMiddleScreen,
  getIsMiniScreen,
  getIsMobile,
  getIsMobileView,
  getIsSmallScreen,
} from "./Selectors";

export const useIsMobile = () => useAppSelector(getIsMobile);
export const useIsMobileView = () => useAppSelector(getIsMobileView);
export const useIsSmallScreen = () => useAppSelector(getIsSmallScreen);
export const useIsMiniScreen = () => useAppSelector(getIsMiniScreen);
export const useIsMiddleScreen = () => useAppSelector(getIsMiddleScreen);
export const useCurrentUser = () => useAppSelector(getCurrentUser);
