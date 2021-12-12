import { useState, useEffect, useMemo } from 'react';

import { RouteComponentProps } from 'react-router';
import { Column } from 'react-table';
import {
  ErrorLoadingAlert,
  PanelWrapper,
  Panel,
  Form,
  InputRow,
  Button,
  SegmentedGroup,
  usePopups,
  CheckboxGroup,
} from 'react-tec';

import { ProfileImageRow, Table } from 'components';
import { PermissionArray } from 'config/localData';
import { getDownloadUrlWithReties } from 'helpers';
import { Permission, User as UserType } from 'types';

import { useUser } from './hooks';
import { saveUserDetails } from './requests';

interface Props extends RouteComponentProps<{ uid: string }> {}
export const User: React.FC<Props> = (props) => {
  const { uid } = props.match.params;

  const popupFunctions = usePopups();
  const { user, userLoaded } = useUser(uid);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileSrc, setProfileSrc] = useState<string>();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [permissions, setPermissions] = useState<Array<Permission>>([]);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (user) {
      const processUser = async () => {
        const { active, firstName, lastName, profile, permissions } = user;

        setFirstName(firstName ?? '');
        setLastName(lastName ?? '');
        if (profile?.large) {
          try {
            const url = await getDownloadUrlWithReties({
              path: profile.large,
              // Extra long delay because here we can upload the image and expect a processing delay
              retries: 5,
              delay: 1500,
            });
            setProfileSrc(url);
          } catch (e) {
            console.log(e);
          }
        }
        setPermissions(permissions ?? []);
        setActive(!!active);
      };
      processUser();
    }
  }, [user]);

  const handleSaveButtonPressed = async () => {
    if (!user) {
      return;
    }
    try {
      await saveUserDetails({
        uid,
        userData: {
          firstName,
          lastName,
          permissions,
          active,
          profileImage,
          profileSrc,
        },
        prevUserData: user,
        popupFunctions,
      });
      setProfileImage(null);
    } catch (e) {
      console.log(e);
    }
  };

  const columns: Array<Column<UserType>> = useMemo(
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

  if (!user) {
    if (userLoaded) {
      return (
        <ErrorLoadingAlert
          title='Error Loading User'
          message='There was an error loading this user.'
        />
      );
    }
    return null; //Still Loading
  }

  return (
    <PanelWrapper>
      <Panel title='User'>
        <Table<UserType>
          useTableOptions={{
            data: [user],
            columns,
          }}
          sortable={false}
          filterable={false}
          showPagination={false}
        />
      </Panel>
      <Panel title='Edit'>
        <Form>
          <InputRow
            labelForKey='firstName'
            title='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            rowSize='half'
          />
          <InputRow
            labelForKey='lastName'
            title='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            rowSize='half'
            last
          />
          <ProfileImageRow
            src={profileSrc}
            file={profileImage}
            onChange={(file) => {
              setProfileImage(file ?? null);
              if (!file) {
                setProfileSrc(undefined);
              }
            }}
          />
          <CheckboxGroup
            labelForKey='permissions'
            title='Permissions'
            buttonArray={PermissionArray}
            checkedValues={permissions}
            onChange={(perms) => setPermissions(perms as Array<Permission>)}
          />
          <SegmentedGroup
            labelForKey='active'
            title='Active'
            buttonArray={['Yes', 'No']}
            checkedValue={active ? 'Yes' : 'No'}
            onChange={(e) => setActive(e.target.value === 'Yes')}
            required
          />
          <Button onClick={handleSaveButtonPressed}>Save Details</Button>
        </Form>
      </Panel>
    </PanelWrapper>
  );
};
