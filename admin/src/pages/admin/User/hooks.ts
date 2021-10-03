import { useEffect, useState } from 'react';

import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

import { firebaseConverter } from 'helpers';
import { RawUser, User } from 'types';

export const useUser = (uid: string) => {
  const [user, setUser] = useState<User>();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const usersUnsubscribe = onSnapshot(
      doc(getFirestore(), 'Users', uid).withConverter(
        firebaseConverter<RawUser>(),
      ),
      (snapshot) => {
        setUser(snapshot.exists() ? { ...snapshot.data(), uid } : undefined);
        setUserLoaded(true);
      },
      (e) => {
        console.log(e);
        setUser(undefined);
        setUserLoaded(true);
      },
    );

    return () => {
      usersUnsubscribe();
      setUser(undefined);
      setUserLoaded(false);
    };
  }, [uid]);

  return { user, userLoaded };
};
