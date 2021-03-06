/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import './App.css';

import Home from './Containers/HomeContainer';
import Error from './Components/Pages/Error';
import Login from './Containers/LoginContainer';
import Register from './Containers/RegisterContainer';
import Profile from './Containers/ProfileContainer';
import Chat from './Containers/ChatContainer';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Other/Footer';
import Tutors from './Components/Pages/Tutors';
import SingleTutor from './Components/Pages/SingleTutor';
import StudyRequest from './Components/Pages/StudyRequest';
import ForgotPassword from './Components/Pages/ForgotPassword';

import { logout } from './Actions/user';

const App = ({ isLoading, loggedIn, user, logOut, history, isOpenChat }) => {
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
      {isLoading && !loggedIn ? (
        <div
          style={{
            height: '86vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spinner style={{ width: '100px', height: '100px' }} variant="dark" animation="border" />
        </div>
      ) : (
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tutors" component={Tutors} />
            <Route exact path="/tutors/:id" component={SingleTutor} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reset-password" component={ForgotPassword} />
            <PrivateRoute exact path="/profile/:tab" component={Profile} />
            <PrivateRoute exact path="/request" component={StudyRequest} />
            <Route component={Error} />
          </Switch>
          <Footer />
          {isOpenChat ? <Chat /> : null}
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.user.fetching,
  loggedIn: state.user.loggedIn,
  user: state.user.user,
  isOpenChat: state.chat.isOpen
});
const mapDispatchToProps = dispatch => ({
  logOut: () => {
    window.sessionStorage.removeItem('jwtToken');
    dispatch(logout);
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
