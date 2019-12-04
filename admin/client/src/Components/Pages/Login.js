import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

const Login = ({ isFetching, isFetched, login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, handleSubmit, errors } = useForm();

  const classes = useStyles();

  const onSubmit = e => {
    console.log(e);
    const data = { email, password };
    login(data);
  };

  return (
    <div className="container form-account">
      {isFetched && <Redirect to="/dashboard" />}
      <h2>Đăng nhập </h2>
      <div className="form-container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Email <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            {errors.email && (
              <p className={classes.errorText}>{errors.email.message}</p>
            )}
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
            {errors.password && (
              <p className={classes.errorText}>{errors.password.message}</p>
            )}
            <Form.Control
              className={errors.password && classes.errorInput}
              type="password"
              placeholder="Mật khẩu"
              name="password"
              onChange={e => setPassword(e.target.value)}
              ref={register({ required: 'Vui lòng nhập password!' })}
            />
          </Form.Group>

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
    </div>
  );
};

export default Login;
