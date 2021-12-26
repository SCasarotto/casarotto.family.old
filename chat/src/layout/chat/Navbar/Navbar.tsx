import React, { useCallback, useState } from 'react';

import { getAuth } from 'firebase/auth';
import { FaComments, FaUser } from 'react-icons/fa';
import { RouteChildrenProps } from 'react-router';
import { Alert } from 'react-tec';

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
  NavButton,
  NavButtonIcon,
  NavAlertContent,
} from './styledComponents';

const links = [
  {
    to: '/chat/chatroom',
    Icon: FaComments,
    label: 'Chatroom',
  },
  {
    to: '/chat/profile',
    Icon: FaUser,
    label: 'Profile',
  },
];

type Props = {
  history: RouteChildrenProps['history'];
};
export const Navbar: React.FC<Props> = (props) => {
  const { history } = props;
  const [visible, setVisible] = useState(false);

  const handleSignOut = useCallback(() => {
    getAuth().signOut();
    history.push('/');
  }, [history]);

  return (
    <Container>
      <Content>
        <LeftWrapper>
          <LogoImage src={logo} />
          <Title>CasaChat</Title>
        </LeftWrapper>
        <RightWrapper>
          <NavButton onClick={() => setVisible(true)}>
            <NavButtonIcon />
          </NavButton>
        </RightWrapper>
      </Content>
      <Alert
        visible={visible}
        onClick={() => setVisible(false)}
        buttonTitle='Close'
      >
        <NavAlertContent>
          {links.map((link) => {
            const { Icon, label, to } = link;
            return (
              <NavLink key={to} to={to} onClick={() => setVisible(false)}>
                <Icon /> {label}
              </NavLink>
            );
          })}
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </NavAlertContent>
      </Alert>
    </Container>
  );
};
