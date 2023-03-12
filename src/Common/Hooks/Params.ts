import { useParams } from "react-router";

import { CE_Page } from "@/Common/Enums/PagePath";
import { IPageParams } from "@/Common/Types/PageParams";
import { StringifyValues } from "@/Common/Utilities/Types";

export const usePageParams = <P extends CE_Page>() => useParams<StringifyValues<IPageParams[P]>>();
