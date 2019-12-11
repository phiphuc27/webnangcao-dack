/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';

import Home from './Components/Pages/Home';
import Register from './Containers/RegisterContainer';
import Login from './Containers/LoginContainer';
import UserList from './Containers/UserListContainer';
import Profile from './Containers/ProfileContainer';

import Navbar from './Components/Navbar';

import { logout } from './Actions';

const App = ({ loggedIn, user, logOut, history }) => {
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
  // console.log(loggedIn);
  // console.log(history.location);
  return (
    <>
      <Navbar user={user} logout={logOut} history={history} />
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <PrivateRoute exact path="/dashboard" component={Home} />
        <PrivateRoute exact path="/userlist" component={UserList} />
        <PrivateRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/user/:id" component={Profile} />
        <Route exact path="/login" component={Login} />
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
