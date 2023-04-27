import { Spinner, SpinnerSize, Toggle, useTheme } from "@fluentui/react";
import * as React from "react";

import { FluentRouterLink } from "@/Common/Components/FluentLink";
import { Label } from "@/Common/Components/Label";
import { Separator } from "@/Common/Components/Separator";
import { CE_Page } from "@/Common/Enums/PagePath";
import { useMomentFormatter } from "@/Common/Hooks/Moment";
import { useProblemTypeText } from "@/Common/Hooks/ProblemType";
import { CE_ProblemScope, CE_ProblemType } from "@/Common/ServerType/Problem";
import { makeUrl } from "@/Common/Utilities/Url";
import { setPageName } from "@/Features/Environment/Action";
import { useIsMiddleScreen, useIsSmallScreen } from "@/Features/Environment/Hooks";
import { getShowTagsOnProblemDetail } from "@/Features/Environment/Selectors";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";
import { useAppDispatch, useAppSelector } from "@/Features/Store";

import { fetchProblemTagsAction, setProblemDetailPage } from "./Action";
import { ProblemContentRenderer } from "./ProblemContentRenderer";
import { ProblemSamples } from "./ProblemSamples";
import { getProblemDetail, getShowTags } from "./Selectors";
import { getProblemDetailPageStyles } from "./Styles/ProblemDetailPageStyles";

