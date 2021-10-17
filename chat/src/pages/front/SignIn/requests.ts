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
    console.log({ userModelSnapshot, user });
    if (user?.active && user.permissions?.includes('chat')) {
      hideNetworkActivity();
      history.push('/chat/chatroom');
      return;
    }
    getAuth().signOut();
    hideNetworkActivity();
    showAlert({
      title: 'Error Signing In',
      message: 'This account is missing chat permissions.',
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
