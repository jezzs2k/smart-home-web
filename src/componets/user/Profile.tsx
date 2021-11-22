import { Link } from 'react-router-dom';
import {
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import { useNavigate } from "react-router-dom";

import './Profile.css';
import localStorage from 'redux-persist/es/storage';
import { KeyStogare } from '../../config/KeyStorage';
import { useAppDispatch } from '../../stores/stores';
import { resetAuth } from '../../stores/auth';

const User = () => {
  let navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    localStorage.removeItem(KeyStogare.Token);
    navigate('/login', {replace: true});
    dispatch(resetAuth());
  };

  return (
    <div className='info-user-detail'>
      <div className='page-user'>
        <div className='avatar-user'>
          <Avatar src={'https://taimienphi.vn/tmp/cf/aut/hinh-nen-vit-avatar-anh-vit-cute-ngoc-nghech-1.jpg'} className='avatar' />
        </div>
        <div className='info-user'>
          <div className='top-profile'>
            <h2 className='name-user'>{'Vu Thanh Hieu'}</h2>
            <Link to='/system' className='edit-profile'>
              <div className='btn btn-edit'>
                <span>Chỉnh sửa trang cá nhân</span>
              </div>
              <SettingOutlined className='icon-edit' />
            </Link>
          </div>
          <div className='info-detail'>
            <h2 className='article-total'>Email: Vuhieu@gmail.com</h2>
            <h2 className='follow'>Tên: Vũ Thanh Hiếu</h2>
            <h2 className='request-follow'>
              Thiết bị đã kết nối {0}
            </h2>
          </div>
          <h3 className='full-name'>{''}</h3>
          <div className='btn btn-status' onClick={handleLogout}>
            <span>Đăng xuất</span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default User;
