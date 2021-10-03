import React, { useContext } from 'react';

import { getAuth } from 'firebase/auth';
import { RouteChildrenProps } from 'react-router';

import { TitleBarContext } from 'contexts';
import { useSideNavActiveContext } from 'hooks';

import {
  Container,
  Content,
  LeftWrapper,
  SlideNavButton,
  SlideNavIcon,
  Title,
  RightWrapper,
  SignOutButton,
} from './styledComponents';

interface Props {
  history: RouteChildrenProps['history'];
}
export const Navbar: React.FC<Props> = (props) => {
  const { history } = props;
  const { setSideNavActive } = useSideNavActiveContext();
  const { barTitle } = useContext(TitleBarContext);

  const handleSignOut = () => {
    getAuth().signOut();
    history.push('/');
  };

  return (
    <Container>
      <Content>
        <LeftWrapper>
          <SlideNavButton onClick={() => setSideNavActive((active) => !active)}>
            <SlideNavIcon />
          </SlideNavButton>
          <Title>{barTitle}</Title>
        </LeftWrapper>
        <RightWrapper>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </RightWrapper>
      </Content>
    </Container>
  );
};
