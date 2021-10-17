import { Button } from 'react-tec';
import styled from 'styled-components';

export const PanelActionButton = styled(Button)`
  font-size: 16px;
  flex-shrink: 0;
  width: auto;
  margin-left: 5px;

  @media (max-width: 800px) {
    font-size: 15px;
    padding: 5px 15px;
  }
  @media (max-width: 650px) {
    font-size: 14px;
    padding: 5px 10px;
  }
`;
