import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { usePopupsFunctions } from 'react-tec';
import validate from 'validate.js';

import { settings } from 'config/settings';
import { generateRandomCode } from 'helpers';
import { Permission, RawUser } from 'types';

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  permissions: Array<Permission>;
  popupFunctions: usePopupsFunctions;
}
export const addUser = async (data: Data) => {
  const { firstName, lastName, email, permissions, popupFunctions } = data;
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
  const validationResponse = validate(data, validatorConstraints);
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
    const data: RawUser = {
      firstName,
      lastName,
      email,
      permissions,
      dateCreated: Date.now(),
      active: true,
    };
    await addDoc(collection(getFirestore(), 'Users'), data);
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
