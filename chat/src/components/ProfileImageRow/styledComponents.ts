import { FaUpload, FaRegWindowClose } from 'react-icons/fa';
import { Button } from 'react-tec';
import styled from 'styled-components';

export const ImageWrapperLabel = styled.label`
  display: inline-block;
  border: 1px solid ${(props) => props.theme.lightGray};
  border-radius: 5px;
  width: auto;
  cursor: pointer;
  transition: border-color 0.2s ease-in;
  overflow: hidden;
  position: relative;
  box-shadow: none;

  :focus,
  :active {
    border: 1px solid ${(props) => props.theme.primary};
    box-shadow: 0 0 0 1px ${(props) => props.theme.primary} inset;
  }
  @media (hover: hover) and (pointer: fine) {
    :hover {
      border: 1px solid ${(props) => props.theme.primary};
      box-shadow: 0 0 0 1px ${(props) => props.theme.primary} inset;
    }
  }
`;
export const Image = styled.img`
  width: 120px;
  height: 120px;
  display: block;
`;
export const ClearButton = styled(Button)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 3px;
  right: 3px;
  width: auto;
  padding: 5px;
  text-align: center;
`;
export const ClearButtonIcon = styled(FaRegWindowClose)`
  display: block;
  font-size: 14px;
`;
export const UploadIcon = styled(FaUpload)`
  font-size: 120px;
  color: ${(props) => props.theme.lightGray};
  padding: 15px;
  display: block;
`;
export const Input = styled.input`
  display: none;
`;
