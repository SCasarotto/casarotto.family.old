import { PanelWrapper, Panel } from 'react-tec';
import styled from 'styled-components';

import { colors } from 'theme';

export const Container = styled(PanelWrapper)`
  background-color: ${colors.lighterGray};
  min-height: calc(100vh - 60px);
  justify-content: center;

  @media (max-width: 800px) {
    min-height: calc(100vh - 50px);
  }
  @media (max-width: 650px) {
    min-height: calc(100vh - 45px);
  }
`;
export const SettingsPanel = styled(Panel)`
  max-width: 1200px;
`;
