import React from 'react';

import { getAuth } from 'firebase/auth';
import { RouteChildrenProps } from 'react-router';

import logo from 'assets/images/logo.png';

import {
  Container,
  Content,
  LeftWrapper,
  LogoImage,
  Title,
  RightWrapper,
  NavLink,
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
          <NavLink to='/chat/chatroom'>Chatroom</NavLink>
          <NavLink to='/chat/Profile'>Profile</NavLink>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </RightWrapper>
      </Content>
    </Container>
  );
};
