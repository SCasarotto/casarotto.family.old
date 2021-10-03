import { useMemo, useState } from 'react';

import { Column } from 'react-table';
import { Panel, PanelWrapper } from 'react-tec';

import { PanelActionButton, Table, TableLink } from 'components';
import { User } from 'types';

import { AddUserPopup } from './AddUserPopup';
import { useUsers } from './hooks';

const DetailButton = (d: { value: string }) => (
  <TableLink to={`/admin/users/${d.value}`} icon='details' />
);

export const Users = () => {
  const { userArray } = useUsers();
  const [addVisible, setAddVisible] = useState(false);

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
      <Panel
        title='Users'
        rightComponent={
          <PanelActionButton onClick={() => setAddVisible(true)}>
            Add User
          </PanelActionButton>
        }
      >
        <Table
          useTableOptions={{
            data: userArray,
            columns,
          }}
        />
      </Panel>
      <AddUserPopup
        visible={addVisible}
        onClose={() => setAddVisible(false)}
        onSubmit={() => setAddVisible(false)}
      />
    </PanelWrapper>
  );
};
