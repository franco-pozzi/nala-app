import React from "react";
import PropTypes from "prop-types";
import ReorderIcon from "@material-ui/icons/Reorder";
import EventIcon from "@material-ui/icons/Event";
import Box from "@material-ui/core/Box";
import TabIcons from "components/TabIcons";
import GantTimeOff from "./components/GantTimeOff";
import TableTimeOff from "./components/TableTimeOff";

const TabGantTable = (props) => {
  const {
    gantIsLoading,
    tableIsLoading,
    tableData,
    total,
    gantData,
    pageFilter,
    pageHandler,
    statesFilter,
  } = props;

  const components = [
    {
      component: (
        <GantTimeOff
          data={ gantData }
          statesFilter={ statesFilter }
          isLoading={ gantIsLoading }
        />
      ),
      icon: <EventIcon />,
    },
    {
      component: (
        <TableTimeOff
          data={ tableData }
          pageHandler={ pageHandler }
          isLoading={ tableIsLoading }
          pageFilter={ pageFilter }
          total={ total }
        />
      ),
      icon: <ReorderIcon />,
    },
  ];

  return (
    <Box data-testid={ "tab-gant-table-view-component" } >
      <TabIcons components={ components } />
    </Box>
  );
};

TabGantTable.propTypes = {
  pageFilter: PropTypes.object.isRequired,
  pageHandler: PropTypes.func.isRequired,
  gantIsLoading: PropTypes.bool,
  tableIsLoading: PropTypes.bool,
  tableData: PropTypes.array,
  gantData: PropTypes.array,
  statesFilter: PropTypes.array,
  total: PropTypes.number,
};

TabGantTable.defaultProps = {
  gantIsLoading: false,
  tableIsLoading: false,
  tableData: [],
  gantData: [],
  statesFilter: [],
  total: 0,
};

export default TabGantTable;
