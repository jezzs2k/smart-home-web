import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import './SystemUserInfo.css';

const SystemUserInfo = () => {
  return (
    <div className='action-function'>
      <Menu theme='light' mode='inline'>
        <Menu.Item key='1'>
          <Link to='/system'>Chỉnh sửa trang cá nhân</Link>
        </Menu.Item>
        <Menu.Item key='2'>
          <Link to='/system/c_password'>Đổi mật khẩu</Link>
        </Menu.Item>
        <Menu.Item key='3'>
          <Link to='/system/#'>Ứng dụng và trang web</Link>
        </Menu.Item>
        <Menu.Item key='4'>
          <Link to='/system/#'>Email và SMS</Link>
        </Menu.Item>
        <Menu.Item key='5'>
          <Link to='/system/#'>Thông báo đẩy</Link>
        </Menu.Item>
        <Menu.Item key='6'>
          <Link to='/system/#'>Quản lý danh bạ</Link>
        </Menu.Item>
        <Menu.Item key='7'>
          <Link to='/system/#'>Bảo mật và quền riêng tư</Link>
        </Menu.Item>
        <Menu.Item key='8'>
          <Link to='/system/#'>Hoạt động đăng nhập</Link>
        </Menu.Item>
        <Menu.Item key='9'>
          <Link to='/system/#'>Email từ instagram</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SystemUserInfo;
