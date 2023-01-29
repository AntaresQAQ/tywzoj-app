import moment, { MomentInput } from "moment";

import { getLanguage } from "@/Common/LocalizedString/Selectors";
import { useAppSelector } from "@/Store";
export const useMomentFormatter = () => {
  const lang = useAppSelector(getLanguage);

  return (inp: MomentInput, format = "llll") => moment(inp).locale(lang).format(format);
};
