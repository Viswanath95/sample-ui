import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import GavelIcon from "@mui/icons-material/Gavel";
import SchemaIcon from "@mui/icons-material/Schema";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BikeScooterIcon from '@mui/icons-material/BikeScooter';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

export const Menu = [
    {
        text: "User Management",
        icon: <PersonIcon />,
        items: [],
      },
      {
        text: "Contractor Management",
        icon: <GavelIcon />,
        items: [],
      },
      {
        text: "Scheme Creation",
        icon: <SchemaIcon />,
        items: [],
      },
      {
        text: "Sub Menu",
        icon: <MenuOpenIcon />,
        items: [
          {
            text: "Sub Menu1",
            icon: <BeachAccessIcon />
          },
          {
            text: "Sub Menu2",
            icon: <BikeScooterIcon />
          },
          {
            text: "Sub Menu3",
            icon: <BloodtypeIcon />
          }
        ]
      }
];
