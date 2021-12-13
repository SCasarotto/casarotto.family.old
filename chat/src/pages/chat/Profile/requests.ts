import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage';
import { usePopupsFunctions } from 'react-tec';
import validate from 'validate.js';

import { User } from 'types';

type UpdateUser = Omit<
  User,
  | 'uid'
  | 'email'
  | 'dateCreated'
  | 'profile'
  | 'profileDateUpdated'
  | 'active'
  | 'permissions'
> & {
  profileSrc?: string;
  profileImage?: File | null;
};
type SaveUserData = {
  uid: string;
  userData: UpdateUser;
  prevUserData: User;
  popupFunctions: usePopupsFunctions;
};
export const saveUserDetails = async (data: SaveUserData) => {
  const { uid, userData, prevUserData, popupFunctions } = data;
  const { firstName, lastName, profileImage, profileSrc } = userData;
  const { showNetworkActivity, hideNetworkActivity, showAlert } =
    popupFunctions;

  //Validate Data
  const validatorConstraints = {
    firstName: {
      presence: {
        allowEmpty: false,
      },
    },
    lastName: {
      presence: {
        allowEmpty: false,
      },
    },
  };
  const validationResponse = validate(userData, validatorConstraints);
  if (validationResponse) {
    const valuesArray: Array<Array<string>> = Object.values(validationResponse);
    const firstError = valuesArray[0];
    const firstErrorMessage = firstError[0];
    showAlert({
      title: 'Error',
      message: firstErrorMessage,
    });
    return;
  }
  try {
    showNetworkActivity('Saving User Details...');
    const dataToSave: Partial<User> = {
      firstName,
      lastName,
      profile: prevUserData.profile ?? null,
      profileDateUpdated: prevUserData.profileDateUpdated ?? null,
    };

    // Delete images if there is a new image or the image was cleared
    if (dataToSave.profile && (profileImage || !profileSrc)) {
      const storage = getStorage();
      const { small, large } = dataToSave.profile;
      const smallRef = ref(storage, small);
      const largeRef = ref(storage, large);
      await Promise.all([deleteObject(smallRef), deleteObject(largeRef)]);
      dataToSave.profile = null;
      dataToSave.profileDateUpdated = null;
    }
    if (profileImage) {
      const storage = getStorage();
      const filePath = `profile/${uid}.jpeg`;
      const profileFolderRef = ref(storage, filePath);
      await uploadBytes(profileFolderRef, profileImage, {
        contentType: 'image/jpeg',
      });
      const small = `profile/${uid}_100x100.jpeg`;
      const large = `profile/${uid}_400x400.jpeg`;
      dataToSave.profile = {
        small,
        large,
      };
      dataToSave.profileDateUpdated = Date.now();
    }

    await updateDoc(doc(getFirestore(), 'Users', uid), dataToSave);
    hideNetworkActivity();
    showAlert({
      title: 'Success',
      message: 'User Details Saved.',
    });
    return;
  } catch (e) {
    console.log(e);
    hideNetworkActivity();
    showAlert({
      title: 'Error',
      message: 'Error Saving User Details.',
    });
    return;
  }
};
