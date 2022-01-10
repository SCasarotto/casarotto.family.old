import { FaVolumeUp } from 'react-icons/fa';

import defaultProfile from 'assets/images/defaultProfile.jpg';
import {
  canUseDarkTextWithBackgroundColor,
  formatDate,
  textToSpeech,
} from 'helpers';
import { useDownloadUrlWithRetries } from 'hooks';
import { Message, User } from 'types';

import {
  MessageWrapper,
  MessageProfile,
  MessageSenderName,
  MessageTime,
  MessageText,
  MessageSpeakButton,
} from './styledComponents';

type Props = Message & { senderUser?: User };
export const ChatroomMessage = (props: Props) => {
  const { dateCreated, message, senderUser } = props;
  const { firstName, lastName, profile, chatSettings } = senderUser ?? {};
  const { messageBackgroundColor } = chatSettings ?? {};
  const lightText = messageBackgroundColor
    ? !canUseDarkTextWithBackgroundColor(messageBackgroundColor)
    : undefined;

  const profileUrl = useDownloadUrlWithRetries({ path: profile?.small });

  return (
    <MessageWrapper
      customBackgroundColor={messageBackgroundColor ?? undefined}
      lightText={lightText}
    >
      <MessageProfile src={profileUrl ?? defaultProfile} alt='profile' />
      <div>
        <MessageSenderName>
          {firstName} {lastName}{' '}
          <MessageTime>
            {formatDate({
              date: dateCreated,
              defaultFormat: 'time',
            })}
          </MessageTime>
        </MessageSenderName>
        <MessageText tagName='span' options={{ defaultProtocol: 'https' }}>
          {message}
        </MessageText>
      </div>
      <MessageSpeakButton
        onClick={() => textToSpeech(message)}
        lightText={lightText}
      >
        <FaVolumeUp />
      </MessageSpeakButton>
    </MessageWrapper>
  );
};
