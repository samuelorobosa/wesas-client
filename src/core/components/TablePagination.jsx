export function TablePagination({ pageInfo, paginatedThunkCall }) {
  const handlePaginatedCall = (page) => {
    paginatedThunkCall(page);
  };
  return (
    <div className="flex justify-between items-center w-full">
      <button
        type="button"
        onClick={
          pageInfo.previousPage
            ? () => handlePaginatedCall(pageInfo.previousPage)
            : () => {}
        }
        disabled={!pageInfo.previousPage}
        className="px-4 py-2.5 flex items-center border border-grey-01 rounded text-sm font-normal text-grey-08"
      >
        Previous
      </button>

      <div className="text-grey-08 font-normal text-sm">
        {pageInfo.totalPage > 1 ? (
          <>
            Showing Page {pageInfo.presentPage} out of {pageInfo.totalPage}
          </>
        ) : (
          <>Showing Page 1 out of 1</>
        )}
      </div>

      <button
        type="button"
        onClick={
          pageInfo.nextPage
            ? () => handlePaginatedCall(pageInfo.nextPage)
            : () => {}
        }
        disabled={!pageInfo.nextPage}
        className="px-4 py-2.5 flex items-center border border-grey-01 rounded text-sm font-normal text-grey-08"
      >
        Next
      </button>
    </div>
  );
}

export default TablePagination;
