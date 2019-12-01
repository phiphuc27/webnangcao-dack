import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = ({ isFetching, register }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userType, setUserType] = useState('student');

  const handleSubmit = e => {
    console.log(e);
    const data = { email, password, repeat_password: repeatPassword };
    register(data);
  };

  return (
    <div className="container form-account">
      <h2>Đăng kí tài khoản</h2>
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
          <Form.Group controlId="formBasicRepeatPassword">
            <Form.Label>
              Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Xác nhận mật khẩu"
              name="repeat_password"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
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
