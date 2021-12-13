import { initializeApp, deleteApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { usePopupsFunctions } from 'react-tec';
import validate from 'validate.js';

import { settings } from 'config/settings';
import { generateRandomCode } from 'helpers';
import { RawUser, User, UserProfile } from 'types';

type CreateUser = Omit<
  User,
  'uid' | 'dateCreated' | 'active' | 'profile' | 'profileDateUpdated'
> & {
  profileImage?: File;
};
type AddUserData = {
  userData: CreateUser;
  popupFunctions: usePopupsFunctions;
};
export const addUser = async (data: AddUserData) => {
  const { userData, popupFunctions } = data;
  const { profileImage, firstName, lastName, email, permissions } = userData;
  const { showNetworkActivity, hideNetworkActivity, showAlert } =
    popupFunctions;

  //Validate Data
  const validatorConstraints: { [key: string]: any } = {
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
    email: {
      presence: {
        allowEmpty: false,
      },
    },
  };
  const validationResponse = validate(userData, validatorConstraints);
  if (validationResponse) {
    const valuesArray: Array<Array<any>> = Object.values(validationResponse);
    const firstError: Array<any> = valuesArray[0];
    const firstErrorMessage: string = firstError[0];
    showAlert({
      title: 'Error',
      message: firstErrorMessage,
    });
    throw new Error(firstErrorMessage);
  }

  const secondaryFirebaseApp = initializeApp(
    {
      apiKey: settings.FIREBASE_API_KEY,
      authDomain: settings.FIREBASE_AUTH_DOMAIN,
      databaseURL: settings.FIREBASE_DATABASE_URL,
      projectId: settings.FIREBASE_PROJECT_ID,
      storageBucket: settings.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: settings.FIREBASE_MESSAGING_SENDER_ID,
      appId: settings.FIREBASE_APP_ID,
      measurementId: settings.FIREBASE_MEASUREMENT_ID,
    },
    'secondary',
  );
  try {
    showNetworkActivity('Adding User...');

    const password = generateRandomCode();

    const auth = getAuth(secondaryFirebaseApp);
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    const userUID = newUser.user.uid;

    if (!userUID) {
      throw new Error('No UID Found or Created');
    }

    let profileData: UserProfile | undefined;
    if (profileImage) {
      const storage = getStorage();
      const filePath = `profile/${userUID}.jpeg`;
      const profileFolderRef = ref(storage, filePath);
      await uploadBytes(profileFolderRef, profileImage, {
        contentType: 'image/jpeg',
      });
      const small = `profile/${userUID}_100x100.jpeg`;
      const large = `profile/${userUID}_400x400.jpeg`;
      profileData = {
        small,
        large,
      };
    }

    const data: RawUser = {
      firstName,
      lastName,
      email,
      permissions,
      profile: profileData ?? null,
      profileDateUpdated: profileData ? Date.now() : null,
      dateCreated: Date.now(),
      active: true,
    };
    await setDoc(doc(getFirestore(), 'Users', userUID), data);
    deleteApp(secondaryFirebaseApp);
    hideNetworkActivity();
    showAlert({
      title: 'Success',
      message:
        'User Added. Inform the user to use the forgot password feature to set their password.',
    });
    return;
  } catch (e: any) {
    console.log(e);
    deleteApp(secondaryFirebaseApp);
    hideNetworkActivity();
    showAlert({
      title: 'Error',
      message: 'Error Adding User.',
    });
    throw new Error(e);
  }
};
