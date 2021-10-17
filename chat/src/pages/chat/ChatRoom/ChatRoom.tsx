import { FormEvent, useState } from 'react';

import { Spinner, usePopups } from 'react-tec';

import { formatDate } from 'helpers';

import { useMessages, useUsers } from './hooks';
import { sendMessage } from './requests';
import {
  ChatContainer,
  ChatBody,
  MessageWrapper,
  MessageSenderName,
  MessageTime,
  MessageText,
  ChatLoadingWrapper,
  ChatLoadingMessage,
  ChatInputConatiner,
  ChatInput,
  ChatSendButton,
} from './styledComponents';

// TODO:
//  - Only Load the most recent messages
//  - Paginate
//  - Virtualize
//  - Scroll To Bottom Logic
//  - Update Style
//  - Convert input to textarea and handle return vs submit
//  - Find chat link parser

export const Chatroom = () => {
  const popupFunctions = usePopups();
  const { users, usersLoaded } = useUsers();
  const { messageArray, messageArrayLoaded } = useMessages();

  const [messageText, setMessageText] = useState('');

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage({ message: messageText, popupFunctions });
      setMessageText('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ChatContainer>
      <ChatBody>
        {messageArrayLoaded && usersLoaded ? (
          messageArray.map((messageData) => {
            const { uid, dateCreated, senderUid, message } = messageData;
            const { firstName, lastName } = users[senderUid] ?? {};
            return (
              <MessageWrapper key={uid}>
                <MessageSenderName>
                  {firstName} {lastName}
                </MessageSenderName>
                <MessageTime>
                  {formatDate({
                    date: dateCreated,
                    defaultFormat: 'datetimeShort',
                  })}
                </MessageTime>
                <MessageText>{message}</MessageText>
              </MessageWrapper>
            );
          })
        ) : (
          <ChatLoadingWrapper>
            <Spinner size='large' />
            <ChatLoadingMessage>Loading...</ChatLoadingMessage>
          </ChatLoadingWrapper>
        )}
      </ChatBody>
      <ChatInputConatiner onSubmit={handleSendMessage}>
        <ChatInput
          placeholder='Write a message...'
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
        />
        <ChatSendButton type='submit' disabled={!messageText}>
          Send
        </ChatSendButton>
      </ChatInputConatiner>
    </ChatContainer>
  );
};
