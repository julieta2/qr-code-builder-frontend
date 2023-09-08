import React, {useContext, useEffect} from 'react';
import {Form, Input, Button, Row, Col, Card} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import {AuthContext} from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {

  const { register, state, state: { isRegisterPending } } = useContext(AuthContext);
  const navigate = useNavigate();
  const onFinish = (values) => {
    register(values);
  };

  useEffect(() => {

    if (state.isRegistered) {
      navigate('/login')
    }

  }, [state.isRegistered])

  return (

    <Row>
      <Col
        lg={{ span: 6, offset: 9 }}
        xs={{ span: 20, offset: 2 }}
      >
        <Card title="Register">
          <Form
            name="register-form"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="name" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                  type: 'email',
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
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
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isRegisterPending} block>
                Register
              </Button>
            </Form.Item>
            <Form.Item>
              Already have an account? <Link to="/login">Login</Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
