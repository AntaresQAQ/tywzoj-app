import { useAppSelector } from "@/Features/Store";

import { getLocalizedStrings } from "./Selectors";

export const useLocalizedStrings = () => useAppSelector(getLocalizedStrings);
