import { usePopupsFunctions } from 'react-tec';
import validate from 'validate.js';

import { User } from 'types';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

export type UpdateUserData = Omit<User, 'uid' | 'email' | 'dateCreated'>;
export const saveUserDetails = async (
  uid: string,
  data: UpdateUserData,
  popupFunctions: usePopupsFunctions,
) => {
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
    active: {
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
    showNetworkActivity('Saving User Details...');
    await updateDoc(doc(getFirestore(), 'Users', uid), data);
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
