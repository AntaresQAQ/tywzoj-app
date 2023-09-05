import * as React from "react";

import { generateGravatarImageUrl, IGravatarDefaultImage } from "@/Common/Utilities/Gravatar";
import { useAppSelector } from "@/Features/Store";

export const useGravatar = (size = 512, defaultImage: IGravatarDefaultImage = "404") => {
    const cdnUrl = useAppSelector(state => state.env.gravatarCdn);
    return React.useCallback(
        (emailHash: string) => generateGravatarImageUrl(cdnUrl, emailHash, size, defaultImage),
        [cdnUrl, defaultImage, size],
    );
};
