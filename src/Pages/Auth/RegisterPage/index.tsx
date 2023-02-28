import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";
import { useAppDispatch } from "@/Features/Store";
import { injectDynamicReducer } from "@/Features/Store/Helper";

import { initRegisterPageState } from "./Action";
import { registerPageReducer } from "./Reducer";
import { RegisterPage } from "./RegisterPage";

const configureStore = runOnce(() => {
  injectDynamicReducer({
    registerPage: registerPageReducer,
  });
});
configureStore();

const Wrapper: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(initRegisterPageState());
  }, [dispatch]);

  return <RegisterPage />;
};

export default Wrapper;
