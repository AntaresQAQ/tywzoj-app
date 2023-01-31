import { useAppSelector } from "@/Store";

import { getLocalizedStrings } from "./Selectors";

export const useLocalizedStrings = () => useAppSelector(getLocalizedStrings);