export const ProblemDetailPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const isMiddleScreen = useIsMiddleScreen();
  const isSmallScreen = useIsSmallScreen();

  const styles = getProblemDetailPageStyles(theme, isMiddleScreen, isSmallScreen);
  const ls = useLocalizedStrings();

  const problemDetail = useAppSelector(getProblemDetail);
  const showTagsComponent = useAppSelector(getShowTags);
  const showTagsEnv = useAppSelector(getShowTagsOnProblemDetail);
  const showTags = showTagsComponent ?? showTagsEnv;
  const problemTypeText = useProblemTypeText();
  const momentFormatter = useMomentFormatter();

  const [fetchingTags, setFetchingTags] = React.useState(false);
  const onshowTagButtonChange = React.useCallback(
    (e: unknown, checked: boolean) => {
      dispatch(
        setProblemDetailPage({
          showTags: checked,
        }),
      );
      setFetchingTags(true);
      dispatch(fetchProblemTagsAction()).finally(() => setFetchingTags(false));
    },
    [dispatch],
  );

  const title = problemDetail.displayId ? `#${problemDetail.displayId} ${problemDetail.title}` : problemDetail.title;

  React.useEffect(() => {
    dispatch(setPageName(title));
  }, [dispatch, title]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{title}</h1>
          {!problemDetail.isPublic && problemDetail.scope === CE_ProblemScope.Global && (
            <Label backgroundColor={theme.palette.red}>{ls.LS_PROBLEM_NOT_PUBLIC_LABEL}</Label>
          )}
        </div>
        <Separator customLineColor={theme.palette.neutralTertiaryAlt} />
        <div className={styles.body}>
          <div className={styles.bodyLeft}>
            {problemDetail.description && (
              <div className={styles.boxContainer}>
                <h3 className={styles.boxTitle}>{ls.LS_PROBLEM_DETAIL_DESCRIPTION}</h3>
                <Separator customLineColor={theme.palette.neutralTertiaryAlt} />
                <ProblemContentRenderer content={problemDetail.description} />
              </div>
            )}
            {problemDetail.inputFormat && (
              <div className={styles.boxContainer}>
                <h3 className={styles.boxTitle}>{ls.LS_PROBLEM_DETAIL_INPUT_FORMAT}</h3>
                <Separator customLineColor={theme.palette.neutralTertiaryAlt} />
                <ProblemContentRenderer content={problemDetail.inputFormat} />
              </div>
            )}
            {problemDetail.outputFormat && (
              <div className={styles.boxContainer}>
                <h3 className={styles.boxTitle}>{ls.LS_PROBLEM_DETAIL_OUTPUT_FORMAT}</h3>
                <Separator customLineColor={theme.palette.neutralTertiaryAlt} />
                <ProblemContentRenderer content={problemDetail.outputFormat} />
              </div>
            )}
            {problemDetail.samples && problemDetail.samples.length > 0 && (
              <ProblemSamples
                samples={problemDetail.samples}
                boxContainerClassName={styles.boxContainer}
                boxTitleClassName={styles.boxTitle}
              />
            )}
            {problemDetail.limitAndHint && (
              <div className={styles.boxContainer}>
                <h3 className={styles.boxTitle}>{ls.LS_PROBLEM_DETAIL_LIMIT_AND_HINT}</h3>
                <Separator customLineColor={theme.palette.neutralTertiaryAlt} />
                <ProblemContentRenderer content={problemDetail.limitAndHint} />
              </div>
            )}
          </div>
          <div className={styles.bodyRight}>
            <div className={styles.boxContainer}>
              <h3 className={styles.boxTitle}>{ls.LS_PROBLEM_DETAIL_PROBLEM_INFO_TITLE}</h3>
              <Separator customLineColor={theme.palette.neutralTertiaryAlt} />
              <div className={styles.infoContainer}>
                <div>
                  <span>{ls.LS_PROBLEM_DETAIL_PROBLEM_TYPE_LABEL}</span> {problemTypeText(problemDetail.type)}
                </div>
                {problemDetail.judgeInfo && (
                  <>
                    {problemDetail.type !== CE_ProblemType.SubmitAnswer && (
                      <>
                        <div>
                          <span>{ls.LS_PROBLEM_DETAIL_TIME_LIMIT_LABEL}</span> {problemDetail.judgeInfo.timeLimit}ms
                        </div>
                        <div>
                          <span>{ls.LS_PROBLEM_DETAIL_MEMORY_LIMIT_LABEL}</span> {problemDetail.judgeInfo.memoryLimit}
                          MiB
                        </div>
                        <div>
                          <span>{ls.LS_PROBLEM_DETAIL_IO_LABEL}</span>{" "}
                          {problemDetail.judgeInfo.fileIO && problemDetail.type !== CE_ProblemType.Interaction
                            ? ls.LS_PROBLEM_DETAIL_IO_FILE_TEXT
                            : ls.LS_PROBLEM_DETAIL_IO_STD_TEXT}
                        </div>
                      </>
                    )}

                    {problemDetail.type === CE_ProblemType.Traditional && problemDetail.judgeInfo.fileIO && (
                      <>
                        <div>
                          <span>{ls.LS_PROBLEM_DETAIL_INPUT_FILE_LABEL}</span> {problemDetail.judgeInfo.inputFile}
                        </div>
                        <div>
                          <span>{ls.LS_PROBLEM_DETAIL_OUTPUT_FILE_LABEL}</span> {problemDetail.judgeInfo.outputFile}
                        </div>
                      </>
                    )}
                  </>
                )}
                {problemDetail.owner && (
                  <div>
                    <span>{ls.LS_PROBLEM_DETAIL_OWNER_LABEL}</span>{" "}
                    <FluentRouterLink
                      to={makeUrl({ page: CE_Page.UserDetail, params: { id: problemDetail.owner.id } })}
                    >
                      {problemDetail.owner.username}
                    </FluentRouterLink>
                  </div>
                )}
                {problemDetail.isPublic && problemDetail.publicTime && (
                  <div>
                    <span>{ls.LS_PROBLEM_PUBLIC_TIME_LABEL}</span> {momentFormatter(problemDetail.publicTime, "lll")}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.boxContainer}>
              <div className={styles.boxTitleWithSwitch}>
                <h3 className={styles.boxTitle}>{ls.LS_PROBLEM_DETAIL_TAG_TITLE}</h3>
                <Toggle
                  className={styles.showTagsSwitch}
                  label={ls.LS_PROBLEM_DETAIL_TAG_SWITCH}
                  checked={showTags}
                  disabled={fetchingTags}
                  onChange={onshowTagButtonChange}
                  inlineLabel={true}
                />
              </div>
              {showTags && (
                <>
                  <Separator customLineColor={theme.palette.neutralTertiaryAlt} />
                  {fetchingTags ? (
                    <Spinner size={SpinnerSize.large} />
                  ) : (
                    <div className={styles.tagsContainer}>
                      {problemDetail.tags?.length
                        ? problemDetail.tags.map(tag => (
                            <Label
                              key={tag.id}
                              backgroundColor={tag.type?.color || "#000"}
                              borderColor={tag.type?.color || theme.palette.black}
                            >
                              {tag.name}
                            </Label>
                          ))
                        : ls.LS_PROBLEM_DETAIL_NO_TAGS_TEXT}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
