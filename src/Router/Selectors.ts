import { IRootState } from "@/Store";

export const getQuery = (state: IRootState) => state.router.query;
export const getPath = (state: IRootState) => state.router.path;
