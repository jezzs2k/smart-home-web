import React from 'react';
import { Card, Avatar, List } from 'antd';

import './infoUserAndSuggest.css';

const { Meta } = Card;

const data = [
  { id: 1, name: 'jezzs' },
  { id: 2, name: 'jezzs_hieu' },
  { id: 3, name: 'jezzs_hieu_hiue' },
];

const InfoUserAndSuggest = () => {
  return (
    <div className='right-content'>
      <div className='info-user'>
        <Meta
          avatar={
            <Avatar
              className='avatar-jezzs'
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            />
          }
          title='jezzs@2k'
          description='vu thanh hieu'
        />
      </div>
      <div className='suggest-connect-friend'>
        <div className='top'>
          <h3 className='title'>Gợi ý cho bạn</h3>
          <p className='action-btn'>Xem tất cả</p>
        </div>
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id} className='list-item'>
              <List.Item.Meta
                avatar={
                  <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                }
                title={<a href='https://ant.design'>{item.name}</a>}
                description={'type follow'}
              />
              <div className='follow-btn'>Theo dõi</div>
            </List.Item>
          )}></List>
        <div className='bottom'>
          <p className='info-app'>
            Giới thiệu Trợ giúp Báo chí API Việc làm Quyền riêng tư Điều khoản
            Vị trí Tài khoản liên quan nhất Hash tag Ngôn ngữ Tiếng Việt © 2020
            INSTAGRAM FROM JEZZS
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoUserAndSuggest;
