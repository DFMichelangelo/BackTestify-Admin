import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
const ErrorNotFound = lazy(() => import("views/Placeholders/ErrorNotFound"));
const UsersList = lazy(() => import("views/Users/UsersList"));
const UserForm = lazy(() => import("views/Users/UserForm"));

function UsersManagementSystem(props) {
    return (
        <Switch>
            <Route path="/users-management-system/new" component={UserForm} />
            <Route path="/users-management-system/:id" component={UserForm} />
            <Route path="/users-management-system" component={UsersList} />
            <Route component={ErrorNotFound} />
        </Switch>
    );
}

export default UsersManagementSystem;
