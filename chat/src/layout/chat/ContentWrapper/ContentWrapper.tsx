import React from 'react';

import { getAuth } from 'firebase/auth';
import { Switch, RouteChildrenProps, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from 'react-tec';

import { useAppContext } from 'contexts';
import { Navbar } from 'layout/chat/Navbar';
import { ChatRoom } from 'pages/chat/ChatRoom';
import { NotFound } from 'pages/chat/NotFound';

import { Wrapper } from './styledComponents';

const authChecks = [
  {
    check: () => !!getAuth()?.currentUser,
    path: '/',
  },
];

interface Props extends RouteChildrenProps {}
export const ContentWrapper: React.FC<Props> = (props) => {
  const { history } = props;
  const { user, userLoaded } = useAppContext();

  //If User Loaded with No User => Kick them out
  if (userLoaded && !user) {
    return <Redirect to='/' />;
  }

  //If User Loaded with User => Wait for AppVersions && userModelLoaded && companyLoaded
  if (!userLoaded) {
    return null; //Still Loading
  }

  return (
    <>
      <Navbar history={history} />
      <Wrapper>
        <Switch>
          <PrivateRoute
            path='/chat/chat-room'
            authChecks={authChecks}
            component={ChatRoom}
          />

          <Route component={NotFound} />
        </Switch>
      </Wrapper>
    </>
  );
};
