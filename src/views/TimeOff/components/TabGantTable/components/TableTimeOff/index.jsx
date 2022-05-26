import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { SessionContext } from "modules/session/context";
import PaginatedTable from "components/PaginatedTable";
import Modal from "components/Modal";
import { isAdmin as isAdminFunction } from "common/utils";
import { HEADERS } from "common/constants/timeOff";
import DinamicModals from "views/TimeOff/components/DinamicModals";
import getRows from "./functions/getRows";

const TableTimeOff = (props) => {
  const {
    data, isLoading, pageFilter, setTableSort, pageHandler, total,
  } = props;
  const { t } = useTranslation();

  const [selectedId, setSelectedId] = useState();
  const [selectedModal, setSelectedModal] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(false);
  const handleModal = (state, id) => {
    setIsOpen(true);
    setSelectedId(id);
    setSelectedModal(state);
  };

  const {
    state: { user },
  } = useContext(SessionContext);

  const isAdmin = isAdminFunction(user?.userCookies);

  // TODO: sortable not working
  const headers = [
    { title: HEADERS.name, sortable: false, isVisible: true },
    { title: HEADERS.manager, sortable: false, isVisible: isAdmin },
    { title: HEADERS.period, sortable: false, isVisible: true },
    { title: HEADERS.type, sortable: false, isVisible: true },
    { title: HEADERS.motive, sortable: false, isVisible: true },
    { title: HEADERS.state, sortable: false, isVisible: true },
    { title: HEADERS.documents, isVisible: true },
    { title: HEADERS.actions, isVisible: true },
  ];
  const rows = getRows(data, isAdmin, t, handleModal);

  const handleSort = (title, direction) => {
    setTableSort({
      title,
      direction,
    });
  };

  return (
    <div data-testid={ "table-time-off-view-component" } >
      <PaginatedTable
        headers={ headers }
        isAdmin={ isAdmin }
        data={ data }
        total={ total }
        rows={ rows }
        isLoading={ isLoading }
        sortAction={ handleSort }
        pagination={ {
          page: pageFilter.number, pageSize: pageFilter.size, handlePageChange: pageHandler, count: -1,
        } }
      />
      <Modal
        isOpen={ isOpen }
        onClose={ handleOpen }
      >
        <DinamicModals
          state={ selectedModal }
          itemId={ selectedId }
          onClose={ handleOpen }
        />
      </Modal>
    </div>
  );
};

TableTimeOff.propTypes = {
  setTableSort: PropTypes.func.isRequired,
  pageHandler: PropTypes.func.isRequired,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  pageFilter: PropTypes.object,
  total: PropTypes.number,
};

TableTimeOff.defaultProps = {
  data: [],
  isLoading: false,
  pageFilter: {},
  total: 0,
};

export default TableTimeOff;
