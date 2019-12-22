import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link, Redirect, useLocation } from 'react-router-dom';

import useForm from 'react-hook-form';

const useStyles = makeStyles({
  errorInput: {
    border: '1px solid #cc0000',
    '&:focus': {
      borderColor: '#cc0000',
      boxShadow: '0 0 0 0.2rem rgba(204,0,0,.25)'
    }
  },

  errorText: {
    color: '#cc0000',
    marginBlockEnd: '10px'
  }
});

const Login = ({ isFetching, isFetched, login, loginGoogle, loginFacebook, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, handleSubmit, errors } = useForm();

  const location = useLocation();

  const classes = useStyles();

  const onSubmit = () => {
    const data = { email, password };
    login(data);
  };

  return (
    <div className="container form-account">
      {isFetched && <Redirect to={location.state ? location.state.from : '/profile/account'} />}
      <h2>Đăng nhập </h2>
      <div className="form-container">
        {error && <p className={classes.errorText}>{error}</p>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Email <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            {errors.email && <p className={classes.errorText}>{errors.email.message}</p>}
            <Form.Control
              className={errors.email && classes.errorInput}
              type="email"
              placeholder="Email"
              name="email"
              onChange={e => setEmail(e.target.value)}
              ref={register({ required: 'Vui lòng nhập email !' })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              Mật khẩu <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            {errors.password && <p className={classes.errorText}>{errors.password.message}</p>}
            <Form.Control
              className={errors.password && classes.errorInput}
              type="password"
              placeholder="Mật khẩu"
              name="password"
              onChange={e => setPassword(e.target.value)}
              ref={register({ required: 'Vui lòng nhập password!' })}
            />
          </Form.Group>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '10px 0'
            }}
          >
            <GoogleLogin
              clientId="652654063583-rnnfk9bpiv5sf5b72td6k4e0s0dlvjh5.apps.googleusercontent.com"
              buttonText="LOGIN WITH GOOGLE"
              autoLoad={false}
              onSuccess={loginGoogle}
              onFailure={loginGoogle}
              cookiePolicy="single_host_origin"
            />
            <FacebookLogin
              appId="536717120424233"
              autoLoad={false}
              fields="id,name,email,picture"
              callback={loginFacebook}
              icon="fa-facebook"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isFetching ? (
              <Button
                className="disabled"
                variant="primary"
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Spinner
                  animation="border"
                  variant="light"
                  size="sm"
                  style={{ marginRight: '10px' }}
                />
                Loading...
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Đăng nhập
              </Button>
            )}
          </div>
        </Form>
      </div>
      <p>
        Bạn chưa có tài khoản? <Link to="/register">Đăng kí</Link>
      </p>
    </div>
  );
};

export default Login;
