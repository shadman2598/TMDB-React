import { useContext } from "react";
import { AppContext } from "./App";

export const useAppState = () => {
  const { state, dispatch } = useContext(AppContext);
  return [state, dispatch];
};