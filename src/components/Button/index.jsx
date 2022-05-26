import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { StyledButton } from "./styles";

const Button = (props) => {
  const {
    id,
    variant,
    component,
    onClick,
    isDisabled,
    type,
    size,
    isFullWidth,
    children,
    isLoading,
    icon,
    iconSide,
    typeStyle,
    customStyle,
    className,
    href,
    onBlur,
  } = props;
  const handleClick = (event) => onClick(event);

  const render = icon ? (
    <div className={ "buttonIconContainer" }>
      <div className={ iconSide } >
        { icon }
      </div>
      {children}
    </div>
  ) : (
    children
  );

  if (isLoading) {
    return <CircularProgress size={ 30 } />;
  }

  return (
    <StyledButton
      { ...props }
      id={ id }
      variant={ variant }
      className={ clsx(
        typeStyle,
        "general",
        customStyle,
        className,
      ) }
      component={ component }
      onClick={ handleClick }
      disabled={ isDisabled || isLoading }
      type={ type }
      size={ size }
      fullWidth={ isFullWidth }
      to={ href }
      onBlur={ onBlur }
    >
      { render }
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.element.isRequired,
  variant: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  id: PropTypes.string,
  customStyle: PropTypes.string,
  component: PropTypes.any,
  isDisabled: PropTypes.bool,
  size: PropTypes.string,
  isFullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  icon: PropTypes.object,
  iconSide: PropTypes.string,
  typeStyle: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  onBlur: PropTypes.func,
};

Button.defaultProps = {
  id: "",
  customStyle: "",
  component: "button",
  isDisabled: false,
  size: "",
  isFullWidth: false,
  isLoading: false,
  icon: "",
  iconSide: "",
  typeStyle: "",
  href: "",
  className: "",
  onBlur: null,
  onClick: () => {},
};

export default Button;
