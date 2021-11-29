import { useState } from 'react';

import {
  PopupForm,
  InputRow,
  usePopups,
  CheckboxGroup,
  ImageRow,
} from 'react-tec';

import { PopupTitle, ProfileImageRow } from 'components';
import { PermissionArray } from 'config/localData';
import { Permission } from 'types';

import { addUser } from './requests';

interface Props {
  onClose(): void;
  onSubmit(): void;
  visible: boolean;
}
export const AddUserPopup: React.FC<Props> = (props) => {
  const { onClose, onSubmit, visible } = props;

  const popupFunctions = usePopups();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<File>();
  const [profileImageKey, setProfileImageKey] = useState(0);
  const [permissions, setPermissions] = useState<Array<Permission>>([]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        firstName,
        lastName,
        email,
        profileImage,
        permissions,
        popupFunctions,
      };
      await addUser(data);
      setFirstName('');
      setLastName('');
      setEmail('');
      setProfileImageKey((k) => k + 1);
      setPermissions([]);
      onSubmit();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PopupForm visible={visible} onClose={onClose} onSubmit={handleCreate}>
      <PopupTitle>Create User</PopupTitle>
      <InputRow
        labelForKey='addFirstName'
        title='First Name'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <InputRow
        labelForKey='addLastName'
        title='Last Name'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <InputRow
        type='email'
        labelForKey='email'
        title='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <ProfileImageRow
        key={profileImageKey}
        file={profileImage}
        onChange={(file) => setProfileImage(file)}
      />
      <CheckboxGroup
        labelForKey='permissions'
        title='Permissions'
        checkedValues={permissions}
        onChange={(permissionArray: Array<Permission>) =>
          setPermissions(permissionArray)
        }
        buttonArray={PermissionArray}
        required
        rowSize='half'
      />
    </PopupForm>
  );
};
