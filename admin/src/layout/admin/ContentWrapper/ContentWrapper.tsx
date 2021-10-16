import React from 'react';

import { getAuth } from 'firebase/auth';
import { Switch, RouteChildrenProps, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from 'react-tec';

import { useSideNavActiveContext, useAppContext } from 'hooks';
import { Navbar } from 'layout/admin/Navbar';
import { SideNavbar } from 'layout/admin/SideNavbar';
import { Dashboard } from 'pages/admin/Dashboard';
import { NotFound } from 'pages/admin/NotFound';
import { User } from 'pages/admin/User';
import { Users } from 'pages/admin/Users';

import { BodyContainer, AdminContentWrapper } from './styledComponents';
import { useMemo } from 'react-datepicker/node_modules/@types/react';

interface Props extends RouteChildrenProps {}
export const ContentWrapper: React.FC<Props> = (props) => {
  const { history } = props;
  const { sideNavActive } = useSideNavActiveContext();
  const { user, userLoaded } = useAppContext();

  const userHasAdminPermission = !!user?.permissions.includes('admin');
  const authChecks = useMemo(
    () => [
      {
        check: () => !!getAuth()?.currentUser && userHasAdminPermission,
        path: '/',
      },
    ],
    [userHasAdminPermission],
  );

  //If User Loaded with No User => Kick them out
  if (userLoaded && !user) {
    return <Redirect to='/' />;
  }

  //If User Loaded with User => Wait for AppVersions && userModelLoaded && companyLoaded
  if (!userLoaded) {
    return null; //Still Loading
  }

  return (
    <>
      <SideNavbar />
      <BodyContainer sideNavActive={sideNavActive}>
        <Navbar history={history} />
        <AdminContentWrapper>
          <Switch>
            <PrivateRoute
              path='/admin/dashboard'
              authChecks={authChecks}
              component={Dashboard}
            />
            <PrivateRoute
              path='/admin/users/:uid'
              authChecks={authChecks}
              component={User}
            />
            <PrivateRoute
              path='/admin/users'
              authChecks={authChecks}
              component={Users}
            />

            <Route component={NotFound} />
          </Switch>
        </AdminContentWrapper>
      </BodyContainer>
    </>
  );
};
