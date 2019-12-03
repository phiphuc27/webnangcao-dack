import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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

const Register = ({ isFetching, signup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userType, setUserType] = useState('student');

  const { register, handleSubmit, errors } = useForm();

  const classes = useStyles();

  const onSubmit = e => {
    console.log(e);
    const data = { email, password, repeat_password: repeatPassword, role: userType };
    signup(data);
  };

  return (
    <div className="container form-account">
      <h2>Đăng kí tài khoản</h2>
      <div className="form-container">
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
          <Form.Group controlId="formBasicRepeatPassword">
            <Form.Label>
              Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            {errors.repeat_password && (
              <p className={classes.errorText}>{errors.repeat_password.message}</p>
            )}
            <Form.Control
              className={errors.repeat_password && classes.errorInput}
              type="password"
              placeholder="Mật khẩu"
              name="repeat_password"
              onChange={e => setRepeatPassword(e.target.value)}
              ref={register({
                required: 'Vui lòng xác nhận lại password!',
                validate: value => value === password || 'Mật khẩu không trùng khớp!'
              })}
            />
          </Form.Group>
          <Form.Group id="formBasicRadio">
            <Form.Label>Bạn đăng kí với tư cách là</Form.Label>
            <div>
              <Form.Check
                type="radio"
                inline
                label="Người học"
                value="student"
                checked={userType === 'student'}
                onChange={e => setUserType(e.target.value)}
              />
              <Form.Check
                type="radio"
                inline
                label="Người dạy"
                value="teacher"
                checked={userType === 'teacher'}
                onChange={e => setUserType(e.target.value)}
              />
            </div>
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
                Sign Up
              </Button>
            )}
          </div>
        </Form>
      </div>
      <p>
        Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default Register;
