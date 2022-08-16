import React from 'react';
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Login from "./components/Login/Login";
import AppLayout from './components/MinivariantDrawer/AppLayout';
import UserManagement from './components/UserManagement/UserManagement';
import ContractorManagement from './components/ContractorManagement/ContractorManagement';
import SchemeCreation from './components/SchemeCreation/SchemeCreation';
import SubMenu from './components/SubMenu/SubMenu';
import SubOne from './components/SubMenu/SubOne';
import SubTwo from './components/SubMenu/SubTwo';
import SubThree from './components/SubMenu/SubThree';

export const AppRoutes = () =>  {
  let routes= useRoutes([
    { path: "/", element: <Login /> },
    { 
      path: "/applayout", 
      element: <AppLayout />,
      children: [
        {
          path: "usermanagement",
          element: <UserManagement />,

        },
        {
          path: "contractormanagement",
          element: <ContractorManagement />,
        },
        {
          path: "schemecreation",
          element: <SchemeCreation />,
        },
        {
          path: "submenu",
          element: <SubMenu/>,
          children: [
            { 
              path: "submenuone", 
              element: <SubOne/> 
            },
            { 
              path: "submenutwo", 
              element: <SubTwo/> 
            },
            { 
              path: "submenuthree", 
              element: <SubThree/>
            }
          ],
        },
      ],
    },
  ]);
  return routes;
};

const App = () => {
  return(
    <Router>
     <AppRoutes />
    </Router>
  )
}

export default App;
