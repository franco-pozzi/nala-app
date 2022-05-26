import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import ReorderIcon from "@material-ui/icons/Reorder";
import EventIcon from "@material-ui/icons/Event";
import TabIcons from "components/TabIcons";
import noInfoFace from "assets/images/tables/noInfoFace.svg";
import TableHistory from "../TableHistory";
import { StyledHistory, StyledUnderConstruction } from "./styled";

const HistoryTimeOff = (props) => {
  const {
    data,
    isLoading,
    total,
    pageFilter,
    pageHandler,
    handleEdit,
    deleteHandler,
    isMobile,
  } = props;
  const { t } = useTranslation(["common", "timeOff"]);

  const components = [
    {
      component: (
        <StyledUnderConstruction pt={ 2 }>
          <img
            src={ noInfoFace }
            alt={ t("timeOff:under_construction.title") }
          />
          <p>{t("timeOff:under_construction.comingSoon")}</p>
        </StyledUnderConstruction>
      ),
      icon: <EventIcon />,
    },
    {
      component: (
        <TableHistory
          data={ data }
          isLoading={ isLoading }
          handleEdit={ handleEdit }
          deleteHandler={ deleteHandler }
          pageHandler={ pageHandler }
          pageFilter={ pageFilter }
          isMobile={ isMobile }
          total={ total }
        />
      ),
      icon: <ReorderIcon />,
    },
  ];

  return (
    <StyledHistory data-testid={ "history-time-off-view-component" }>
      <TabIcons components={ components } />
    </StyledHistory>
  );
};

HistoryTimeOff.propTypes = {
  pageHandler: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  pageFilter: PropTypes.object,
  isMobile: PropTypes.bool,
};

HistoryTimeOff.defaultProps = {
  data: [],
  isLoading: false,
  total: 0,
  pageFilter: {},
  isMobile: false,
};

export default HistoryTimeOff;
