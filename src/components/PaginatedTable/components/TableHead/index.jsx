import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { ASC } from "common/constants/index";
import { StyledTableHead } from "./styles";

const TableHead = (props) => {
  const {
    headers, direction, active, handleSort,
  } = props;
  const { t } = useTranslation(["common"]);

  return (
    <StyledTableHead>
      <TableRow>
        {headers?.map((element) => (
          <TableCell key={ element.title }>
            <TableSortLabel
              active={ active === element.title }
              direction={ direction }
              onClick={ element.sortable ? () => handleSort(element.title, direction === ASC ? element.sortAsc : element.sortDesc) : undefined }
              hideSortIcon={ !element.sortable }
            >
              { element.isVisible ? t(`common.${element.title}`) : "" }
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </StyledTableHead>
  );
};

TableHead.propTypes = {
  headers: PropTypes.array.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  active: PropTypes.string,
};

TableHead.defaultProps = {
  active: "",
};

export default TableHead;
