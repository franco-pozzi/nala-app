import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import PaginatedTable from "components/PaginatedTable";
import AlertDialog from "components/AlertDialog";
import TooltipIcon from "components/TooltipIcon";
import { HEADERS } from "common/constants/timeOff";
import getRows from "./functions/getRows";
import TimeOffCard from "../TimeOffCard";
import { StyledIconDiv, StyledDeleteIcon, StyledEditIcon } from "../../styled";

const TableHistory = (props) => {
  const {
    data,
    isLoading,
    total,
    pageFilter,
    setTableSort,
    pageHandler,
    handleEdit,
    deleteHandler,
    isMobile,
  } = props;
  const { t } = useTranslation(["timeOff", "common"]);
  const [selectedId, setSelectedId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(false);

  const handleModal = (id) => {
    setIsOpen(true);
    setSelectedId(id);
  };

  const sendToDelete = () => {
    setIsOpen(false);
    deleteHandler(selectedId);
  };

  const getOptions = (row) => (
    <StyledIconDiv>
      <IconButton
        onClick={ () => handleEdit(row) }
      >
        <TooltipIcon
          title={ t("tables:actions.edit") }
          element={ <StyledEditIcon /> }
        />

      </IconButton>
      <IconButton
        onClick={ () => handleModal(row.id) }
      >
        <TooltipIcon
          title={ t("tables:actions.delete") }
          element={ <StyledDeleteIcon /> }
        />

      </IconButton>
    </StyledIconDiv>
  );

  // TODO: sortable not working
  const headers = [
    { title: HEADERS.period, sortable: false, isVisible: true },
    { title: HEADERS.type, sortable: false, isVisible: true },
    { title: HEADERS.motive, sortable: false, isVisible: true },
    { title: HEADERS.state, sortable: false, isVisible: true },
    { title: HEADERS.actions, isVisible: true },
  ];
  const rows = getRows(data, t, getOptions);

  const handleSort = (title, direction) => setTableSort({ title, direction });

  const contentHistory = isMobile ? (
    <TimeOffCard
      data={ data }
      isLoading={ isLoading }
      getOptions={ getOptions }
      pagination={ {
        page: pageFilter.number, pageSize: pageFilter.size, handlePageChange: pageHandler,
      } }
    />
  ) : (
    <PaginatedTable
      headers={ headers }
      data={ data }
      total={ total }
      rows={ rows }
      isLoading={ isLoading }
      sortAction={ handleSort }
      pagination={ {
        page: pageFilter.number, pageSize: pageFilter.size, handlePageChange: pageHandler,
      } }
    />
  );

  return (
    <div data-testid={ "table-history-time-off-view-component" } >
      { contentHistory }
      <AlertDialog
        isOpen={ isOpen }
        onClose={ handleOpen }
        title={ t("common:common.modal_messages.sure_question") }
        message={ t("Manage_request.SubtitleDelete") }
        onSubmit={ () => sendToDelete() }
      />
    </div>
  );
};

TableHistory.propTypes = {
  setTableSort: PropTypes.func.isRequired,
  pageHandler: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  pageFilter: PropTypes.object,
  isMobile: PropTypes.bool,
};

TableHistory.defaultProps = {
  data: [],
  isLoading: false,
  total: 0,
  pageFilter: {},
  isMobile: false,
};

export default TableHistory;
