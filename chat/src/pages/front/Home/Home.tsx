import React from 'react';

import { Link } from 'react-router-dom';

import { useAppContext } from 'contexts';

import {
  PanelWrapper,
  Panel,
  ActionWrapper,
  ActionTitle,
  ActionLink,
} from './styledComponents';

export const Home: React.FC = () => {
  const { user } = useAppContext();
  return (
    <PanelWrapper>
      <Panel>
        <h1 style={{ textAlign: 'center' }}>Welcome to CasaChat</h1>
        {user?.permissions.includes('chat') ? (
          <ActionWrapper>
            <ActionTitle>Looks like you are already signed in.</ActionTitle>
            <ActionLink to='/chat/chatroom'>Right this way</ActionLink>
          </ActionWrapper>
        ) : (
          <ActionWrapper>
            <ActionTitle>You will need to sign in to continue.</ActionTitle>
            <Link to='/sign-in'>Sign In</Link>
          </ActionWrapper>
        )}
      </Panel>
    </PanelWrapper>
  );
};
