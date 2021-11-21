import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './StartPage.css';

const StartPage = ({ }) => {
  // useEffect(() => {
  //   const startPageIndex = history.length - 1;
  //   history.go(-startPageIndex);

  //   // eslint-disable-next-line
  // }, []);

  return (
    <div className='instagram-app'>
      <h1 className='text-logo'>Smart Home</h1>
      <div className='action'>
        <Button type='primary' className='btn-login'>
          <Link to='/login'>Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default StartPage;
