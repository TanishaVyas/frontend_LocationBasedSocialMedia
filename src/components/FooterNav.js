import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
function FooterNav() {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: 'var(--secondary-color)', // Use background color variable
        borderTop: '1px solid var(--background-color)',
        '& .MuiBottomNavigationAction-root': {
            color: 'var(--primary-color)', // Icon and text color
            '&.Mui-selected': {
              color: 'var(--primary-color)', // Selected item color
            },
          },
      }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />{" "}
      <BottomNavigationAction label="Search" icon={<SearchIcon />} />{" "}
      <BottomNavigationAction label="Add" icon={<AddCircleIcon />} />{" "}
      <BottomNavigationAction
        label="Profile"
        icon={
            <Avatar 
            src="logo192.png" // Replace with the path to your image
            alt="Profile"
            sx={{ width: 24, height: 24 }}
          />
        }
      />
    </BottomNavigation>
  );
}

export default FooterNav;
