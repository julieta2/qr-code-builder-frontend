import React, {useContext, useEffect} from 'react';
import {Form, Input, Button, Card, Row, Col, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {AuthContext} from "../context/AuthContext";
import {Link} from "react-router-dom";

const Login = () => {
  const {login, state: {isLoginPending, loginError}} = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    login(values)
  };

  useEffect(() => {
    if (loginError) {
      debugger
      messageApi.open({
        type: 'error',
        content: loginError,
      });
    }
  }, [loginError])

  return (
    <Row>
      {contextHolder}
      <Col
        lg={{span: 6, offset: 9}}
        xs={{span: 20, offset: 2}}
      >
        <Form
          name="login-form"
          onFinish={onFinish}
        >
          <Card title="Log in">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  email: true,
                  message: 'Please input correct email',
                },
              ]}
            >
              <Input prefix={<UserOutlined/>} placeholder="email"/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={isLoginPending}>
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              Don't have an account? <Link to="/register">Register</Link>
            </Form.Item>
          </Card>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
