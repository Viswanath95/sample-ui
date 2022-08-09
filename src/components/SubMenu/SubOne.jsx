import React from 'react';
import Typography from "@mui/material/Typography";
import SubMenuStyles from '../styles/SubMenu.module.css';

function SubOne() {
  return (
    <div className={SubMenuStyles.submenu}>
      <Typography variant="h6">SubOne</Typography>
    </div>
  )
}

export default SubOne;
