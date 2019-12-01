/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Pages/Home';
import Login from './Containers/LoginRegister';
import Register from './Containers/RegisterContainer';
import Navbar from './Components/Navbar';

export default class App extends Component {
  UNSAFE_componentWillMount() {
    const { loadUserFromToken } = this.props;
    loadUserFromToken();
  }

  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </>
    );
  }
}
