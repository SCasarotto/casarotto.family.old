import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { RouteComponentProps } from 'react-router-dom';
import { usePopupsFunctions } from 'react-tec';
import validate from 'validate.js';

interface Data {
  email: string;
  history: RouteComponentProps['history'];
  popupFunctions: usePopupsFunctions;
}
export const submitForgotPassword = async (data: Data) => {
  const { email, popupFunctions } = data;
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
    showNetworkActivity('Sending Password Reset Email...');
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    hideNetworkActivity();
    showAlert({
      title: 'Sucess',
      message:
        'An pasword reset email has been sent to the provided email address.',
    });
    return;
  } catch (e) {
    console.log(e);
    hideNetworkActivity();
    showAlert({
      title: 'Error',
      message: 'Error Sending Password Reset Email',
    });
    throw e;
  }
};
