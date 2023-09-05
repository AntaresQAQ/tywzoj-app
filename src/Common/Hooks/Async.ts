/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { v4 as uuidV4 } from "uuid";

import { PromiseInnerType } from "@/Common/Utilities/Types";

export const useAsyncFunctionResult = <F extends (...args: any[]) => Promise<any>>(
    f: F,
    args: Parameters<F>,
    dependencies?: any[],
) => {
    type Result = PromiseInnerType<ReturnType<F>>;

    const refCurrentRenderingProcessId = React.useRef(null);

    function invoke(onResult: (result: Result) => void, onPending: () => void) {
        const renderingProcessId = uuidV4();
        refCurrentRenderingProcessId.current = renderingProcessId;

        let finished = false;
        f(...args).then(result => {
            finished = true;
            if (refCurrentRenderingProcessId.current === renderingProcessId) {
                onResult(result);
            }
        });

        if (!finished) {
            // async
            onPending();
        }
    }

    // Advance first invoke to first render, not first effect run
    const refFirstInvokeResult = React.useRef<Result>(null);
    const refFirstInvokePending = React.useRef<boolean>(false);
    if (refCurrentRenderingProcessId.current == null) {
        invoke(
            r => {
                if (refFirstInvokePending.current) {
                    // First invoke async
                    setResult(r);
                    setPending(false);
                } else {
                    // First invoke sync
                    refFirstInvokeResult.current = r;
                }
            },
            () => (refFirstInvokePending.current = true),
        );
    }
    const [result, setResult] = React.useState(refFirstInvokeResult.current);
    const [pending, setPending] = React.useState(refFirstInvokePending.current);

    // Invocations due to dependencies change
    const refEffectFirstRun = React.useRef(false);
    React.useEffect(() => {
        if (!refEffectFirstRun.current) {
            refEffectFirstRun.current = true;
            return;
        }

        invoke(
            r => {
                setResult(r);
                setPending(false);
            },
            () => setPending(true),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies || args);

    return [result, pending] as const;
};
