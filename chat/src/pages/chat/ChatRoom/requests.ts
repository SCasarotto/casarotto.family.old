import { getAuth } from '@firebase/auth';
import { addDoc, serverTimestamp } from '@firebase/firestore';
import { collection, getFirestore } from 'firebase/firestore';
import { usePopupsFunctions } from 'react-tec';
import validate from 'validate.js';

import { RawMessageCreate } from 'types';

type SendMessageData = {
  message: string;
  popupFunctions: usePopupsFunctions;
};
export const sendMessage = async (data: SendMessageData) => {
  const { message, popupFunctions } = data;
  const { showNetworkActivity, hideNetworkActivity, showAlert } =
    popupFunctions;
  const auth = getAuth();
  const { uid } = auth.currentUser!;

  //Validate Data
  const validatorConstraints = {
    message: {
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
    throw new Error(firstErrorMessage);
  }

  try {
    showNetworkActivity('Sending Message...');
    const messageData: RawMessageCreate = {
      dateCreated: serverTimestamp(),
      message,
      senderUid: uid,
    };
    await addDoc(collection(getFirestore(), 'Messages'), messageData);
    hideNetworkActivity();
    return;
  } catch (e) {
    console.log(e);
    hideNetworkActivity();
    showAlert({
      title: 'Error',
      message: 'Error Sending Message',
    });
    return;
  }
};
