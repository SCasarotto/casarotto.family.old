import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { usePopupsFunctions } from 'react-tec';

import { UserChatSettings } from 'types';

type SaveUserData = {
  uid: string;
  userSettingsData: UserChatSettings;
  popupFunctions: usePopupsFunctions;
};
export const saveChatSettings = async (data: SaveUserData) => {
  const { uid, userSettingsData, popupFunctions } = data;
  const { showNetworkActivity, hideNetworkActivity, showAlert } =
    popupFunctions;

  try {
    showNetworkActivity('Saving Settings...');
    await updateDoc(doc(getFirestore(), 'Users', uid), {
      chatSettings: userSettingsData,
    });
    hideNetworkActivity();
    showAlert({
      title: 'Success',
      message: 'Settings Saved.',
    });
    return;
  } catch (e) {
    console.log(e);
    hideNetworkActivity();
    showAlert({
      title: 'Error',
      message: 'Error Saving Settings.',
    });
    return;
  }
};
