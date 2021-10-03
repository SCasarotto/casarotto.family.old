/* eslint-disable react/jsx-key */
import { useMemo } from 'react';

import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import {
  useTable,
  Column,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
  useFilters,
  TableOptions,
  Row,
} from 'react-table';

import { FilterBasic } from './FilterBasic';
import { TableWrapper } from './styleComponents';

export type TableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  useTableOptions: TableOptions<T>;
  loading?: boolean;
  showPagination?: boolean;
  pageSizeOptions?: Array<number>;
  className?: string;
  // TODO: Determine if there is a better way to do this
  onRowClick?: (row: Row<T>) => void;
  sortable?: boolean;
  filterable?: boolean;
};
export const Table = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: TableProps<T>,
) => {
  const {
    useTableOptions,
    showPagination = true,
    pageSizeOptions = [10, 20, 30, 40, 50],
    className,
    onRowClick,
    sortable = true,
    filterable = true,
  } = props;

  const defaultColumn: Partial<Column<T>> = useMemo(
    () => ({
      // Default Filter UI
      Filter: FilterBasic,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      defaultColumn,
      disableFilters: !filterable,
      disableSortBy: !sortable,
      ...useTableOptions,
    },
    useFlexLayout,
    useResizeColumns,
    useFilters,
    useSortBy,
    usePagination,
  );
  return (
    <TableWrapper className={className}>
      <div className='table' {...getTableProps()}>
        <div className='thead'>
          {headerGroups.map((headerGroup) => (
            <div className='tr' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({
                      className: `th ${column.classNameHeader ?? ''}`,
                    }),
                  )}
                >
                  {column.render('Header')}
                  {sortable ? (
                    column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortDown />
                      ) : (
                        <FaSortUp />
                      )
                    ) : (
                      <FaSort />
                    )
                  ) : null}
                  {column.canResize && (
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
          {filterable &&
            headerGroups.map((headerGroup) => (
              <div className='tr filter' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <div
                    {...column.getHeaderProps(
                      column.getSortByToggleProps({
                        className: `th filter${column.classNameHeader ?? ''}`,
                      }),
                    )}
                  >
                    {/* TODO: Enable the abiltiy to remove filtering */}
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
                ))}
              </div>
            ))}
        </div>
        <div className='tbody' {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <div
                className={`tr ${onRowClick ? 'pressabel' : undefined}`}
                {...row.getRowProps()}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {row.cells.map((cell) => {
                  return (
                    <div
                      {...cell.getCellProps({
                        className: `td ${cell.column.className}`,
                      })}
                    >
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {showPagination && rows.length > pageSize && (
        <div className='pagination'>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            First
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <span>
            {pageIndex * pageSize}-{(pageIndex + 1) * pageSize} of {rows.length}
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            Last
          </button>
        </div>
      )}
    </TableWrapper>
  );
};
