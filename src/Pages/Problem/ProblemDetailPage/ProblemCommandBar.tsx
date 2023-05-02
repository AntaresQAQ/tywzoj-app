import { CommandBar, ICommandBarItemProps } from "@fluentui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { CE_Page } from "@/Common/Enums/PagePath";
import {
  registerCommentIcon,
  registerFolderHorizontalIcon,
  registerMoreIcon,
  registerSendIcon,
  registerTaskListIcon,
} from "@/Common/IconRegistration";
import { makeUrl } from "@/Common/Utilities/Url";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppSelector } from "@/Features/Store";

import { getProblemDetail } from "./Selectors";

const commentIcon = registerCommentIcon();
const folderHorizontalIcon = registerFolderHorizontalIcon();
registerMoreIcon();
const sendIcon = registerSendIcon();
const taskListIcon = registerTaskListIcon();

export const ProblemCommandBar: React.FC = () => {
  const navigate = useNavigate();
  const problemDetail = useAppSelector(getProblemDetail);
  const ls = useLocalizedStrings();

  const commands = React.useMemo(
    (): ICommandBarItemProps[] => [
      {
        key: "submit",
        text: ls.LS_PROBLEM_DETAIL_SUBMIT_BUTTON_LABEL,
        iconProps: { iconName: sendIcon },
      },
      {
        key: "submission",
        text: ls.LS_APP_NAV_PAGE_NAME_SUBMISSION_PAGE,
        iconProps: { iconName: taskListIcon },
      },
      {
        key: "file",
        text: ls.LS_PROBLEM_DETAIL_FILE_BUTTON_LABEL,
        iconProps: { iconName: folderHorizontalIcon },
        onClick: () => {
          navigate(makeUrl({ page: CE_Page.ProblemFile, params: { id: problemDetail.id } }));
        },
      },
      {
        key: "discussion",
        text: ls.LS_APP_NAV_PAGE_NAME_DISCUSSION_PAGE,
        iconProps: { iconName: commentIcon },
      },
    ],
    [ls, navigate, problemDetail],
  );

  return <CommandBar items={commands} styles={{ root: { padding: 0 } }} />;
};
