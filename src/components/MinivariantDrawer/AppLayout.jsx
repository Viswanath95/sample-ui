import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
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
import ProfileMenu from "../AppBar/ProfileMenu";
import { Menu } from "./Menu";
import { hasChildren } from "./Utils";
import UserManagement from "../UserManagement/UserManagement";
// import ContractorManagement from "../ContractorManagement/ContractorManagement";
// import SchemeCreation from "../SchemeCreation/SchemeCreation";
// import SubMenu from "../SubMenu/SubMenu";
// import SubOne from "../SubMenu/SubOne";
// import SubTwo from "../SubMenu/SubTwo";
// import SubThree from "../SubMenu/SubThree";

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

export default function AppLayout() {
  const theme = useTheme();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <Box sx={{ display: "flex" }}>
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
           <Typography component="user">
                <UserManagement />
              </Typography>
           {/*     <Typography component="contract">
                <ContractorManagement />
              </Typography>
              <Typography component="scheme">
                <SchemeCreation />
              </Typography>
              <Typography component="submenu">
                <SubMenu />
              </Typography>
              <Typography component="subone">
                <SubOne />
              </Typography>
              <Typography component="subtwo">
                <SubTwo />
              </Typography>
              <Typography component="subthree">
                <SubThree />
              </Typography>  */}
            </Stack>
          </Box>
        </Box>
      </Box>
      <Outlet />
    </>
  );
}
