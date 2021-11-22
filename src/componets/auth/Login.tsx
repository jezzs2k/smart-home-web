import {useEffect} from 'react';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import {useNavigate} from 'react-router-dom';

import './Login.css';
import { RootState, useAppDispatch } from '../../stores/stores';
import { login } from '../../stores/factories/login';
import { useSelector } from 'react-redux';

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
  const {token} = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (values: {username: string, password: string}) => {
    dispatch(login(values));
  };

  const onFinishFailed = () => {
    // Error(errorInfo);
    // console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (token) {
      navigate('/', {replace: true});
    }
  }, [token])


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
            label='Tên tài khoản'
            name='username'
            rules={[
              {
                required: true,
                message: 'Nhập tài khoản!',
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[
              {
                required: true,
                message: 'Nhập mật khâủ !',
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Ghi nhớ</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};

export default LoginForm;
