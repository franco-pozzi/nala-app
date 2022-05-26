import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { COMPONENT, COLORS_NAME, VARIANT } from "common/constants";
import { IconDiv, CustomDiv } from "./styles";

const TabIcons = (props) => {
  const { components } = props;
  const [value, setValue] = useState(1);
  const handleTabs = (indexTab) => setValue(indexTab);

  return (
    <div data-testid={ "tab-icons-component" }>
      <IconDiv className={ "icons-top" }>
        {components?.map((element, index) => (
          <IconButton
            key={ index }
            onClick={ () => handleTabs(index) }
            color={ value === index ? COLORS_NAME.primary : VARIANT.default }
            component={ COMPONENT.span }
          >
            {element.icon}
          </IconButton>
        ))}
      </IconDiv>
      <CustomDiv className={ "custom-content" }>
        {components?.map((element, index) => (
          <div key={ index }>{value === index && element.component}</div>
        ))}
      </CustomDiv>
    </div>
  );
};

TabIcons.propTypes = {
  components: PropTypes.array.isRequired,
};
export default TabIcons;
