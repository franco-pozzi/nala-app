import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "../../components/Toast/functions";

const useToastShared = () => {
  // hooks of location and location states
  const location = useLocation();
  const history = useHistory();

  // Use for share toasts between views
  useEffect(() => {
    const toastData = location.state?.toast;
    if (toastData) {
      toast(toastData.type, toastData.content);
      history.replace("", null);
    }
  }, [location, history]);

  return {
    location,
  };
};

export default useToastShared;
