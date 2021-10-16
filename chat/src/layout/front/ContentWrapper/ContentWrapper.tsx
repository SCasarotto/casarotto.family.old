import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { Home } from 'pages/front/Home';
import { NotFound } from 'pages/front/NotFound';
import { SignIn } from 'pages/front/SignIn';


import { MainPanel, FrontContentWrapper } from './styledComponents';

export const ContentWrapper: React.FC = () => {
  return (
    <MainPanel>
      <FrontContentWrapper>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/sign-in' component={SignIn} />

          <Route component={NotFound} />
        </Switch>
      </FrontContentWrapper>
    </MainPanel>
  );
};
