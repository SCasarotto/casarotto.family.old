import {
  FormEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import useStayScrolled from 'react-stay-scrolled';
import { Spinner, usePopups } from 'react-tec';

import { getMessageSoundUrl } from 'assets/sounds';
import { useAppContext } from 'contexts';

import { ChatroomDaySeparator } from './ChatroomDaySeparator';
import { ChatroomMessage } from './ChatroomMessage';
import { useChatDataArray, useNewMessageSound } from './hooks';
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
  const { user } = useAppContext();

  const [messageCountToLoad, setMessageCountToLoad] = useState(10);
  const { chatDataArray, loaded, messageArray } =
    useChatDataArray(messageCountToLoad);
  const loadedMessageCount = messageArray.length;

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

  // Get Latest Message assuming its sorted new to old
  const latestMessage = useMemo(
    () => messageArray?.[0] ?? null,
    [messageArray],
  );
  // Play Audio on New Message
  useNewMessageSound({
    latestMessage,
    soundUrl: getMessageSoundUrl(user?.chatSettings?.messageSound),
    disabled: user?.chatSettings?.messageSound === 'None',
  });

  // Input Form
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        await sendMessage({ message: messageText.trim(), popupFunctions });
        setMessageText('');
      } catch (e) {
        console.error(e);
      }
    },
    [messageText, popupFunctions],
  );

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
