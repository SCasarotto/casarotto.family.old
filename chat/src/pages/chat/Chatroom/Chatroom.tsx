import { FormEvent, useLayoutEffect, useRef, useState } from 'react';

import useStayScrolled from 'react-stay-scrolled';
import { Spinner, usePopups } from 'react-tec';

import { ChatroomDaySeparator } from './ChatroomDaySeparator';
import { ChatroomMessage } from './ChatroomMessage';
import { useChatDataArray } from './hooks';
import { sendMessage } from './requests';
import {
  ChatContainer,
  ChatBody,
  LoadMoreButtonWrapper,
  LoadMoreButton,
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

  const [messageCountToLoad, setMessageCountToLoad] = useState(10);
  const { chatDataArray, loaded, loadedMessageCount } =
    useChatDataArray(messageCountToLoad);

  // Scroll To Bottom
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { stayScrolled, scrollBottom } = useStayScrolled(chatBodyRef);
  // Initial Scroll To Bottom
  useLayoutEffect(() => {
    if (loaded) {
      scrollBottom();
    }
  }, [loaded, scrollBottom]);

  // Keep scrolled to bottom
  useLayoutEffect(() => {
    stayScrolled();
  }, [loadedMessageCount, stayScrolled]);

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

  return (
    <ChatContainer>
      <ChatBody ref={chatBodyRef}>
        {loaded && loadedMessageCount === messageCountToLoad && (
          <LoadMoreButtonWrapper>
            <LoadMoreButton
              onClick={() => setMessageCountToLoad((c) => c + 10)}
              type='button'
            >
              Load More
            </LoadMoreButton>
          </LoadMoreButtonWrapper>
        )}
        {!loaded && (
          <ChatLoadingWrapper>
            <Spinner size='large' />
            <ChatLoadingMessage>Loading...</ChatLoadingMessage>
          </ChatLoadingWrapper>
        )}
        {loaded &&
          chatDataArray.map((chatData) => {
            switch (chatData.type) {
              case 'message': {
                const { type, ...rest } = chatData;
                return <ChatroomMessage {...rest} key={chatData.uid} />;
              }
              case 'daySeparator': {
                const { timestamp } = chatData;
                return (
                  <ChatroomDaySeparator timestamp={timestamp} key={timestamp} />
                );
              }
              default:
                return null;
            }
          })}
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
