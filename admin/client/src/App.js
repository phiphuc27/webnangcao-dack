/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Home from './Components/Pages/Home';
import Login from './Containers/LoginContainer';

import Navbar from './Components/Navbar';

const App = ({ loggedIn, user }) => {
  const PrivateRoute = ({ component: Component, path }) => (
    <Route
      path={path}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

  return (
    <>
      <Navbar user={user} />
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <PrivateRoute exact path="/dashboard" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  user: state.user.user
});

export default connect(mapStateToProps)(App);
