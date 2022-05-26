import React, { useState } from "react";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import { VARIANT } from "common/constants";
import { StyledTabs } from "./styles";

const TabComponent = (props) => {
  const {
    tabValue, tabs, onChange, customStyle,
  } = props;
  const [value, setValue] = useState(tabValue);

  const handleChange = (event, value) => {
    setValue(value);
    onChange(value);
  };

  return (
    <StyledTabs
      data-testid={ "tabs-component" }
      value={ value }
      onChange={ handleChange }
      variant={ VARIANT.scrollable }
      scrollButtons={ "on" }
      aria-label={ "Tabs" }
      TabIndicatorProps={ { className: "indicator" } }
      className={ "tabs" }
      initialSelectedIndex={ value }
    >
      {tabs?.map((item, index) => (
        <Tab
          key={ `simple-tabs-${item.label}` }
          label={ item.label }
          id={ `simple-tab-${index}` }
          aria-controls={ `simple-tabpanel-${index}` }
          disabled={ item.isDisabled }
          className={ customStyle }
        />
      ))}
    </StyledTabs>
  );
};

TabComponent.propTypes = {
  tabs: PropTypes.array,
  tabValue: PropTypes.number,
  onChange: PropTypes.func,
  customStyle: PropTypes.string,
};

export default TabComponent;
