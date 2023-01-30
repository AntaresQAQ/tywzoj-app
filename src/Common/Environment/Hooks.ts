import { useAppSelector } from "@/Store";

import { getCurrentUser, getIsMobile } from "./Selectors";

export const useIsMobile = () => useAppSelector(getIsMobile);
export const useCurrentUser = () => useAppSelector(getCurrentUser);
