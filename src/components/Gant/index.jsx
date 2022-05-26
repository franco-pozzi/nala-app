import React from "react";
import PropTypes from "prop-types";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import SkeletonLoader from "components/SkeletonLoader";
import { DATE_PARTS } from "common/constants";
import { Container } from "./styles";
import "react-calendar-timeline/lib/Timeline.css";

const Gant = (props) => {
  const {
    isLoading, groups, itemRenderer, items, onItemSelect,
  } = props;

  return (
    <Container >
      {isLoading ? <SkeletonLoader />
        : (
          <Timeline
            onItemSelect={ onItemSelect }
            itemRenderer={ itemRenderer }
            groups={ groups }
            items={ items }
            defaultTimeStart={ moment().add(-12, DATE_PARTS.day) }
            defaultTimeEnd={ moment().add(12, DATE_PARTS.day) }
          />
        )}
    </Container>
  );
};

Gant.propTypes = {
  isLoading: PropTypes.bool,
  groups: PropTypes.array.isRequired,
  itemRenderer: PropTypes.element.isRequired,
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func,
};

Gant.defaultProps = {
  isLoading: false,
  onItemSelect: () => {},
};

export default Gant;
