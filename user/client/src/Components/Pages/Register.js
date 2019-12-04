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

const Register = ({ isFetching, isFetched, signup, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('3');

  const { register, handleSubmit, errors } = useForm();

  const classes = useStyles();

  const onSubmit = e => {
    console.log(e);
    const data = { email, password, type: userType };
    signup(data);
  };

  return (
    <div className="container form-account">
      {isFetched ? (
        <>
          <h2>Đăng kí tài khoản thành công</h2>
          <a href="/">Quay về trang chủ</a>
        </>
      ) : (
        <>
          <h2>Đăng kí tài khoản</h2>
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
              <Form.Group controlId="formBasicRepeatPassword">
                <Form.Label>
                  Xác nhận lại mật khẩu <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                {errors.repeat_password && (
                  <p className={classes.errorText}>{errors.repeat_password.message}</p>
                )}
                <Form.Control
                  className={errors.repeat_password && classes.errorInput}
                  type="password"
                  placeholder="Mật khẩu"
                  name="repeat_password"
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
                    value="3"
                    checked={userType === '3'}
                    onChange={e => setUserType(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    inline
                    label="Người dạy"
                    value="2"
                    checked={userType === '2'}
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
                    Đăng kí
                  </Button>
                )}
              </div>
            </Form>
          </div>
          <p>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Register;
