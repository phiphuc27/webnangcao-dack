/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './App.css';

import Error from './Components/Pages/Error';

import Home from './Components/Pages/Home';
import Register from './Containers/RegisterContainer';
import Login from './Containers/LoginContainer';
import UserList from './Containers/UserListContainer';
import Profile from './Containers/ProfileContainer';
import Skill from './Containers/SkillContainer';
import Contract from './Containers/ContractContainer';
import Complain from './Containers/ComplainContainer';

import Navbar from './Components/Navbar';
import Footer from './Components/Other/Footer';

import { logout } from './Actions';

const App = ({ isLoading, loggedIn, user, logOut, history }) => {
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
      {isLoading && !loggedIn ? (
        <div
          style={{
            height: '86vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spinner
            style={{ width: '100px', height: '100px' }}
            variant="dark"
            animation="border"
          />
        </div>
      ) : (
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/userlist" component={UserList} />
            <PrivateRoute exact path="/skill" component={Skill} />
            <PrivateRoute exact path="/contract" component={Contract} />
            <PrivateRoute exact path="/complain" component={Complain} />
            <PrivateRoute exact path="/register" component={Register} />
            <PrivateRoute exact path="/user/:id" component={Profile} />
            <Route component={Error} />
          </Switch>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.user.fetching,
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
