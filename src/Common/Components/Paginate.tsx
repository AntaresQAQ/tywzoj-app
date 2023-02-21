import {
  ContextualMenu,
  format,
  Icon,
  IContextualMenuItem,
  IContextualMenuStyleProps,
  IContextualMenuStyles,
  IStyleFunctionOrObject,
  ITheme,
  memoizeFunction,
  mergeStyles,
  mergeStyleSets,
  TooltipHost,
  useTheme,
} from "@fluentui/react";
import { useEventCallback, useId } from "@fluentui/react-hooks";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { CE_Page } from "@/Common/Enums/PagePath";
import { CE_QueryKey } from "@/Common/Enums/QueryKeys";
import { registerChevronLeftIcon, registerChevronRightIcon, registerMoreIcon } from "@/Common/IconRegistration";
import { commonAnchorStyle } from "@/Common/Styles/Anchor";
import { flex } from "@/Common/Styles/Flex";
import { range } from "@/Common/Utilities/Math";
import { makeUrl } from "@/Common/Utilities/Url";
import { useIsMiddleScreen, useIsMiniScreen, useIsSmallScreen } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useQuery } from "@/Features/Router/Hooks";
import { getHash, getPath, getQueries } from "@/Features/Router/Selectors";
import { useAppSelector } from "@/Features/Store";

const chevronLeftIcon = registerChevronLeftIcon();
const chevronRightIcon = registerChevronRightIcon();
const moreIcon = registerMoreIcon();

const getPageButtonStyles = memoizeFunction((theme: ITheme, isActive: boolean) =>
  mergeStyles({
    width: 36,
    height: 36,
    color: isActive ? theme.palette.white : theme.palette.neutralPrimary,
    backgroundColor: isActive ? theme.palette.themeSecondary : theme.palette.white,
    border: "unset",
    cursor: "pointer",
    ":hover": {
      ...(!isActive && { backgroundColor: theme.palette.themeLighter }),
    },
    ":disabled": {
      cursor: "default",
      ...(!isActive && {
        color: theme.palette.neutralTertiaryAlt,
        backgroundColor: theme.palette.white,
      }),
    },
  }),
);

export const getMoreStyles = memoizeFunction((theme: ITheme, disabled?: boolean) =>
  mergeStyleSets({
    linkButton: {
      ...commonAnchorStyle,
    },
    icon: {
      ...flex({
        alignItems: "center",
        justifyContent: "center",
      }),
      color: disabled ? theme.palette.neutralTertiaryAlt : theme.palette.neutralPrimary,
      fontSize: 18,
      width: 36,
      height: 36,
      cursor: disabled ? "default" : "pointer",
    },
  }),
);

const pageStyle = mergeStyles({ ...flex({}) });

const PageButton: React.FC<{
  children: React.ReactElement | number | string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  tooltip?: string;
}> = props => {
  const { children, isActive = false, disabled = false, ariaLabel, tooltip, onClick } = props;
  const tooltipId = useId();
  const theme = useTheme();
  const style = getPageButtonStyles(theme, isActive);

  const onButtonClick = useEventCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick();
    e.preventDefault();
  });

  const inner = React.useMemo(
    () => (
      <button
        className={style}
        onClick={onButtonClick}
        disabled={isActive || disabled}
        aria-label={ariaLabel}
        aria-describedby={tooltip && !disabled ? tooltipId : undefined}
      >
        {children}
      </button>
    ),
    [ariaLabel, children, disabled, isActive, onButtonClick, style, tooltip, tooltipId],
  );

  return tooltip && !disabled ? (
    <TooltipHost content={tooltip} id={tooltipId}>
      {inner}
    </TooltipHost>
  ) : (
    inner
  );
};

const MoreButton: React.FC<{
  start: number;
  end: number;
  onPageClick: (p: number) => void;
  disabled?: boolean;
}> = props => {
  const { start, end, onPageClick, disabled } = props;
  const ls = useLocalizedStrings();
  const tooltipId = useId();

  const theme = useTheme();
  const styles = getMoreStyles(theme, disabled);

  const ref = React.useRef<HTMLAnchorElement>(null);
  const [show, setShow] = React.useState(false);

  const items = React.useMemo<IContextualMenuItem[]>(() => {
    return range(start, end + 1).map(p => ({
      key: p.toString(),
      text: p.toString(),
      onClick: () => onPageClick(p),
      ariaLabel: format(ls.LS_COMMON_PAGINATE_PAGE_BTN_LABEL, p),
    }));
  }, [end, ls, onPageClick, start]);

  const onMoreClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      disabled || setShow(s => !s);
    },
    [disabled],
  );

  const menuStyles: IStyleFunctionOrObject<IContextualMenuStyleProps, IContextualMenuStyles> = {
    container: {
      minWidth: 60,
      maxHeight: 300,
    },
    list: {
      minWidth: 60,
    },
    root: {
      minWidth: 60,
    },
  };

  return (
    <TooltipHost content={ls.LS_COMMON_PAGINATE_MORE_BTN_TIP} id={tooltipId}>
      <a
        className={styles.linkButton}
        tabIndex={0}
        onClick={onMoreClick}
        href={"#"}
        ref={ref}
        aria-label={ls.LS_COMMON_PAGINATE_MORE_BTN_TIP}
        aria-describedby={tooltipId}
      >
        <Icon className={styles.icon} iconName={moreIcon} />
        <ContextualMenu
          items={items}
          hidden={!show}
          onDismiss={() => setShow(false)}
          onItemClick={() => setShow(false)}
          target={ref}
          styles={menuStyles}
          isBeakVisible={true}
        />
      </a>
    </TooltipHost>
  );
};

