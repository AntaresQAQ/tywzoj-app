import { IQueryObj } from "@/Common/Utilities/QueryString";

export interface IRouterState {
  path: string;
  query: IQueryObj;
  hash: string;
}
