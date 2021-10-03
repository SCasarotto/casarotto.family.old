import { ButtonProps } from 'react-tec';

import { PanelActionButton } from 'components/PanelActionButton';

import { RefreshButtonIcon } from './styledComponents';

export const PanelRefreshButton: React.FC<ButtonProps> = (props) => (
  <PanelActionButton {...props}>
    <RefreshButtonIcon />
  </PanelActionButton>
);
