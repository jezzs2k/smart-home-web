// import { useState } from 'react'
// import logo from './logo.svg'
// import './App.css'
// import React, { useEffect } from 'react';
// import { Provider } from 'react-redux';

// import './App.css';

// import Layout from './componets/layout/layout';

// function App() {
//   return <div className='App'>
//         <Layout />
//       </div>
// }

// export default App

import * as React from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useSearchParams,
  useParams
} from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import StartPage from "./componets/page/StartPage";
import Login from "./componets/auth/Login";
import Navbar from './componets/layout/Navbar';
import UserDetail from './componets/user/UserDetail';

export default function App() {
  return (
    <div>
      <div className='header'>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserDetail />} />
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
