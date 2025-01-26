import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth) // Firebase logout
      .then(() => {
        localStorage.removeItem("isAuthenticated"); // Clear localStorage
        navigate("/"); // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <div style={{ width: 240, background: "#f4f4f4", height: "100vh", padding: "1rem" }}>
      <h3>Admin Panel</h3>
      <Divider />
      <List>
        <ListItem 
          button 
          component={NavLink} 
          to="/students"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#ddd' : 'transparent',
          })}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Students Page" />
        </ListItem>

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
