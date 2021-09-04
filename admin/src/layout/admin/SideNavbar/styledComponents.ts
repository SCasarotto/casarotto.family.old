import { Link } from 'react-router-dom';
import { SideNavbar } from 'react-tec';
import styled from 'styled-components';

export const StyledSideNavbar = styled(SideNavbar)<{ sideNavActive?: boolean }>`
  left: ${(props) => (props.sideNavActive ? '0px' : '-200px')};
  transition: left 0.25s ease-in-out, width 0.25s ease-in-out;

  @media (max-width: 1000px) {
    left: ${(props) => (props.sideNavActive ? '0px' : '-180px')};
    width: 180px;
  }
  @media (max-width: 800px) {
    left: ${(props) => (props.sideNavActive ? '0px' : '-160px')};
    width: 160px;
  }
  @media (max-width: 650px) {
    left: ${(props) => (props.sideNavActive ? '0px' : '-140px')};
    width: 140px;
  }
`;

export const LogoWrapper = styled.div`
  height: 130px;
  /* border-bottom: 1px solid ${(props) => props.theme.lighterGray}; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 20px;
  text-align: center;
`;
export const LogoLink = styled(Link)`
  text-decoration: none;
  height: 100%;
`;
export const LogoImage = styled.img`
  display: block;
  height: 100%;
`;
