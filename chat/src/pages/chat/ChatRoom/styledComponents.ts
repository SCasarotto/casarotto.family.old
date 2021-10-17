import styled from 'styled-components';

import { colors } from 'theme';

export const ChatContainer = styled.div`
  max-width: 100ch;
  margin-left: auto;
  margin-right: auto;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
`;
export const ChatBody = styled.div`
  flex-grow: 1;
`;
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
  line-height: 1;
  padding: 0.375rem 1rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
  flex: 1;
  border: 1px solid ${colors.primary};
`;
export const ChatSendButton = styled.button`
  border-radius: 0.5rem;
  padding: 0.5rem 1.75rem;
  font-size: 1.25rem;
  line-height: 1;
  border: none;
  background-color: ${colors.primary};
  color: ${colors.white};
  cursor: pointer;
  margin: 0px;
`;
