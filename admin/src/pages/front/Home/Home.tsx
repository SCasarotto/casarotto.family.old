import React from 'react';

import { PanelWrapper, Panel } from './styledComponents';

export const Home: React.FC = () => {
  return (
    <PanelWrapper>
      <Panel>
        <h1 style={{ textAlign: 'center' }}>Welcome</h1>
        <p style={{ textAlign: 'center' }}>
          TODO: Build out Request Access Form
        </p>
      </Panel>
    </PanelWrapper>
  );
};
