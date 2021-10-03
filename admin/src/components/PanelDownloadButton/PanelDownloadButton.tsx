import { ButtonProps } from 'react-tec';

import { PanelActionButton } from 'components/PanelActionButton';

import { DownloadButtonIcon } from './styledComponents';

export const PanelDownloadButton: React.FC<ButtonProps> = (props) => (
  <PanelActionButton {...props}>
    <DownloadButtonIcon />
  </PanelActionButton>
);
