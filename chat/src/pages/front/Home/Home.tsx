import { useAppContext } from 'contexts';
import React from 'react';
import { Link } from 'react-router-dom';

import { PanelWrapper, Panel } from './styledComponents';

export const Home: React.FC = () => {
  const { user } = useAppContext();
  return (
    <PanelWrapper>
      <Panel>
        <h1 style={{ textAlign: 'center' }}>Welcome to CasaChat</h1>
        {user?.permissions.includes('chat') ? (
          <Link to='/sign-in'>Sign In</Link>
        ) : (
          <Link to='/chat/chatroom'>Right this way</Link>
        )}
      </Panel>
    </PanelWrapper>
  );
};
