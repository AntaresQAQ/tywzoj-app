import { IQueryObj } from "@/Common/Utilities/QueryString";

export interface IRouterState {
  path: string;
  queries: IQueryObj;
  hash: string;
}
