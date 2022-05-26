import React, { useState } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import SkeletonLoader from "components/SkeletonLoader";
import NoDataMessage from "components/NoDataMessage";
import {
  ASC, DESC, COMPONENT, PAGINATION, INDEX,
} from "common/constants";
import EnhancedTableHead from "./components/TableHead";
import { StyledRoundTableContainer, StyledRoundPaper, StyledTableRow } from "./styles";

const PaginatedTable = (props) => {
  const {
    data, headers, sortAction, pagination, isLoading, rows, total,
  } = props;
  const [direction, setDirection] = useState(ASC);
  const [active, setActive] = useState("");
  const start = data?.length - 1 <= PAGINATION.maxPerPage ? INDEX.zero : pagination.page * pagination.pageSize;
  const rowsByPage = rows?.slice(start, start + pagination.pageSize);
  const handleSort = (title) => {
    setActive(title);
    setDirection(direction === ASC ? DESC : ASC);
    sortAction(title, direction);
  };

  return (
    <StyledRoundPaper>
      <StyledRoundTableContainer>
        <Table>
          <EnhancedTableHead
            headers={ headers }
            direction={ direction }
            active={ active }
            handleSort={ handleSort }
          />
          {!isLoading && (
            <TableBody>
              {rowsByPage?.map((item, index) => (
                <StyledTableRow key={ index } even={ (index % 2) ? undefined : "true" }>
                  {item?.map((cell, cellIndex) => <TableCell key={ cellIndex }>{cell.isVisible ? cell.content : ""}</TableCell>)}
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {isLoading && <SkeletonLoader />}
        {!isLoading && (isEmpty(data) ? <NoDataMessage /> : (
          <TablePagination
            component={ COMPONENT.div }
            count={ total }
            rowsPerPage={ pagination.pageSize }
            page={ pagination.page }
            onChangePage={ pagination.handlePageChange }
            rowsPerPageOptions={ [] }
          />
        ))}
      </StyledRoundTableContainer>
    </StyledRoundPaper>
  );
};

PaginatedTable.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  sortAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.shape({
    handlePageChange: PropTypes.func,
    pageSize: PropTypes.number,
    page: PropTypes.number,
    count: PropTypes.number,
  }),
  total: PropTypes.number.isRequired,
};

export default PaginatedTable;
