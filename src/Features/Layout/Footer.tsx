import { format, Link, TooltipHost, useTheme } from "@fluentui/react";
import * as React from "react";

import { useMomentFormatter } from "@/Common/Hooks/Moment";
import { useRecaptchaCopyrightMessage } from "@/Common/Hooks/Recaptcha";
import { makeUrl } from "@/Common/Utilities/Url";
import { useIsSmallScreen } from "@/Features/Environment/Hooks";
import { getSiteName } from "@/Features/Environment/Selectors";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppSelector } from "@/Features/Store";

import { getFooterStyles } from "./Styles/FooterStyles";

export const AppFooter: React.FC = () => {
    const ls = useLocalizedStrings();
    const theme = useTheme();
    const isSmallScreen = useIsSmallScreen();
    const styles = getFooterStyles(theme);
    const siteName = useAppSelector(getSiteName);
    const version = useAppSelector((state) => state.version);
    const domainIcpRecord = useAppSelector((state) => state.env.domainIcpRecordInformation);
    const serverTimeDiff = useAppSelector((state) => state.env.serverTimeDiff);
    const recaptchaMessage = useRecaptchaCopyrightMessage(styles.recaptcha);
    const momentFormatter = useMomentFormatter();

    const [clientTime, setClientTime] = React.useState(Date.now());

    React.useEffect(() => {
        const inv = setInterval(() => setClientTime(Date.now()), 1000);
        return () => clearInterval(inv);
    }, []);

    return (
        <div className={styles.root}>
            <div
                className={styles.declaration}
                dangerouslySetInnerHTML={{ __html: format(ls.LS_APP_FOOTER_POWERED_BY, siteName) }}
            />
            <div className={styles.time}>
                <span>
                    {ls.LS_APP_FOOTER_SERVER_TIME_LABEL} {momentFormatter(clientTime - serverTimeDiff, "L LTS")}
                </span>
            </div>
            <div className={styles.version}>
                <TooltipHost content={momentFormatter(version.server.date, "lll")}>
                    <span>
                        {ls.LS_APP_FOOTER_SERVER_VERSION_LABEL} {version.server.hash}
                    </span>
                </TooltipHost>
                |
                <TooltipHost content={momentFormatter(version.client.date, "lll")}>
                    <span>
                        {ls.LS_APP_FOOTER_CLIENT_VERSION_LABEL} {version.client.hash}
                    </span>
                </TooltipHost>
            </div>
            {!isSmallScreen && recaptchaMessage}
            {domainIcpRecord && (
                <Link
                    className={styles.domainIcpRecord}
                    href={makeUrl({ origin: "beian.miit.gov.cn" })}
                    target="_blank"
                >
                    {domainIcpRecord}
                </Link>
            )}
        </div>
    );
};
