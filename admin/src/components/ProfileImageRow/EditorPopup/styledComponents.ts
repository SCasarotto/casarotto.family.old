import { FaUndo, FaRedo } from 'react-icons/fa';
import { Button, FormRow as FR } from 'react-tec';
import styled from 'styled-components';

export const Container = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 15px;
`;
export const Row = styled(FR)`
  text-align: center;
`;
export const RotateButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const RotateButton = styled(Button)`
  width: auto;
  margin-left: 10px;
  margin-right: 10px;
`;
export const UndoRotationIcon = styled(FaUndo)`
  display: block;
`;
export const RedoRotationIcon = styled(FaRedo)`
  display: block;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LeftButton = styled(Button)`
  border-top: 1px solid ${(props) => props.theme.primary};
  border-right: 1px solid ${(props) => props.theme.primary};
  border-bottom: none;
  border-left: none;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 0px;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 18px;

  :active,
  :hover {
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.primary};
    border-top: 1px solid ${(props) => props.theme.primary};
    border-right: 1px solid ${(props) => props.theme.primary};
    border-bottom: none;
    border-left: none;
  }
`;
export const RightButton = styled(Button)`
  border-top: 1px solid ${(props) => props.theme.primary};
  border-right: none;
  border-bottom: none;
  border-left: 1px solid ${(props) => props.theme.primary};
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 18px;

  :active,
  :hover {
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.primary};
    border-top: 1px solid ${(props) => props.theme.primary};
    border-right: none;
    border-bottom: none;
    border-left: 1px solid ${(props) => props.theme.primary};
  }
`;
