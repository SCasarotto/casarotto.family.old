import { useMemo } from 'react';

import {
  useTable,
  Column,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
  useFilters,
  UseFiltersColumnProps,
} from 'react-table';
import { Panel, PanelWrapper } from 'react-tec';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { User } from 'types';

import { useUsers } from './hooks';
import { TableWrapper, FilterInput } from './styledComponents';

type DefaultFilterProps<T extends object = {}> = {
  column: UseFiltersColumnProps<T>;
};
const DefaultColumnFilter = <T extends object = {}>(
  props: DefaultFilterProps<T>,
) => {
  const { filterValue, setFilter } = props.column;

  return (
    <FilterInput
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
    />
  );
};

export const Users = () => {
  const { userArray, userArrayLoaded } = useUsers();

  const columns: Array<Column<User>> = useMemo(
    () => [
      { id: 'uid', Header: 'UID', accessor: 'uid' },
      { id: 'firstName', Header: 'First Name', accessor: 'firstName' },
      { id: 'lastName', Header: 'Last Name', accessor: 'lastName' },
      { id: 'email', Header: 'Email', accessor: 'email' },
      {
        id: 'permissions',
        Header: 'Permissions',
        accessor: (u) => u.permissions.join(', '),
      },
      {
        id: 'active',
        Header: 'Active',
        accessor: (u) => (u.active ? 'Yes' : 'No'),
      },
    ],
    [],
  );

  const defaultColumn: Partial<Column<User>> = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
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
    { columns, data: userArray, defaultColumn },
    useFlexLayout,
    useResizeColumns,
    useFilters,
    useSortBy,
    usePagination,
  );

  return (
    <PanelWrapper>
      <Panel title='Users'>
        <TableWrapper>
          <div className='table' {...getTableProps()}>
            <div className='thead'>
              {headerGroups.map((headerGroup) => (
                <div className='tr' {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <div
                      className='th'
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaSortDown />
                        ) : (
                          <FaSortUp />
                        )
                      ) : (
                        <FaSort />
                      )}
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
              {headerGroups.map((headerGroup) => (
                <div
                  className='tr filter'
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <div
                      className='th filter'
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
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
                  <div className='tr' {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <div className='td' {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          {rows.length > pageSize && (
            <div className='pagination'>
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                First
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
              <span>
                {pageIndex * pageSize}-{(pageIndex + 1) * pageSize} of{' '}
                {rows.length}
              </span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
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
      </Panel>
    </PanelWrapper>
  );
};
