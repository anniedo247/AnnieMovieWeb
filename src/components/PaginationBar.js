import React from 'react';
import Pagination from '@material-ui/lab/Pagination';


function PaginationBar({ pageNum, setPageNum, totalPageNum }) {
  const handleChange = (event, value) => {
    setPageNum(value);
  };

  return (
    <div className="d-flex justify-content-center mt-4 pb-5">
      <Pagination
        count={totalPageNum}
        variant="outlined"
        color="secondary"
        page={pageNum}
        onChange={handleChange}
      />
    </div>
  );
}

export default PaginationBar
