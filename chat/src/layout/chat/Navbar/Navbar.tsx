import React from 'react';

import { getAuth } from 'firebase/auth';
import { RouteChildrenProps } from 'react-router';
import { NavLink } from 'react-router-dom';

import logo from 'assets/images/logo.png';

import {
  Container,
  Content,
  LeftWrapper,
  LogoImage,
  Title,
  RightWrapper,
  SignOutButton,
} from './styledComponents';

interface Props {
  history: RouteChildrenProps['history'];
}
export const Navbar: React.FC<Props> = (props) => {
  const { history } = props;

  const handleSignOut = () => {
    getAuth().signOut();
    history.push('/');
  };

  return (
    <Container>
      <Content>
        <LeftWrapper>
          <LogoImage src={logo} />
          <Title>CasaChat</Title>
        </LeftWrapper>
        <RightWrapper>
          <NavLink to='/chat/chat-room'>Chat</NavLink>
          <NavLink to='/chat/settings'>Settings</NavLink>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </RightWrapper>
      </Content>
    </Container>
  );
};
