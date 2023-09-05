import { runOnce } from "@/Common/Utilities/Tools";
import { injectDynamicReducer } from "@/Features/Store/Helper";
import { problemFilePageReducer } from "@/Pages/Problem/ProblemFilePage/Reducer";

export const configureStore = runOnce(() => {
    injectDynamicReducer({
        problemFilePage: problemFilePageReducer,
    });
});
