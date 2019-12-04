/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Home from './Components/Pages/Home';
import Login from './Containers/LoginContainer';
import Register from './Containers/RegisterContainer';
import Profile from './Containers/ProfileContainer';
import Navbar from './Components/Navbar';

import { logout } from './Actions';

const App = ({ loggedIn, user, logOut, history }) => {
  const PrivateRoute = ({ component: Component, ...path }) => (
    <Route
      {...path}
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
      <Navbar user={user} logout={logOut} history={history} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  user: state.user.user
});
const mapDispatchToProps = dispatch => ({
  logOut: () => {
    window.sessionStorage.removeItem('jwtToken');
    dispatch(logout);
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
