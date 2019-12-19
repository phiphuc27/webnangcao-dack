import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Spinner, Col, Row } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import useForm from 'react-hook-form';
import { editPassword } from '../../Actions/user';

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

const PasswordTab = ({ user }) => {
  const passwordState = useSelector(state => state.user.password);
  const { fetching, fetched, error } = passwordState;
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { register, handleSubmit, errors } = useForm();

  const classes = useStyles();

  const onSubmit = () => {
    const data = { oldPassword, newPassword };
    dispatch(editPassword(data));
  };

  return (
    <div className="profile-info">
      <div className="info-container">
        <div className="profile-header">
          <div className="row">
            <div className="col-12">
              <h3>Thay đổi mật khẩu</h3>
            </div>
          </div>
        </div>
        <div className="profile-body">
          {error && <p className={classes.errorText}>{error}</p>}
          {fetched && (
            <p
              style={{
                color: 'green',
                fontWeight: 'bold',
                paddingBottom: '10px',
                fontSize: '1rem'
              }}
            >
              Thay đổi mật khẩu thành công
            </p>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            {user.MATKHAU && (
              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm={3}>
                  Mật khẩu hiện tại <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Col sm={9}>
                  {errors.old_password && (
                    <p className={classes.errorText}>{errors.old_password.message}</p>
                  )}
                  <Form.Control
                    className={errors.old_password && classes.errorInput}
                    type="password"
                    placeholder="Mật khẩu hiện tại"
                    name="old_password"
                    onChange={e => setOldPassword(e.target.value)}
                    ref={register({ required: 'Vui lòng nhập password!' })}
                  />
                </Col>
              </Form.Group>
            )}

            <Form.Group as={Row} controlId="formBasicEmail">
              <Form.Label column sm={3}>
                Mật khẩu mới <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Col sm={9}>
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
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formBasicEmail">
              <Form.Label column sm={3}>
                Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Col sm={9}>
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
              </Col>
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
                  Lưu
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PasswordTab;
