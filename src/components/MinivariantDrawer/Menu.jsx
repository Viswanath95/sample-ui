import React from "react";
import {
  Person,
  Gavel,
  Schema,
  MenuOpen,
  BeachAccess,
  BikeScooter,
  Bloodtype,
} from "@mui/icons-material";

export const Menu = [
  {
    text: "User Management",
    path: "usermanagement",
    icon: <Person />,
    items: [],
  },
  {
    text: "Contractor Management",
    path: "contractormanagement",
    icon: <Gavel />,
    items: [],
  },
  {
    text: "Scheme Creation",
    path: "schemecreation",
    icon: <Schema />,
    items: [],
  },
  {
    text: "Sub Menu",
    path: "submenu",
    icon: <MenuOpen />,
    items: [
      {
        text: "Sub Menu1",
        path: "submenuone",
        icon: <BeachAccess />,
      },
      {
        text: "Sub Menu2",
        path: "submenutwo",
        icon: <BikeScooter />,
      },
      {
        text: "Sub Menu3",
        path: "submenuthree",
        icon: <Bloodtype />,
      },
    ],
  },
];
