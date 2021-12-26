import { Link } from 'react-router-dom';
import {
  PanelWrapper as TecPanelWrapper,
  Panel as TecPanel,
  Form as TecForm,
  InputRow,
  Button as TecButton,
} from 'react-tec';
import styled from 'styled-components';

export const PanelWrapper = styled(TecPanelWrapper)`
  align-items: center;
  justify-content: center;
  background-size: cover;
  padding-top: 150px;

  @media (max-height: 700px) {
    padding-top: 100px;
  }
  @media (max-height: 600px) {
    padding-top: 50px;
  }
`;
export const Panel = styled(TecPanel)`
  max-width: 700px;
  padding: 60px;

  @media (max-width: 800px) {
    padding: 50px;
  }
  @media (max-width: 700px) {
    padding: 40px;
  }
  @media (max-width: 600px) {
    padding: 30px;
  }
`;
export const Form = styled(TecForm)`
  background-color: ${(props) => props.theme.primary};
  padding: 40px;
  border-radius: 5px;

  @media (max-width: 800px) {
    padding: 30px;
  }
  @media (max-width: 700px) {
    padding: 25px;
  }
  @media (max-width: 600px) {
    padding: 20px;
  }
`;
export const Title = styled.h1`
  color: ${(props) => props.theme.white};
  font-size: 2.5rem;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 2rem;

  @media (max-width: 800px) {
    font-size: 2.25rem;
    margin-bottom: 1.75rem;
  }
  @media (max-width: 700px) {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 600px) {
    font-size: 2rem;
    margin-bottom: 1.25rem;
  }
`;
export const Input = styled(InputRow)`
  .InputRowInput {
    border: none;
    padding: 10px;

    :active {
      border: none;
      box-shadow: none;
    }
    @media (hover: hover) and (pointer: fine) {
      :hover {
        border: none;
        box-shadow: none;
      }
    }
  }

  .InputRowTitle {
    display: none;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Forgot = styled(Link)`
  color: ${(props) => props.theme.white};
  font-size: 1.25rem;

  @media (max-width: 800px) {
    font-size: 1.2rem;
  }
  @media (max-width: 700px) {
    font-size: 1.1rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;
export const Button = styled(TecButton)`
  width: auto;
  padding: 0.65rem 3rem;
  border: 1px solid ${(props) => props.theme.white};
  font-size: 1.25rem;

  :active {
    border: 1px solid ${(props) => props.theme.white};
  }

  @media (hover: hover) and (pointer: fine) {
    :hover {
      border: 1px solid ${(props) => props.theme.white};
    }
  }

  @media (max-width: 800px) {
    font-size: 1.2rem;
    padding: 0.5rem 2.5rem;
  }
  @media (max-width: 700px) {
    font-size: 1.1rem;
    padding: 0.4rem 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.35rem 1.5rem;
  }
`;
