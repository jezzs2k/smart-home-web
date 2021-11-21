import React from 'react';
import { connect } from 'react-redux';

import { Avatar, Input, Popover } from 'antd';
import PropsType from 'prop-types';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  DownloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import './Navbar.css';

const { Search } = Input;

const Navbar = ({ }) => {
  const systemModal = (
    <ul className='modal'>
      <li className='modal-item'>
        <Link to='/isg_vi'>
          <UserOutlined />
          <h4 className='text'>Trang cá nhân</h4>
        </Link>
      </li>
      <li className='modal-item'>
        <Link to='/isg_vi/saveat'>
          <DownloadOutlined />
          <h4 className='text'>Đã lưu</h4>
        </Link>
      </li>
      <li className='modal-item'>
        <Link to='/system'>
          <SettingOutlined />
          <h4 className='text'>Cài đặt</h4>
        </Link>
      </li>
      <li className='modal-item logout'>
        <h4 className='text' onClick={() => {}}>
          Đăng xuất
        </h4>
      </li>
    </ul>
  );

  return (
    <div className='navbar'>
      <div className='logo'>
        <h2>Smart Home</h2>
      </div>
      <div className='search'>
        {/* <Search
          className='search-form'
          placeholder='Tìm kiếm'
          onSearch={(value) => console.log(value)}
          style={{ width: 200 }}
        /> */}
      </div>
      <ul className='nav-navbar ant-menu menu-site ant-menu-light ant-menu-root ant-menu-horizontal'>
        <li className='ant-menu-submenu ant-menu-submenu-horizontal ant-menu-overflowed-submenu '>
          <div className='ant-menu-submenu-title nav-child'>
            <Link to='/'>
              <HomeOutlined className='icon' />
            </Link>
          </div>
        </li>
        <li className='ant-menu-submenu ant-menu-submenu-horizontal ant-menu-overflowed-submenu '>
          <div className='ant-menu-submenu-title nav-child'>
            <Link to='/message'>
              {/* <SendOutlined className='icon' /> */}
            </Link>
          </div>
        </li>
        <li className='ant-menu-submenu ant-menu-submenu-horizontal ant-menu-overflowed-submenu '>
          <div className='ant-menu-submenu-title nav-child'>
            <Link to='/user'>
              <UserOutlined className='icon' />
              {/* <InstagramOutlined className='icon' /> */}
            </Link>
          </div>
        </li>
        {/* <li className='ant-menu-submenu ant-menu-submenu-horizontal ant-menu-overflowed-submenu '>
          <div className='ant-menu-submenu-title nav-child'>
            <Popover
              placement='bottomRight'
              content={<Notification />}
              trigger='click'>
              <HeartOutlined className='icon' />
            </Popover>
          </div>
        </li> */}
        <li className='ant-menu-submenu ant-menu-submenu-horizontal ant-menu-overflowed-submenu '>
          <div className='ant-menu-submenu-title nav-child'>
            <Popover
              placement='bottomRight'
              content={systemModal}
              trigger='click'>
              {/* <Avatar
                className='avatar-jezzs'
                src={infoUser && infoUser.avatar}
              /> */}
            </Popover>
          </div>
        </li>
      </ul>
    </div>
  );
};

Navbar.prosType = {
  setProcess: PropsType.func.isRequired,
};

const mapToPropState = () => ({
});

export default Navbar;
