import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
function FooterNav() {
  const [value, setValue] = React.useState(0);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:8080/auth/current_user", {
        credentials: "include",
      });
      const userData = await response.json();
      setUser(userData);
    };

    fetchUser();
  }, []);

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
            src={user.profilePic || "logo192.png"}
            alt="Profile"
            sx={{ width: 24, height: 24 }}
          />
        }
      />
    </BottomNavigation>
  );
}

export default FooterNav;
