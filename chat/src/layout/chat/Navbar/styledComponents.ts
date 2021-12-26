import { NavLink as NL } from 'react-router-dom';
import { Button } from 'react-tec';
import styled from 'styled-components';

import { NavIcon } from 'assets/SVGs/NavIcon';
import { colors } from 'theme';

export const Container = styled.nav`
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 60px;
  background-color: ${(props) => props.theme.white};

  @media (max-width: 800px) {
    height: 50px;
  }
  @media (max-width: 650px) {
    height: 45px;
  }

  @media print {
    display: none;
  }
`;
export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100%;
`;
export const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const LogoImage = styled.img`
  display: inline-block;
  height: 40px;
  margin-right: 10px;

  @media (max-width: 800px) {
    height: 35px;
  }
  @media (max-width: 650px) {
    height: 30px;
  }
`;
export const Title = styled.h1`
  font-size: 28px;
  margin-top: 0px;
  margin-bottom: 0px;
  color: ${(props) => props.theme.primary};

  @media (max-width: 1000px) {
    font-size: 26px;
  }
  @media (max-width: 800px) {
    font-size: 24px;
  }
  @media (max-width: 650px) {
    font-size: 20px;
  }
`;
export const RightWrapper = styled.div``;
export const NavButton = styled(Button)`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin-right: 10px;
  background-color: transparent;
`;
export const NavButtonIcon = styled(NavIcon)`
  width: 24px;
  height: auto;
  fill: currentColor;
  display: block;
`;
export const NavAlertContent = styled.div`
  padding: 30px;
`;
export const NavLink = styled(NL)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 0.3rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  color: ${colors.darkerGray};
  background-color: 'transparent';
  border: 1px solid ${colors.lightGray};
  transition: color 0.2s ease-in, background-color 0.2s ease-in,
    border-color 0.2s ease-in;
  text-align: center;

  &.active {
    color: ${colors.white};
    background-color: ${colors.primary};
    border-color: ${colors.primary};
  }
  :active {
    color: ${colors.white};
    background-color: ${colors.primary};
    border-color: ${colors.primary};
  }
  @media (hover: hover) and (pointer: fine) {
    :hover {
      color: ${colors.white};
      background-color: ${colors.primary};
      border-color: ${colors.primary};
    }
  }

  svg {
    display: block;
    margin-right: 0.5rem;
    font-size: 1.3rem;
  }
`;
export const SignOutButton = styled(Button)`
  margin-top: 30px;
`;
