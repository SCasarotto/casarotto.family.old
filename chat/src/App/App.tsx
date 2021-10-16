import { Suspense, lazy } from 'react';

import { Route, Switch } from 'react-router-dom';

const Front = lazy(() => import('layout/front/ContentWrapper'));
const Chat = lazy(() => import('layout/chat/ContentWrapper'));

export const App = () => {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route path='/chat/' component={Chat} />
        <Route path='/' component={Front} />
      </Switch>
    </Suspense>
  );
};
