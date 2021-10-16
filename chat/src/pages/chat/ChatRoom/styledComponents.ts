import styled from 'styled-components';

import { colors } from 'theme';

export const ChatContainer = styled.div``;
export const ChatBody = styled.div``;
export const MessageWrapper = styled.div``;
export const MessageSenderName = styled.span`
  display: block;
  font-size: 1.25rem;
  line-height: 1;
`;
export const MessageTime = styled.span`
  font-size: 1.25rem;
  line-height: 1;
  color: ${colors.darkerGray};
`;
export const MessageText = styled.span`
  font-size: 1.25rem;
  line-height: 1.5;
`;
export const ChatLoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ChatLoadingMessage = styled.span`
  text-align: center;
  font-size: 2rem;
`;
export const ChatInputConatiner = styled.form`
  padding: 0.5rem 0.3rem;
  display: flex;
  align-items: center;
`;
export const ChatInput = styled.input`
  font-size: 1.25rem;
  padding: 0.15rem 0.1rem;
  border-radius: 50%;
  margin-right: 1rem;
  flex: 1;
`;
export const ChatSendButton = styled.button`
  border-radius: 50%;
  padding: 0.15rem 0.1rem;
  font-size: 1.25rem;
  border: none;
  background-color: ${colors.primary};
  color: ${colors.white};
`;
