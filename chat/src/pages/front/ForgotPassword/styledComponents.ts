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
`;
export const Panel = styled(TecPanel)`
  max-width: 700px;
  padding: 60px;
`;
export const Form = styled(TecForm)`
  background-color: ${(props) => props.theme.primary};
  padding: 40px;
  border-radius: 5px;
`;
export const Title = styled.h1`
  color: ${(props) => props.theme.white};
  font-size: 44px;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 2rem;
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
  justify-content: center;
`;

export const Button = styled(TecButton)`
  width: auto;
  padding: 10px 50px;
  border: 1px solid ${(props) => props.theme.white};
  :active {
    border: 1px solid ${(props) => props.theme.white};
  }
  @media (hover: hover) and (pointer: fine) {
    :hover {
      border: 1px solid ${(props) => props.theme.white};
    }
  }
`;

export const SignIn = styled(Link)`
  color: ${(props) => props.theme.white};
  font-size: 18px;
  text-align: center;
  display: block;
  margin-top: 2rem;
`;
