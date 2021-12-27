import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
const ErrorNotFound = lazy(() => import("views/Placeholders/ErrorNotFound"));
const Profile = lazy(() => import("views/Profile"));

function Account() {
  return (
    <Switch>
      <Route path="/account/profile" component={Profile} />
      <Route component={ErrorNotFound} />
    </Switch>
  );
}

export default Account;
