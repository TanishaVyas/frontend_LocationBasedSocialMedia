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
import { useNavigate } from 'react-router-dom';
function FooterNav() {

  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:8080/auth/current_user", {
        credentials: "include",
      });
      const userData = await response.json();
      setUser(userData);
      console.log(userData.profilePic);
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
        zIndex: 1000, // Make sure the footer stays on top of other content
        '& .MuiBottomNavigationAction-root': {
          color: 'var(--primary-color)', // Icon and text color
          '&.Mui-selected': {
            color: 'var(--primary-color)', // Selected item color
          },
        },
      }}
    >
     <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        onClick={() => navigate('/home')}
      />
      <BottomNavigationAction
        label="Search"
        icon={<SearchIcon />}
        onClick={() => navigate('/search')}
      />
      <BottomNavigationAction
        label="Add"
        icon={<AddCircleIcon />}
        onClick={() => navigate('/add')}
      />
      <BottomNavigationAction
        label="Profile"
        icon={
          <Avatar
            src={user?.profilePic || "logo192.png"}
            alt="Profile"
            sx={{ width: 24, height: 24 }}
          />
        }
        onClick={() => navigate('/dashboard')}
      />
    </BottomNavigation>
  );
}

export default FooterNav;
