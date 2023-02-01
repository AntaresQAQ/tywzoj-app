import { IRootState } from "@/Store";

export const getQueries = (state: IRootState) => state.router.queries;
export const getPath = (state: IRootState) => state.router.path;
export const getHash = (state: IRootState) => state.router.hash;
