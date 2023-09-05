import { runOnce } from "@/Common/Utilities/Tools";
import { injectDynamicReducer } from "@/Features/Store/Helper";
import { problemDetailPageReducer } from "@/Pages/Problem/ProblemDetailPage/Reducer";

export const configureStore = runOnce(() => {
    injectDynamicReducer({
        problemDetailPage: problemDetailPageReducer,
    });
});