export interface IPaginateProps {
  count: number;
  takeCount: number;
  tiny?: boolean;
  disabled?: boolean;
}

export const Paginate: React.FC<IPaginateProps> = props => {
  const { count: itemCount = 0, takeCount = 1, tiny = false, disabled = false } = props;

  const isMiniScreen = useIsMiniScreen();
  const isSmallScreen = useIsSmallScreen();
  const isMiddleScreen = useIsMiddleScreen();
  const path = useAppSelector(getPath);
  const queries = useAppSelector(getQueries);
  const hash = useAppSelector(getHash);
  const navigate = useNavigate();
  const queryPage = useQuery<number>(CE_QueryKey.Page);
  const ls = useLocalizedStrings();

  const currentPage = Number.isInteger(queryPage) ? queryPage : 1;
  const showPage = itemCount > takeCount;
  const pageCount = Math.ceil(itemCount / takeCount) || 1;
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pageCount;

  const buttonCount = React.useMemo(() => {
    if (isMiniScreen) {
      return 1;
    } else if (isSmallScreen) {
      return 6;
    } else if (isMiddleScreen) {
      return 11;
    } else {
      return 15;
    }
  }, [isMiddleScreen, isMiniScreen, isSmallScreen]);

  const gotoPage = React.useCallback(
    (p: number) => {
      const url = makeUrl({
        page: path as CE_Page,
        queries: {
          ...queries,
          [CE_QueryKey.Page]: p,
        },
        hash,
      });
      navigate(url);
    },
    [hash, navigate, path, queries],
  );

  const { leftCount, rightCount, omitLeft, omitRight } = React.useMemo(() => {
    let omitLeft = false;
    let omitRight = false;
    let leftCount = currentPage - 2;
    let rightCount = pageCount - currentPage;

    if (leftCount + rightCount > buttonCount + 1) {
      if (leftCount <= Math.floor(buttonCount / 2)) {
        rightCount = buttonCount - leftCount + 1;
        omitRight = true;
      } else if (rightCount <= Math.ceil(buttonCount / 2)) {
        leftCount = buttonCount - rightCount + 1;
        omitLeft = true;
      } else {
        rightCount = Math.floor(buttonCount / 2) + 1;
        leftCount = buttonCount - rightCount;
        omitLeft = omitRight = true;
      }
    }

    return {
      leftCount,
      rightCount,
      omitLeft,
      omitRight,
    };
  }, [buttonCount, currentPage, pageCount]);

  React.useEffect(() => {
    if (currentPage <= 0) {
      gotoPage(1);
    }
    if (currentPage > pageCount) {
      gotoPage(pageCount);
    }
  }, [currentPage, gotoPage, pageCount]);

  return (
    showPage && (
      <div className={pageStyle}>
        <PageButton
          onClick={() => gotoPage(currentPage - 1)}
          disabled={isFirstPage || disabled}
          ariaLabel={ls.LS_COMMON_PAGINATE_PRE_BTN_TIP}
          tooltip={ls.LS_COMMON_PAGINATE_PRE_BTN_TIP}
        >
          <Icon iconName={chevronLeftIcon} />
        </PageButton>
        {!tiny && (
          <>
            <PageButton onClick={() => gotoPage(1)} isActive={isFirstPage} disabled={disabled}>
              1
            </PageButton>
            {omitLeft && (
              <MoreButton start={2} end={currentPage - leftCount - 1} onPageClick={gotoPage} disabled={disabled} />
            )}
            {range(currentPage - leftCount, currentPage + rightCount, 1).map(p => (
              <PageButton
                onClick={() => gotoPage(p)}
                isActive={p === currentPage}
                disabled={disabled}
                key={p}
                ariaLabel={format(
                  p === currentPage ? ls.LS_COMMON_PAGINATE_ACTIVE_BTN_LABEL : ls.LS_COMMON_PAGINATE_PAGE_BTN_LABEL,
                  p,
                )}
              >
                {p}
              </PageButton>
            ))}
            {omitRight && (
              <MoreButton
                start={currentPage + rightCount}
                end={pageCount - 1}
                onPageClick={gotoPage}
                disabled={disabled}
              />
            )}
            <PageButton onClick={() => gotoPage(pageCount)} isActive={isLastPage} disabled={disabled}>
              {pageCount}
            </PageButton>
          </>
        )}
        <PageButton
          onClick={() => gotoPage(currentPage + 1)}
          disabled={isLastPage || disabled}
          ariaLabel={ls.LS_COMMON_PAGINATE_NXT_BTN_TIP}
          tooltip={ls.LS_COMMON_PAGINATE_NXT_BTN_TIP}
        >
          <Icon iconName={chevronRightIcon} />
        </PageButton>
      </div>
    )
  );
};
