import { Button } from 'react-tec';
import styled from 'styled-components';

import { NavLink as NL } from 'react-router-dom';
import { colors } from 'theme';

export const Container = styled.nav`
  width: 100%;
  padding-left: 10px;
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
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 100%;

  @media (max-width: 450px) {
    padding-right: 20px;
  }
`;
export const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const LogoImage = styled.img`
  display: inline-block;
  height: 40px;
  margin-right: 10px;
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
export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const NavLink = styled(NL)`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.25rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  color: ${colors.darkerGray};
  border-bottom: 4px solid transparent;
  transition: color 0.2s ease-in, border-color 0.2s ease-in;

  &.active {
    color: ${colors.primary};
    border-bottom-color: ${colors.primary};
  }
  :active,
  :hover {
    color: ${colors.primary};
    border-bottom-color: ${colors.primary};
  }
`;
export const SignOutButton = styled(Button)`
  border: none;
  width: auto;
  padding: 0px;
  font-size: 1rem;
  background-color: transparent;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  padding-bottom: 0.25rem;

  :active,
  :hover {
    border: none;
    color: ${(props) => props.theme.primary};
    background: transparent;
  }

  @media (max-width: 800px) {
    font-size: 15px;
  }
  @media (max-width: 650px) {
    font-size: 14px;
  }
`;
