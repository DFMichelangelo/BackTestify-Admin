import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
//Auth Components
import PublicTemplate from "components/PublicTemplate";

const Login = lazy(() => import("theme/views/Auth/Login"));
const Home = lazy(() => import("theme/views/Home"));
function Auth(props) {
  return (
    <PublicTemplate>
      <Switch>
        <Route path="/auth/login/social/success" component={Home} />
        <Route path="/auth/login/social/failed" render={() => <Login showSocialLoginError />} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth*" component={Login} />
      </Switch>
    </PublicTemplate>
  );
}

export default Auth;
