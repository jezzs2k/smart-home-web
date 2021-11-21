import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import './Login.css';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20,
  },
};

const LoginForm = ({  }) => {

  const onFinish = (values) => {
    console.log('Success:', values);
    // Login({ email: values.email, password: values.password });
    // history.push('/');
  };

  const onFinishFailed = () => {
    // Error(errorInfo);
    // console.log('Failed:', errorInfo);
  };


  return (<div className='login'>
        <h2 className='title'>Smart Home</h2>
        <Form
          {...layout}
          name='basic'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default LoginForm;
