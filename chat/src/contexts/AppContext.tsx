import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';

import { getAuth, User as FBUser } from 'firebase/auth';
import {
  getFirestore,
  doc,
  onSnapshot,
  Unsubscribe,
  updateDoc,
} from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';

import { settings } from 'config/settings';
import { firebaseConverter } from 'helpers';
import { User, RawUser } from 'types';

interface AppContextData {
  fbUser?: FBUser;
  fbUserLoaded?: boolean;
  user?: User;
  userLoaded?: boolean;
}
export const AppContext = createContext<AppContextData>(undefined!);
export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC = (props) => {
  const [fbUser, setFbUser] = useState<FBUser>();
  const [fbUserLoaded, setFbUserLoaded] = useState(false);
  const [user, setUser] = useState<User>();
  const [userLoaded, setUserLoaded] = useState(false);

  const internalUserUid = fbUser?.uid;

  // Load Firebase User
  useEffect(() => {
    getAuth().onAuthStateChanged(
      (u) => {
        if (u) {
          setFbUser(u);
          setFbUserLoaded(true);
        } else {
          setFbUser(undefined);
          setFbUserLoaded(true);
        }
      },
      (e) => {
        console.error(e);
        setFbUser(undefined);
        setFbUserLoaded(true);
      },
      () => console.log('onAuthStateChanged Completed'),
    );
  }, []);

  // Load and Watch User
  useEffect(() => {
    let userUnsubscribe: Unsubscribe;
    if (internalUserUid) {
      userUnsubscribe = onSnapshot(
        doc(getFirestore(), 'Users', internalUserUid).withConverter(
          firebaseConverter<RawUser>(),
        ),
        (snapshot) => {
          const user = snapshot.data();
          if (user?.active && user?.permissions?.includes('chat')) {
            setUser({ ...user, uid: internalUserUid });
          } else {
            getAuth().signOut();
            setUser(undefined);
          }
          setUserLoaded(true);
        },
        (e) => {
          console.log(e);
          setUser(undefined);
          setUserLoaded(true);
        },
      );
    }

    return () => {
      if (userUnsubscribe) {
        userUnsubscribe();
      }
      setUser(undefined);
      setUserLoaded(false);
    };
  }, [internalUserUid]);

  // Get and store push token
  useEffect(() => {
    if ('serviceWorker' in navigator && internalUserUid) {
      // Request Push Notification Permission And Store Token In User
      const getAndSavePushToken = async () => {
        try {
          const registration = await navigator.serviceWorker.ready;
          const vapidKey = settings.FIREBASE_VAPID_KEY;
          const token = await getToken(getMessaging(), {
            vapidKey,
            serviceWorkerRegistration: registration,
          });
          await updateDoc(doc(getFirestore(), 'Users', internalUserUid), {
            pushToken: token,
          });
        } catch (e) {
          console.log('getAndSavePushToken error', e);
        }
      };
      getAndSavePushToken();
    }
  }, [internalUserUid]);

  const memoizedReturn = useMemo(
    () => ({
      fbUser,
      fbUserLoaded,
      user,
      userLoaded,
    }),
    [fbUser, fbUserLoaded, user, userLoaded],
  );

  return (
    <AppContext.Provider value={memoizedReturn}>
      {props.children}
    </AppContext.Provider>
  );
};
