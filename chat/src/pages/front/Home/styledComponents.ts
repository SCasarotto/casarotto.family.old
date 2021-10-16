import { PanelWrapper as TecPanelWrapper, Panel as TecPanel } from 'react-tec';
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
