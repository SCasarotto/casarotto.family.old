import { useEffect, useState } from 'react';

import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

import { firebaseConverter } from 'helpers';
import { Message, RawMessage, RawUser, User } from 'types';

export const useUsers = () => {
  const [users, setUsers] = useState<Record<string, User>>({});
  const [usersLoaded, setUsersLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(getFirestore(), 'Users').withConverter(
        firebaseConverter<RawUser>(),
      ),
      (snapshot) => {
        const newUsers: Record<string, User> = {};
        snapshot.forEach((doc) => {
          const d = doc.data();
          newUsers[doc.id] = { ...d, uid: doc.id };
        });
        setUsers(newUsers);
        setUsersLoaded(true);
      },
      (e) => {
        console.log(e);
        setUsers({});
        setUsersLoaded(true);
      },
    );

    return () => {
      unsubscribe();
      setUsers({});
      setUsersLoaded(false);
    };
  }, []);

  return { users, usersLoaded };
};
export const useMessages = () => {
  const [messageArray, setMessageArray] = useState<Array<Message>>([]);
  const [messageArrayLoaded, setMessageArrayLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(getFirestore(), 'Messages').withConverter(
        firebaseConverter<RawMessage>(),
      ),
      (snapshot) => {
        const newMessageArray: Array<Message> = [];
        snapshot.forEach((doc) => {
          const d = doc.data();
          newMessageArray.push({ ...d, uid: doc.id });
        });
        setMessageArray(newMessageArray);
        setMessageArrayLoaded(true);
      },
      (e) => {
        console.log(e);
        setMessageArray([]);
        setMessageArrayLoaded(true);
      },
    );

    return () => {
      unsubscribe();
      setMessageArray([]);
      setMessageArrayLoaded(false);
    };
  }, []);

  return { messageArray, messageArrayLoaded };
};
