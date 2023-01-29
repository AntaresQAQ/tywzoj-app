import { format, Link, useTheme } from "@fluentui/react";
import React from "react";

import { getSiteName } from "@/Common/Environment/Selectors";
import { useMomentFormatter } from "@/Common/Hooks/Moment";
import { getFooterStyles } from "@/Common/Layout/Styles/FooterStyles";
import { useLocalizedStrings } from "@/Common/LocalizedString/Hooks";
import { useAppSelector } from "@/Store";

export const AppFooter: React.FC = () => {
  const ls = useLocalizedStrings();
  const theme = useTheme();
  const styles = getFooterStyles(theme);
  const siteName = useAppSelector(getSiteName);
  const version = useAppSelector(state => state.version);
  const domainIcpRecord = useAppSelector(state => state.env.domainIcpRecordInformation);
  const serverTimeDiff = useAppSelector(state => state.env.serverTimeDiff);
  const momentFormatter = useMomentFormatter();

  const [clientTime, setClientTime] = React.useState(Date.now());

  React.useEffect(() => {
    const inv = setInterval(() => setClientTime(Date.now()), 1000);
    return () => clearInterval(inv);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.declaration}>{format(ls.LS_APP_FOOTER_POWERED_BY, siteName)}</div>
      <div className={styles.version}>
        <span>
          {ls.LS_APP_FOOTER_SERVER_VERSION_LABEL} {version.server.hash}
        </span>
        |
        <span>
          {ls.LS_APP_FOOTER_CLIENT_VERSION_LABEL} {version.client.hash}
        </span>
      </div>
      <div className={styles.time}>
        <span>
          {ls.LS_APP_FOOTER_SERVER_TIME_LABEL} {momentFormatter(clientTime - serverTimeDiff, "L LTS")}
        </span>
      </div>
      {domainIcpRecord && (
        <div>
          <Link href={"https://beian.miit.gov.cn"}>{domainIcpRecord}</Link>
        </div>
      )}
    </div>
  );
};
