import { Spinner, SpinnerSize, Toggle, useTheme } from "@fluentui/react";
import * as React from "react";

import { Label } from "@/Common/Components/Label";
import { Separator } from "@/Common/Components/Separator";
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
            {problemDetail.samples?.length && (
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
