/* eslint-disable camelcase */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Home from './Components/Pages/Home';
import Login from './Containers/LoginContainer';
import Register from './Containers/RegisterContainer';
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
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
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
