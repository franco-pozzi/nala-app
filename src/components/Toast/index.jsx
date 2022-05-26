import React from "react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import config from "./config";
import "react-toastify/dist/ReactToastify.css";

const Toast = (props) => {
  const { position } = props;
  return (
    <div data-testid={ "toast-component" }>
      <ToastContainer
        toastClassName={ config.customClass }
        position={ position }
        autoClose={ config.autoClose }
        hideProgressBar={ config.hideProgressBar }
        newestOnTop={ config.newestOnTop }
        closeOnClick
        rtl={ config.rtl }
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

Toast.propTypes = {
  position: PropTypes.string,
};

Toast.defaultProps = {
  position: "top-right",
};

export default Toast;
