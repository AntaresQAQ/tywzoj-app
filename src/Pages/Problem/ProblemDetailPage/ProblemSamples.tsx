import { format, Spinner, SpinnerSize, useTheme } from "@fluentui/react";
import * as React from "react";

import { Separator } from "@/Common/Components/Separator";
import { IProblemSampleEntity } from "@/Common/ServerType/ProblemSample";
import { loadCodeBox } from "@/Features/CodeBox/DynamicImport";
import { useIsMiddleScreen } from "@/Features/Environment/Hooks";
import { useLocalizedStrings } from "@/Features/LocalizedString/Hooks";

import { ProblemContentRenderer } from "./ProblemContentRenderer";
import { getProblemSamplesStyles } from "./Styles/ProblemSamplesStyles";

const CodeBoxLazy = React.lazy(loadCodeBox);

export interface IProblemSamplesProps {
    samples: IProblemSampleEntity[];
    boxContainerClassName: string;
    boxTitleClassName: string;
}

const SampleBox: React.FC<{ content: string }> = props => {
    return (
        <React.Suspense fallback={<Spinner size={SpinnerSize.large} />}>
            <CodeBoxLazy code={props.content} />
        </React.Suspense>
    );
};

export const ProblemSamples: React.FC<IProblemSamplesProps> = props => {
    const { samples, boxContainerClassName, boxTitleClassName } = props;

    const ls = useLocalizedStrings();
    const theme = useTheme();
    const isMiddleScreen = useIsMiddleScreen();
    const styles = getProblemSamplesStyles(isMiddleScreen);

    return (
        <>
            {samples.map((sample, index) => (
                <div key={sample.id} className={boxContainerClassName}>
                    <h3 className={boxTitleClassName}>{format(ls.LS_PROBLEM_DETAIL_SAMPLE_TITLE, index + 1)}</h3>
                    <Separator customLineColor={theme.palette.neutralTertiaryAlt} />
                    <div className={styles.inOrOutContainer}>
                        {sample.input && (
                            <div className={styles.inOrOut}>
                                <h4 className={styles.title}>{ls.LS_PROBLEM_DETAIL_SAMPLE_INPUT}</h4>
                                <SampleBox content={sample.input} />
                            </div>
                        )}
                        {sample.output && (
                            <div className={styles.inOrOut}>
                                <h4 className={styles.title}>{ls.LS_PROBLEM_DETAIL_SAMPLE_OUTPUT}</h4>
                                <SampleBox content={sample.output} />
                            </div>
                        )}
                    </div>
                    {sample.explanation && (
                        <div className={styles.exp}>
                            <h4 className={styles.title}>{ls.LS_PROBLEM_DETAIL_SAMPLE_EXP}</h4>
                            <ProblemContentRenderer content={sample.explanation} />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};
