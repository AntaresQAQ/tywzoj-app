import { mergeStyles, Spinner, SpinnerSize } from "@fluentui/react";
import React from "react";

import { flex } from "@/Common/Styles/Flex";

const styles = mergeStyles({
  ...flex({
    alignItems: "center",
    justifyContent: "center",
  }),
  flexGrow: 1000,
});

export const PageLoading: React.FC = () => {
  return <Spinner size={SpinnerSize.large} className={styles} />;
};
