import React from 'react';
import { Outlet } from 'react-router-dom';
import SubMenuStyles from '../styles/SubMenu.module.css';

function SubMenu() {
  return (
    <div className={SubMenuStyles.submenu}>
      <Outlet />
    </div>
  )
}

export default SubMenu;
