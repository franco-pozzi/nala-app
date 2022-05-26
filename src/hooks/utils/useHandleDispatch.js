import { useEffect } from "react";

const useHandleDispatch = (element, setter) => {
  useEffect(() => {
    setter(false);
  }, [element, setter]);
};

export default useHandleDispatch;
