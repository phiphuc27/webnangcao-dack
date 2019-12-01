import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';

const Login = ({ isFetching, login, loginGoogle, loginFacebook }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    console.log(e);
    const data = { email, password };
    login(data);
  };

  return (
    <div className="container form-account">
      <h2>Đăng nhập </h2>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Email <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              Mật khẩu <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
                Sign Up
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
