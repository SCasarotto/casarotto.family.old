import { useMemo } from 'react';

import { Column } from 'react-table';
import { Panel, PanelWrapper } from 'react-tec';

import { Table, TableLink } from 'components';
import { User } from 'types';

import { useUsers } from './hooks';

const DetailButton = (d: { value: string }) => (
  <TableLink to={`/admin/users/${d.value}`} icon='details' />
);

export const Users = () => {
  const { userArray } = useUsers();

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
      {
        id: 'action',
        Header: '',
        accessor: 'uid',
        canSort: false,
        defaultCanSort: false,
        canFilter: false,
        Cell: DetailButton,
      },
    ],
    [],
  );

  return (
    <PanelWrapper>
      <Panel title='Users'>
        <Table
          useTableOptions={{
            data: userArray,
            columns,
          }}
        />
      </Panel>
    </PanelWrapper>
  );
};
