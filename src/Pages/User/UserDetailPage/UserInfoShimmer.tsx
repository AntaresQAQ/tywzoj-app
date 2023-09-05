import { Shimmer } from "@fluentui/react";
import * as React from "react";

import { range } from "@/Common/Utilities/Math";

export const UserInfoShimmer: React.FC = () => {
    return (
        <>
            {range(0, 5).map((i) => (
                <Shimmer key={i} width={`${Math.ceil(10 + Math.random() * 90)}%`} style={{ marginTop: 8 }} />
            ))}
        </>
    );
};
