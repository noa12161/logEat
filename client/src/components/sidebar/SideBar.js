import React from 'react';
import './sidebar.css';
import logo from '../../images/logo2.png';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="SideBar">
      <div className="sidebar-logo-container">
        <div className="logo_img_container">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="sidebar-lists-container">
        <Link to="/">
          <div>기록</div>
        </Link>
        <Link to="/chart">
          <div>그래프</div>
        </Link>
        <Link to="/social">
          <div>게시글</div>
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default SideBar;
