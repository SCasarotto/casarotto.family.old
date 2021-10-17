import React from 'react';

import { Redirect } from 'react-router-dom';

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
          <Redirect to='/chat/chatroom' />
        ) : (
          <ActionWrapper>
            <ActionTitle>You will need to sign in to continue.</ActionTitle>
            <ActionLink to='/sign-in'>Sign In</ActionLink>
          </ActionWrapper>
        )}
      </Panel>
    </PanelWrapper>
  );
};
