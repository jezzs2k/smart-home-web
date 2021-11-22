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
import { useSelector } from "react-redux";
import { RootState } from "./stores/stores";
import Home from "./componets/home";
import DeviceDetail from './componets/DeviceDetail';

export default function App() {
  const {token} = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <div className='header'>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={token ? <Home /> :<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserDetail />} />
        <Route path="/device-detail/:deviceId" element={<DeviceDetail />} />
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
