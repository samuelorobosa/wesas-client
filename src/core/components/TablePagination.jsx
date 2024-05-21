export function TablePagination({ table }) {
  return (
    <div className="flex justify-between items-center w-full">
      <button
        type="button"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="px-4 py-2.5 flex items-center border border-grey-01 rounded text-sm font-normal text-grey-08"
      >
        Previous
      </button>

      <div className="text-grey-08 font-normal">
        Showing Page {table.getState().pagination.pageIndex + 1} out of{' '}
        {table.getPageCount()}
      </div>

      <button
        type="button"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="px-4 py-2.5 flex items-center border border-grey-01 rounded text-sm font-normal text-grey-08"
      >
        Next
      </button>
    </div>
  );
}

export default TablePagination;
