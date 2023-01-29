import { useAppSelector } from "@/Store";

export const useLocalizedStrings = () => useAppSelector(state => state.locale.strings);
