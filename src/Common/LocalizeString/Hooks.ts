import { useAppSelector } from "@/Store";

export const useLocalizeStrings = () => useAppSelector(state => state.locale.strings);
