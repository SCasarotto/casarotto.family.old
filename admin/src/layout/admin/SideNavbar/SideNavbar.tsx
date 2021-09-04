import logo from 'assets/images/logo.png';
import { useSideNavActiveContext } from 'hooks';

import {
  StyledSideNavbar,
  LogoWrapper,
  LogoLink,
  LogoImage,
} from './styledComponents';

export const SideNavbar = () => {
  const { sideNavActive } = useSideNavActiveContext();

  return (
    <StyledSideNavbar
      sideNavActive={sideNavActive}
      Header={
        <LogoWrapper>
          <LogoLink to='/'>
            <LogoImage src={logo} alt='Casarotto Family Crest' />
          </LogoLink>
        </LogoWrapper>
      }
      links={[
        { title: 'Dashboard', to: '/admin/dashboard' },
        { title: 'Users', to: '/admin/users' },
      ]}
    />
  );
};
