import * as React from "react";
import Avatar from "@mui/material/Avatar";
// import Stack from '@mui/material/Stack';
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { green } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const profmenuopen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <React.Fragment>
      <Tooltip title="Profile" arrow>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={profmenuopen ? "profile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={profmenuopen ? "true" : undefined}
        >
          <Badge
            color="secondary"
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              {...stringAvatar("Viswanath A")}
              sx={{ bgcolor: green[500], width: 30, height: 30 }}
            />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={profmenuopen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1,
            backgroundColor: "#FFFAFA",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: "#4DA8DB",
              color: "#F8F8FF",
            },
          }}
        >
          <ListItemIcon sx={{ "&:hover": { color: "#F8F8FF" } }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          View profile
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: "#4DA8DB",
              color: "#F8F8FF",
            },
          }}
        >
          <ListItemIcon sx={{ "&:hover": { color: "#F8F8FF" } }}>
            <PasswordIcon fontSize="small" />
          </ListItemIcon>
          Change password
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: "#4DA8DB",
              color: "#F8F8FF",
            },
          }}
        >
          <ListItemIcon sx={{ "&:hover": { color: "#F8F8FF" } }}>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              backgroundColor: "#4DA8DB",
              color: "#F8F8FF",
            },
          }}
        >
          <ListItemIcon sx={{ "&:hover": { color: "#F8F8FF" } }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
