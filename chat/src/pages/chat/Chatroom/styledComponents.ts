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

  @media (max-width: 800px) {
    height: calc(100vh - 50px);
  }
  @media (max-width: 650px) {
    height: calc(100vh - 45px);
  }
`;
export const ChatBody = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column-reverse;
`;

//
// Load More
//
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

//
// Chat Message
//
export const MessageWrapper = styled.div`
  position: relative;
  background-color: ${colors.lighterGray};
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
`;
export const MessageProfile = styled.img`
  display: block;
  margin-right: 0.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 0.4rem;
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
export const MessageSpeakButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  padding: 10px;
  font-size: 1.25rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  background: none;
  color: ${colors.darkerGray};

  transition: color 0.2s ease-in;

  :hover,
  :active {
    color: ${colors.darkGray};
  }

  svg {
    display: block;
  }
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

//
// Day Separator
//

export const DaySeparatorContainer = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 0.5rem;
`;
export const DaySeparatorLine = styled.div`
  height: 1px;
  width: 100%;
  position: absolute;
  left: 0;
  top: calc(2.5rem / 2);
  background-color: ${colors.lightGray};
`;
export const DaySeparatorTextWrapper = styled.div`
  height: 2.5rem;
  padding: 0px 1.25rem;
  border: 1px solid ${colors.lightGray};
  border-radius: calc(2.5rem / 2);
  background-color: ${colors.white};
  width: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
export const DaySeparatorText = styled.span`
  text-align: center;
  display: block;
  color: ${colors.darkerGray};
  font-size: 1.15rem;
  font-weight: 600;
`;
