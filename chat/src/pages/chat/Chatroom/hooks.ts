import { useEffect, useMemo, useState } from 'react';

import { startOfDay } from 'date-fns';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';

import { firebaseConverter } from 'helpers';
import { Message, RawMessage, RawUser, User } from 'types';

const useUsers = () => {
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
// This way of loading messages is a little ugly but should be a quick solution
const useMessages = (messageCountToLoad: number) => {
  const [messageArray, setMessageArray] = useState<Array<Message>>([]);
  const [messageArrayLoaded, setMessageArrayLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(getFirestore(), 'Messages'),
        orderBy('dateCreated', 'desc'),
        limit(messageCountToLoad),
      ).withConverter(firebaseConverter<RawMessage>()),
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
    };
  }, [messageCountToLoad]);

  return { messageArray, messageArrayLoaded };
};

type ChatMessage = Message & {
  type: 'message';
  senderUser?: User;
};
type ChatDaySeperator = {
  type: 'daySeparator';
  timestamp: number;
};
export type ChatData = ChatMessage | ChatDaySeperator;
export const useChatDataArray = (messageCountToLoad: number) => {
  const { users, usersLoaded } = useUsers();
  const { messageArray, messageArrayLoaded } = useMessages(messageCountToLoad);

  const loaded = useMemo(
    () => messageArrayLoaded && usersLoaded,
    [messageArrayLoaded, usersLoaded],
  );

  const chatDataArray = useMemo(() => {
    const chatMessageArray: Array<ChatMessage> = messageArray.map(
      (message) => ({
        ...message,
        type: 'message',
        senderUser: users[message.senderUid],
      }),
    );

    const chatDataArray: Array<ChatData> = [];
    if (chatMessageArray.length > 0) {
      let previousStartOfDay = startOfDay(
        chatMessageArray[0].dateCreated,
      ).getTime();
      chatMessageArray.forEach((message) => {
        const thisMessagesStartOfDay = startOfDay(
          message.dateCreated,
        ).getTime();
        if (previousStartOfDay > thisMessagesStartOfDay) {
          chatDataArray.push({
            type: 'daySeparator',
            timestamp: previousStartOfDay,
          });
          previousStartOfDay = thisMessagesStartOfDay;
        }
        chatDataArray.push(message);
      });
      chatDataArray.push({
        type: 'daySeparator',
        timestamp: previousStartOfDay,
      });
    }
    return chatDataArray.reverse();
  }, [users, messageArray]);

  return { chatDataArray, loaded, loadedMessageCount: messageArray.length };
};
