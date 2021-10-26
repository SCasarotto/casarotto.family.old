import { FormEvent, useLayoutEffect, useRef, useState } from 'react';

import useStayScrolled from 'react-stay-scrolled';
import { Spinner, usePopups } from 'react-tec';

import { formatDate } from 'helpers';

import { useChatDataArray } from './hooks';
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
  DaySeparatorContainer,
  DaySeparatorLine,
  DaySeparatorTextWrapper,
  DaySeparatorText,
} from './styledComponents';
import { format, isToday, isYesterday } from 'date-fns';

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
        {loaded &&
          chatDataArray.map((chatData) => {
            switch (chatData.type) {
              case 'message': {
                const { uid, dateCreated, message, senderUser } = chatData;
                const { firstName, lastName } = senderUser ?? {};
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
              }
              case 'daySeparator': {
                const { timestamp } = chatData;
                return (
                  <DaySeparatorContainer>
                    <DaySeparatorLine />
                    <DaySeparatorTextWrapper>
                      <DaySeparatorText>
                        {isToday(timestamp)
                          ? 'Today'
                          : isYesterday(timestamp)
                          ? 'Yesterday'
                          : format(timestamp, 'iiii, LLLL do')}
                      </DaySeparatorText>
                    </DaySeparatorTextWrapper>
                  </DaySeparatorContainer>
                );
              }
              default:
                return null;
            }
          })}
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
