import * as React from "react";

import { runOnce } from "@/Common/Utilities/Tools";
import { useAppDispatch } from "@/Features/Store";
import { injectDynamicReducer } from "@/Features/Store/Helper";

import { initLoginPageState } from "./Action";
import { LoginPage } from "./LoginPage";
import { loginPageReducer } from "./Reducer";

const configureStore = runOnce(() => {
  injectDynamicReducer({ loginPage: loginPageReducer });
});
configureStore();

const Wrapper: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(initLoginPageState);
  }, [dispatch]);

  return <LoginPage />;
};

export default Wrapper;
