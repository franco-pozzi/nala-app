import { useState } from "react"

const useComplexState = (initialState) => {
  const finalInitialState = typeof initialState === "object"
    ? JSON.parse(JSON.stringify(initialState))
    : {};
  const [state, setStateInternal] = useState(finalInitialState);
  const setState = (newKeys) => {
    setStateInternal((updatedState) => ({ ...updatedState, ...newKeys }));
  };
  return [state, setState];
};

export default useComplexState;
