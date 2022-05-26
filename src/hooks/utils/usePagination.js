import { useState } from "react";

const usePagination = (initialState) => {
  const [pagination, setPagination] = useState(initialState);
  const handlePagination = (control) => setPagination(pagination + control);
  return {
    pagination, handlePagination, setPagination,
  };
};

export default usePagination;
