import { useAppSelector } from "@/Store";

import { getIsMobile } from "./Selectors";

export const useIsMobile = () => useAppSelector(getIsMobile);
