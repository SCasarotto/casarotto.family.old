import defaultProfile from 'assets/images/defaultProfile.jpg';
import { formatDate } from 'helpers';
import { useDownloadUrlWithRetries } from 'hooks';
import { Message, User } from 'types';


import {
  MessageWrapper,
  MessageProfile,
  MessageSenderName,
  MessageTime,
  MessageText,
} from './styledComponents';

type Props = Message & { senderUser?: User };
export const ChatroomMessage = (props: Props) => {
  const { dateCreated, message, senderUser } = props;
  const { firstName, lastName, profile } = senderUser ?? {};

  const profileUrl = useDownloadUrlWithRetries({ path: profile?.small });

  return (
    <MessageWrapper>
      <MessageProfile src={profileUrl ?? defaultProfile} alt='profile' />
      <div>
        <MessageSenderName>
          {firstName} {lastName}
        </MessageSenderName>
        <MessageTime>
          {formatDate({
            date: dateCreated,
            defaultFormat: 'datetimeShort',
          })}
        </MessageTime>
        <MessageText tagName='span' options={{ defaultProtocol: 'https' }}>
          {message}
        </MessageText>
      </div>
    </MessageWrapper>
  );
};
