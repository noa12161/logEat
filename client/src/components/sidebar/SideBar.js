import React from 'react';
import './sidebar.css';
import logo from '../../images/logo.PNG';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="SideBar">
      <div className="sidebar-logo-container">
        <img src={logo} alt="" />
      </div>
      <div className="sidebar-lists-container">
        <Link to="/">
          <div>Log</div>
        </Link>
        <Link to="/chart">
          <div>Chart</div>
        </Link>
        <Link to="/social">
          <div>Social</div>
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default SideBar;
