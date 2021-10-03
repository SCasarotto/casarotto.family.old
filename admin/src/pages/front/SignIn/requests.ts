import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { RouteComponentProps } from 'react-router-dom';
import { usePopupsFunctions } from 'react-tec';
import validate from 'validate.js';

import { firebaseConverter } from 'helpers';
import { RawUser } from 'types';

interface Data {
  email: string;
  password: string;
  history: RouteComponentProps['history'];
  popupFunctions: usePopupsFunctions;
}
export const signInUser = async (data: Data) => {
  const { email, password, history, popupFunctions } = data;
  const { showAlert, showNetworkActivity, hideNetworkActivity } =
    popupFunctions;

  //Validate Data
  const validatorConstraints = {
    email: {
      presence: {
        allowEmpty: false,
      },
      email: true,
    },
    password: {
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
    return;
  }

  try {
    showNetworkActivity('Signing In...');
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    //This could be better
    const { uid } = auth.currentUser!;
    const db = getFirestore();
    const userModelSnapshot = await getDoc(
      doc(db, 'Users', uid).withConverter(firebaseConverter<RawUser>()),
    );
    const user = userModelSnapshot.data();
    if (user?.active && user.permissions?.includes('admin')) {
      hideNetworkActivity();
      history.push('/admin/dashboard');
      return;
    }
    getAuth().signOut();
    hideNetworkActivity();
    showAlert({
      title: 'Error Signing In',
      message: 'This account is missing user permissions.',
    });
    return;
  } catch (e) {
    console.log(e);
    hideNetworkActivity();
    showAlert({
      title: 'Error',
      message: 'Error Signing In',
    });
    return;
  }
};
