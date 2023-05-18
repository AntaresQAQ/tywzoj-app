import { useTheme } from "@fluentui/react";
import * as React from "react";

import { ButtonAnchor } from "@/Common/Components/ButtonAnchor";
import { CE_Page } from "@/Common/Enums/PagePath";
import { CE_ProblemFileType, IProblemFileEntityWithExtra } from "@/Common/ServerType/ProblemFile";
import { makeUrl } from "@/Common/Utilities/Url";
import { setPageName } from "@/Features/Environment/Action";
import { useIsMiddleScreen } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAllowedManageProblem } from "@/Features/Permission/Hooks/Problem";
import { useAppDispatch, useAppSelector } from "@/Features/Store";

import { getProblemDetail } from "../ProblemDetailPage/Selectors";
import { ProblemFileList } from "./ProblemFileList";
import { getProblemAdditionalFiles, getProblemTestDataFiles } from "./Selectors";
import { getProblemFilePageStyle } from "./Styles/ProblemFilePageStyles";

export const ProblemFilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMiddleScreen = useIsMiddleScreen();

  const styles = getProblemFilePageStyle(theme, isMiddleScreen);

  const ls = useLocalizedStrings();
  const problemDetail = useAppSelector(getProblemDetail);
  const testDataFiles = useAppSelector(getProblemTestDataFiles);
  const additionalFiles = useAppSelector(getProblemAdditionalFiles);
  const showTestData = useAllowedManageProblem(problemDetail);

  const title = problemDetail.displayId
    ? `${ls.LS_PROBLEM_FILE_PAGE_TITLE} - #${problemDetail.displayId} ${problemDetail.title}`
    : `${ls.LS_PROBLEM_FILE_PAGE_TITLE} - ${problemDetail.title}`;

  React.useEffect(() => {
    dispatch(setPageName(title));
  }, [dispatch, title]);

  const deleteFiles = React.useCallback((fileType: CE_ProblemFileType, files: IProblemFileEntityWithExtra[]) => {
    // TODO: delete files
  }, []);
  const downloadFiles = React.useCallback((files: IProblemFileEntityWithExtra[]) => {
    // TODO: download files
  }, []);
  const uploadFiles = React.useCallback((fileType: CE_ProblemFileType) => {
    // TODO: upload files
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <ButtonAnchor
            primary={true}
            href={makeUrl({
              page: problemDetail.displayId ? CE_Page.ProblemDetail : CE_Page.ProblemDetailById,
              params: {
                displayId: problemDetail.displayId,
                id: problemDetail.id,
              },
            })}
          >
            {"Back to problem"}
          </ButtonAnchor>
        </div>
        <div className={styles.body}>
          {showTestData && (
            <div className={styles.boxContainer}>
              <h2>Test Data</h2>
              <ProblemFileList
                files={testDataFiles}
                onDownload={downloadFiles}
                onDelete={files => deleteFiles(CE_ProblemFileType.TestData, files)}
                onUpload={() => uploadFiles(CE_ProblemFileType.TestData)}
              />
            </div>
          )}
          <div className={styles.boxContainer}>
            <h2>Additional File</h2>
            <ProblemFileList
              files={additionalFiles}
              onDownload={downloadFiles}
              onDelete={files => deleteFiles(CE_ProblemFileType.AdditionalFile, files)}
              onUpload={() => uploadFiles(CE_ProblemFileType.AdditionalFile)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
