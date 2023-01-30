import * as React from "react";

import { generateGravatarImageUrl } from "@/Common/Utilities/Gravatar";
import { useAppSelector } from "@/Store";

export const useGravatar = () => {
  const cdnUrl = useAppSelector(state => state.env.gravatarCdn);
  return React.useCallback(
    (emailHash: string, size = 512) => generateGravatarImageUrl(cdnUrl, emailHash, size),
    [cdnUrl],
  );
};
