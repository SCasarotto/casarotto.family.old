import { useState, useEffect } from 'react';

import {
  ErrorLoadingAlert,
  PanelWrapper,
  Panel,
  Form,
  InputRow,
  Button,
  usePopups,
} from 'react-tec';

import { ProfileImageRow } from 'components';
import { useAppContext } from 'contexts';
import { getDownloadUrlWithReties } from 'helpers';

import { saveUserDetails } from './requests';

export const Profile: React.FC = () => {
  const popupFunctions = usePopups();
  const { user, userLoaded } = useAppContext();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileSrc, setProfileSrc] = useState<string>();
  const [profileImage, setProfileImage] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      const processUser = async () => {
        const { firstName, lastName, profile } = user;

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
        uid: user.uid,
        userData: {
          firstName,
          lastName,
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

  if (!user) {
    if (userLoaded) {
      return (
        <ErrorLoadingAlert
          title='Error Loading Profile'
          message='There was an error loading this profile.'
        />
      );
    }
    return null; //Still Loading
  }

  return (
    <PanelWrapper>
      <Panel title='Edit Profile'>
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
          <Button onClick={handleSaveButtonPressed}>Save Details</Button>
        </Form>
      </Panel>
    </PanelWrapper>
  );
};
