import {
  ContextualMenu,
  Icon,
  IContextualMenuItem,
  IContextualMenuStyleProps,
  IContextualMenuStyles,
  IStyleFunctionOrObject,
  ITheme,
  memoizeFunction,
  mergeStyles,
  mergeStyleSets,
  useTheme,
} from "@fluentui/react";
import { useEventCallback } from "@fluentui/react-hooks";
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

export const moreStyles = mergeStyleSets({
  linkButton: {
    ...commonAnchorStyle,
  },
  icon: {
    ...flex({
      alignItems: "center",
      justifyContent: "center",
    }),
    fontSize: 16,
    width: 36,
    height: 36,
    cursor: "pointer",
  },
});

const pageStyle = mergeStyles({ ...flex({}) });

const PageButton: React.FC<{
  children: React.ReactElement | number | string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}> = props => {
  const { children, isActive = false, disabled = false, onClick } = props;
  const theme = useTheme();
  const style = getPageButtonStyles(theme, isActive);

  const onButtonClick = useEventCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick();
    e.preventDefault();
  });

  return (
    <button className={style} onClick={onButtonClick} disabled={isActive || disabled}>
      {children}
    </button>
  );
};

const MoreButton: React.FC<{
  start: number;
  end: number;
  onPageClick: (p: number) => void;
}> = props => {
  const { start, end, onPageClick } = props;

  const ref = React.useRef<HTMLAnchorElement>(null);
  const [show, setShow] = React.useState(false);
  const items = React.useMemo<IContextualMenuItem[]>(() => {
    return range(start, end + 1).map(p => ({
      key: p.toString(),
      text: p.toString(),
      onClick: () => onPageClick(p),
    }));
  }, [end, onPageClick, start]);
  const onMoreClick = useEventCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShow(s => !s);
  });

  const menuStyles: IStyleFunctionOrObject<IContextualMenuStyleProps, IContextualMenuStyles> = {
    container: {
      maxWidth: 100,
      maxHeight: 300,
    },
  };

  return (
    <a className={moreStyles.linkButton} tabIndex={0} onClick={onMoreClick} href={"#"} ref={ref}>
      <Icon className={moreStyles.icon} iconName={moreIcon} />
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
  );
};

export interface IPaginateProps {
  count: number;
  takeCount: number;
  tiny?: boolean;
}

export const Paginate: React.FC<IPaginateProps> = props => {
  const { count: itemCount = 0, takeCount = 1, tiny = false } = props;

  const isMiniScreen = useIsMiniScreen();
  const isSmallScreen = useIsSmallScreen();
  const isMiddleScreen = useIsMiddleScreen();
  const path = useAppSelector(getPath);
  const queries = useAppSelector(getQueries);
  const hash = useAppSelector(getHash);
  const navigate = useNavigate();
  const queryPage = useQuery<number>(CE_QueryKey.Page);

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
        <PageButton onClick={() => gotoPage(currentPage - 1)} disabled={isFirstPage}>
          <Icon iconName={chevronLeftIcon} />
        </PageButton>
        {!tiny && (
          <>
            <PageButton onClick={() => gotoPage(1)} isActive={isFirstPage}>
              1
            </PageButton>
            {omitLeft && <MoreButton start={2} end={currentPage - leftCount - 1} onPageClick={gotoPage} />}
            {range(currentPage - leftCount, currentPage + rightCount, 1).map(p => (
              <PageButton onClick={() => gotoPage(p)} isActive={p === currentPage} key={p}>
                {p}
              </PageButton>
            ))}
            {omitRight && <MoreButton start={currentPage + rightCount} end={pageCount - 1} onPageClick={gotoPage} />}
            <PageButton onClick={() => gotoPage(pageCount)} isActive={isLastPage}>
              {pageCount}
            </PageButton>
          </>
        )}
        <PageButton onClick={() => gotoPage(currentPage + 1)} disabled={isLastPage}>
          <Icon iconName={chevronRightIcon} />
        </PageButton>
      </div>
    )
  );
};
