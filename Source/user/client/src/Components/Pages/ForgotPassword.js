import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import useForm from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { resetPassword, sendResetPasswordEmail } from '../../Actions/user';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

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

const ForgotPassword = () => {
  const { error, fetched, fetching, confirmEmail } = useSelector(state => state.user);
  const passwordState = useSelector(state => state.user.password);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { register, handleSubmit, errors } = useForm();

  const classes = useStyles();

  const query = useQuery();

  const token = query.get('token');

  const onSubmit = () => {
    const data = { email };
    dispatch(sendResetPasswordEmail(data));
  };

  const onResetPassword = () => {
    const data = { newPassword, token };
    console.log(data);
    dispatch(resetPassword(data));
  };
  return (
    <div className="container form-account">
      {fetched ? (
        <>
          <h2>Lấy lại mật khẩu</h2>
          <p>
            Một email lấy lại mật kẩu đã được gửi đến <b>{confirmEmail}</b>
          </p>
          <a href="/">Quay về trang chủ</a>
        </>
      ) : (
        <>
          <h2>Lấy lại mật khẩu</h2>
          {token ? (
            <div className="form-container">
              {passwordState.fetched && (
                <>
                  <p>Mật khẩu của bạn đã thay đổi thành công</p>
                  <a href="/">Quay về trang chủ</a>
                </>
              )}
              {passwordState.error && <p className={classes.errorText}>{error}</p>}
              <Form onSubmit={handleSubmit(onResetPassword)}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    Mật khẩu mới <span style={{ color: 'red' }}>*</span>
                  </Form.Label>

                  {errors.new_password && (
                    <p className={classes.errorText}>{errors.new_password.message}</p>
                  )}
                  <Form.Control
                    className={errors.new_password && classes.errorInput}
                    type="password"
                    placeholder="Mật khẩu phải có ít nhất 6 ký tự"
                    name="new_password"
                    onChange={e => setNewPassword(e.target.value)}
                    ref={register({
                      required: 'Vui lòng nhập password!',
                      minLength: {
                        value: 6,
                        message: 'Mật khẩu phải có ít nhất 6 ký tự!'
                      }
                    })}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span>
                  </Form.Label>

                  {errors.repeat_password && (
                    <p className={classes.errorText}>{errors.repeat_password.message}</p>
                  )}
                  <Form.Control
                    className={errors.repeat_password && classes.errorInput}
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    name="repeat_password"
                    ref={register({
                      required: 'Vui lòng xác nhận lại password!',
                      validate: value => value === newPassword || 'Mật khẩu không trùng khớp!'
                    })}
                  />
                </Form.Group>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {passwordState.fetching ? (
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
                      Lấy lại mật khẩu
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          ) : (
            <div className="form-container">
              {error && <p className={classes.errorText}>{error}</p>}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    Nhập email tài khoản của bạn <span style={{ color: 'red' }}>*</span>
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

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {fetching ? (
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
                      Lấy lại mật khẩu
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
