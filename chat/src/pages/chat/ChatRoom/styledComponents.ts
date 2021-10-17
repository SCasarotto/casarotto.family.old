import Linkify from 'linkify-react';
import styled from 'styled-components';

import { colors } from 'theme';

export const ChatContainer = styled.div`
  max-width: 100ch;
  margin-left: auto;
  margin-right: auto;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
`;
export const ChatBody = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column-reverse;
`;
export const LoadMoreButtonWrapper = styled.div`
  text-align: center;
`;
export const LoadMoreButton = styled.button`
  border-radius: 1.5rem;
  padding: 0.5rem 3rem;
  font-size: 1rem;
  line-height: 1;
  font-weight: 600;
  border: none;
  background-color: ${colors.darkGray};
  color: ${colors.white};
  cursor: pointer;
  margin-bottom: 1rem;
  display: inline-block;

  transition: background-color 0.2s ease-in;

  :active,
  :hover {
    background-color: ${colors.gray};
  }
`;
export const MessageWrapper = styled.div`
  background-color: ${colors.lighterGray};
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
`;
export const MessageSenderName = styled.span`
  font-weight: 600;
  display: block;
  font-size: 1.1rem;
  line-height: 1;
`;
export const MessageTime = styled.span`
  display: block;
  font-size: 0.85rem;
  line-height: 1;
  color: ${colors.darkerGray};
  margin-bottom: 0.25rem;
`;
export const MessageText = styled(Linkify)`
  font-size: 1rem;
  line-height: 1.25;
  white-space: pre-wrap;
`;
export const ChatLoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
`;
export const ChatLoadingMessage = styled.span`
  text-align: center;
  font-size: 2rem;
`;
export const ChatInputConatiner = styled.form`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
`;
export const ChatInput = styled.textarea`
  font-size: 1.25rem;
  line-height: 1;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
  flex: 1;
  border: 1px solid ${colors.primary};
`;
export const ChatSendButton = styled.button`
  border-radius: 0.5rem;
  padding: 1rem 1.75rem;
  font-size: 1.25rem;
  line-height: 1;
  border: none;
  background-color: ${colors.primary};
  color: ${colors.white};
  cursor: pointer;
  margin: 0px;
  font-weight: 600;
`;
