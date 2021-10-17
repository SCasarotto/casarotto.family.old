import { FormEvent, useLayoutEffect, useRef, useState } from 'react';

import useStayScrolled from 'react-stay-scrolled';
import { Spinner, usePopups } from 'react-tec';

import { formatDate } from 'helpers';

import { useMessages, useUsers } from './hooks';
import { sendMessage } from './requests';
import {
  ChatContainer,
  ChatBody,
  LoadMoreButtonWrapper,
  LoadMoreButton,
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
//  - Update Style
//  - Convert input to textarea and handle return vs submit

export const Chatroom = () => {
  const popupFunctions = usePopups();
  const { users, usersLoaded } = useUsers();

  const [messageCountToLoad, setMessageCountToLoad] = useState(10);
  const { messageArray, messageArrayLoaded } = useMessages(messageCountToLoad);

  // Scroll To Bottom
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { stayScrolled, scrollBottom } = useStayScrolled(chatBodyRef);
  // Initial Scroll To Bottom
  useLayoutEffect(() => {
    if (messageArrayLoaded) {
      scrollBottom();
    }
  }, [messageArrayLoaded, scrollBottom]);

  // Keep scrolled to bottom
  useLayoutEffect(() => {
    stayScrolled();
  }, [messageArray.length, stayScrolled]);

  // Input Form
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage({ message: messageText.trim(), popupFunctions });
      setMessageText('');
    } catch (e) {
      console.error(e);
    }
  };

  const allLoaded = messageArrayLoaded && usersLoaded;

  return (
    <ChatContainer>
      <ChatBody ref={chatBodyRef}>
        {allLoaded &&
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
                <MessageText
                  tagName='span'
                  options={{ defaultProtocol: 'https' }}
                >
                  {message}
                </MessageText>
              </MessageWrapper>
            );
          })}
        {allLoaded && messageArray.length === messageCountToLoad && (
          <LoadMoreButtonWrapper>
            <LoadMoreButton
              onClick={() => setMessageCountToLoad((c) => c + 10)}
              type='button'
            >
              Load More
            </LoadMoreButton>
          </LoadMoreButtonWrapper>
        )}
        {!allLoaded && (
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSendMessage(e);
            }
          }}
        />
        <ChatSendButton type='submit' disabled={!messageText}>
          Send
        </ChatSendButton>
      </ChatInputConatiner>
    </ChatContainer>
  );
};
