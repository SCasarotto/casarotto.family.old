import { useEffect, useState } from 'react';

import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

import { firebaseConverter } from 'helpers';
import { RawUser, User } from 'types';

export const useUsers = () => {
  const [userArray, setUserArray] = useState<Array<User>>([]);
  const [userArrayLoaded, setUserArrayLoaded] = useState(false);

  useEffect(() => {
    const usersUnsubscribe = onSnapshot(
      collection(getFirestore(), 'Users').withConverter(
        firebaseConverter<RawUser>(),
      ),
      (snapshot) => {
        const newUserArray: Array<User> = [];
        snapshot.forEach((doc) => {
          const d = doc.data();
          newUserArray.push({ ...d, uid: doc.id });
        });
        setUserArray(newUserArray);
        setUserArrayLoaded(true);
      },
      (e) => {
        console.log(e);
        setUserArray([]);
        setUserArrayLoaded(true);
      },
    );

    return () => {
      usersUnsubscribe();
    };
  }, []);

  return { userArray, userArrayLoaded };
};
