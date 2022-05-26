import { useHistory } from "react-router-dom";

export const useRedirect = () => {
  const history = useHistory();

  /**
   * function that provide an easy way to change the url, path, state between components
   * @param path
   * @param onlyReplace
   * @param cleanStack
   * @param search
   * @param state
   */
  const redirectTo = (path, {
    onlyReplace = false,
    cleanStack = true,
    search,
    state,
  }) => {
    // The regular process
    if (!cleanStack) {
      history.push({
        pathname: path,
        search,
        state,
      });
      return;
    }

    // When we need change only the path in url but without refresh the page
    history.replace(path, {});
    if (onlyReplace) {
      return;
    }

    // If we need clear the stack of before view pages
    history.go(0);
  };

  return {
    redirectTo,
  };
};

export default useRedirect;
