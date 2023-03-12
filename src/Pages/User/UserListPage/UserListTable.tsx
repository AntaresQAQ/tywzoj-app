import {
  DetailsListLayoutMode,
  IColumn,
  ProgressIndicator,
  SelectionMode,
  ShimmeredDetailsList,
  TooltipHost,
} from "@fluentui/react";
import * as React from "react";

import { registerSortDownIcon, registerSortUpIcon } from "@/Common/IconRegistration";
import { IUserEntityWithExtra } from "@/Common/ServerType/User";
import { useIsMiddleScreen, useIsMiniScreen, useIsSmallScreen } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { CE_SortBy } from "@/Pages/User/UserListPage/Types";

export interface IUserListTableProps {
  userList: IUserEntityWithExtra[];
  sortBy: CE_SortBy;
  setSortBy: (sortBy: CE_SortBy) => void;
  loading?: boolean;
  className?: string;
  onClickUser?: (user: IUserEntityWithExtra) => void;
}

interface IUserListColumn extends IColumn {
  key: keyof IUserEntityWithExtra | string;
  fieldName?: keyof IUserEntityWithExtra;
}

registerSortDownIcon();
registerSortUpIcon();

// This component has serious a11y bugs,
// but I don't have time to fix it,
// and will be fixed in the future
// TODO: rewrite this component
export const UserListTable: React.FC<IUserListTableProps> = props => {
  const { userList, sortBy, setSortBy, onClickUser, className, loading } = props;

  const isMiniScreen = useIsMiniScreen();
  const isSmallScreen = useIsSmallScreen();
  const isMiddleScreen = useIsMiddleScreen();

  const ls = useLocalizedStrings();

  const columns = React.useMemo((): IUserListColumn[] => {
    const cols: IUserListColumn[] = [
      {
        key: "username",
        name: ls.LS_COMMON_USERNAME_LABEL,
        fieldName: "username",
        minWidth: 60,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
      },
    ];

    if (!isMiniScreen) {
      cols.push({
        key: "nickname",
        name: ls.LS_COMMON_NICKNAME_LABEL,
        fieldName: "nickname",
        minWidth: 60,
        maxWidth: 120,
        isResizable: true,
      });
    }

    if (!isMiddleScreen) {
      cols.push({
        key: "information",
        name: ls.LS_COMMON_USER_INFO_LABEL,
        fieldName: "information",
        minWidth: 100,
        isResizable: true,
      });
    }

    cols.push(
      {
        key: "rating",
        name: ls.LS_COMMON_RATING_LABEL,
        fieldName: "rating",
        minWidth: 80,
        maxWidth: 100,
        isResizable: true,
        isSorted: sortBy === CE_SortBy.Rating,
        isSortedDescending: true,
        onColumnClick: () => {
          if (loading) return;
          if (sortBy === CE_SortBy.Rating) {
            setSortBy(CE_SortBy.Id);
          } else {
            setSortBy(CE_SortBy.Rating);
          }
        },
      },
      {
        key: "acceptedProblemCount",
        name: ls.LS_USER_LIST_AC_COUNT_LABEL,
        fieldName: "acceptedProblemCount",
        minWidth: 80,
        maxWidth: 100,
        isResizable: true,
        isSorted: sortBy === CE_SortBy.AcceptedProblemCount,
        isSortedDescending: true,
        onColumnClick: () => {
          if (loading) return;
          if (sortBy === CE_SortBy.AcceptedProblemCount) {
            setSortBy(CE_SortBy.Id);
          } else {
            setSortBy(CE_SortBy.AcceptedProblemCount);
          }
        },
      },
    );

    if (!isMiniScreen) {
      cols.push({
        key: "acceptedProblemRate",
        name: ls.LS_USER_LIST_AC_RATE_LABEL,
        minWidth: isSmallScreen ? 60 : 100,
        maxWidth: isSmallScreen ? 60 : 100,
        isResizable: true,
        onRender: (item: IUserEntityWithExtra) => {
          const percent = item.submissionCount && item.acceptedProblemCount / item.submissionCount;
          const percentText = `${(percent * 100).toFixed(2)}%`;

          if (isSmallScreen) {
            return percentText;
          } else {
            return (
              <TooltipHost content={percentText}>
                <ProgressIndicator ariaLabel={percentText} percentComplete={percent} />
              </TooltipHost>
            );
          }
        },
      });
    }

    return cols;
  }, [isMiddleScreen, isMiniScreen, isSmallScreen, loading, ls, setSortBy, sortBy]);

  const items = React.useMemo(() => userList.map(user => (loading ? null : user)), [loading, userList]);

  return (
    <ShimmeredDetailsList
      items={items}
      columns={columns}
      selectionMode={SelectionMode.none}
      layoutMode={DetailsListLayoutMode.justified}
      className={className}
      enableShimmer={loading && !userList.length}
      onActiveItemChanged={item => onClickUser && onClickUser(item)}
    />
  );
};
