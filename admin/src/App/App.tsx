import { Suspense, lazy } from 'react';

import { Route, Switch } from 'react-router-dom';

const Front = lazy(() => import('layout/front/ContentWrapper'));
const Admin = lazy(() => import('layout/admin/ContentWrapper'));

export const App = () => {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route path='/admin/' component={Admin} />
        <Route path='/' component={Front} />
      </Switch>
    </Suspense>
  );
};
