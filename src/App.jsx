// import React from 'react';//prev
// import { BrowserRouter as Router, useRoutes } from "react-router-dom";//prev
import Login from "./components/Login/Login";
// import AppLayout from './components/MinivariantDrawer/AppLayout';
import UserManagement from './components/UserManagement/UserManagement';
import ContractorManagement from './components/ContractorManagement/ContractorManagement';
import SchemeCreation from './components/SchemeCreation/SchemeCreation';
import SubMenu from './components/SubMenu/SubMenu';
import SubOne from './components/SubMenu/SubOne';
import SubTwo from './components/SubMenu/SubTwo';
import SubThree from './components/SubMenu/SubThree';

import React, { useState } from "react";//New
import { styled, useTheme } from "@mui/material/styles";
import {useRoutes, Outlet, useNavigate } from "react-router-dom";//prev working before checking login
// import { Outlet, useNavigate } from "react-router-dom";//New
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ChevronLeft,
  ChevronRight,
  NotificationsActive,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
// import ProfileMenu from "../AppBar/ProfileMenu";//prev in AppLayout
import ProfileMenu from "../src/components/AppBar/ProfileMenu";
// import { Menu } from "./Menu";//prev in AppLayout
import { Menu } from "../src/components/MinivariantDrawer/Menu";
// import { hasChildren } from "./Utils";//prev in AppLayout
import { hasChildren } from "../src/components/MinivariantDrawer/Utils";

// export const AppContext = createContext(null);

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AppRoutes = () =>  {
  let routes= useRoutes([
    // { path: "/", element: <Login /> },
    { 
      path: "/applayout", 
      // element: <App/>,
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
  const theme = useTheme();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showApp, setShowApp] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const MenuItem = (props) => {
    const { item } = props;
    const SelectComponent = hasChildren(item) ? MultiLevel : SingleLevel;
    return <SelectComponent item={item} />;
  };

  const SingleLevel = (props) => {
    const { item } = props;
    return (
      <ListItem
        button
        onClick={() => {
          navigate(`/applayout/${item.path}`);
        }}
        sx={{
          "&:hover": {
            backgroundColor: "#4DA8DB",
            color: "#F8F8FF",
          },
        }}
      >
        <Tooltip title={item.text} placement="right-start" arrow>
          <ListItemIcon sx={{ "&:hover": { color: "#F8F8FF" } }}>
            {item.icon}
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary={item.text} sx={{ ml: open ? -2 : null }} />
      </ListItem>
    );
  };

  const MultiLevel = ({ item }) => {
    const { items: children } = item;
    const [submenuOpen, setsubmenuOpen] = useState(false);

    const handleClick = () => {
      //  setsubmenuOpen((prev) => !prev);
      setsubmenuOpen(!submenuOpen);
    };
  return (
      <React.Fragment>
        <ListItem
          button
          onClick={handleClick}
          sx={{
            "&:hover": {
              backgroundColor: "#4DA8DB",
              color: "#F8F8FF",
            },
          }}
        >
          <Tooltip title={item.text} placement="right-start" arrow>
            <ListItemIcon sx={{ "&:hover": { color: "#F8F8FF" } }}>
              {item.icon}
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary={item.text} sx={{ ml: open ? -2 : null }} />
          {submenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ ml: open ? 0.5 : null }}>
            {submenuOpen &&
              children.map((child) => (
                <div
                  onClick={() => {
                    navigate(`/applayout/submenu/${child.path}`);
                  }}
                >
                  <MenuItem key={child} item={child} />
                </div>
              ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  return(
    <>
    {showApp && <Login showApp={setShowApp} />}
    {!showApp && <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#4682B4" }}>
        <Toolbar>
          <Tooltip title="Open Drawer" arrow>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                ml: -1.5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Box flexGrow={1} />
          <Box mr={1}>
            <Tooltip title="Notification" arrow>
              <IconButton
                color="inherit"
                aria-label="notification alert"
                edge="end"
              >
                <NotificationsActive />
              </IconButton>
            </Tooltip>
          </Box>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#FFFAFA",
            borderRadius: 5,
            boxShadow: 4,
            color: "black",
          },
        }}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ mr: 4 }}>
            TWADPMS
          </Typography>
          <Tooltip title="Close Drawer" arrow>
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                "&:hover": { backgroundColor: "#4DA8DB", color: "#F8F8FF" },
              }}
            >
              {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Tooltip>
        </DrawerHeader>
        {Menu.map((item, key) => (
          <MenuItem key={key} item={item} />
        ))}
      </Drawer>
   
      <Box component="main" m={-1} sx={{ p: 2 }}>
        <DrawerHeader />
        <Box component="content" sx={{ ml: open ? drawerWidth : 2 }}>
          <Stack spacing={1}>
          
          <AppRoutes />
          
          </Stack>
        </Box>
      </Box>
    </Box>}
    <Outlet /> 
    
  </>
  )
}

export default App;



