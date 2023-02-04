import { useAppSelector } from "@/Store";

import { getCurrentUser, getIsMobile, getIsSmallScreen } from "./Selectors";

export const useIsMobile = () => useAppSelector(getIsMobile);
export const useIsSmallScreen = () => useAppSelector(getIsSmallScreen);
export const useCurrentUser = () => useAppSelector(getCurrentUser);
