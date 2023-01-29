import { useTheme } from "@fluentui/react";
import * as React from "react";

import { getHeaderStyles } from "@/Common/Layout/Styles/HeaderStyles";

export const AppHeader: React.FC = () => {
  const theme = useTheme();
  const styles = getHeaderStyles(theme);

  return <div className={styles.root}></div>;
};
