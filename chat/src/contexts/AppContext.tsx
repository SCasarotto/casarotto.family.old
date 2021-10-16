import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';

import { getAuth, User as FBUser } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, Unsubscribe } from 'firebase/firestore';

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

  useEffect(() => {
    let userUnsubscribe: Unsubscribe;
    const internalUserUid = fbUser?.uid;
    if (internalUserUid) {
      userUnsubscribe = onSnapshot(
        doc(getFirestore(), 'Users', internalUserUid).withConverter(
          firebaseConverter<RawUser>(),
        ),
        (snapshot) => {
          const user = snapshot.data();
          if (user?.active && user?.permissions?.includes('admin')) {
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
  }, [fbUser]);

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
