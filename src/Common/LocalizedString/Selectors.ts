import { IRootState } from "@/Store";

export const getLanguage = (state: IRootState) => state.locale.lang;
