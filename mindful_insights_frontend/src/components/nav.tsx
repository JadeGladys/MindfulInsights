import axios from "axios";
import React, { useEffect, useState } from "react";
import TopBar from "../scenes/global/topBar";
import { IconButton } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
}

interface NavProps {
  username: string;
  accessToken: string;
  userID: string;
  id: string; 
}

const Nav: React.FC<NavProps> = ({ username, accessToken, userID, id }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Access Token in Nav:", accessToken);
    console.log("userID:", userID);
    console.log("id:", id);
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
          withCredentials: true,
        });

        const data = response.data;
        setUser(data);
        console.log("Profile response:", response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken]);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post('http://localhost:3000/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem('userID');
      localStorage.removeItem('id');
      console.log("Logged out!");
      navigate('/login'); // Navigate to login page after logout
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Axios specific error
        console.error("Failed to logout:", error.response?.data);
      } else if (error instanceof Error) {
        // General error
        console.error("Failed to logout:", error.message);
      } else {
        console.error("Failed to logout:", error);
      }
    }
  };

  console.log("User data:", user);
  return (
    <header className="navbar sticky-top bg-light flex-md-nowrap p-0 shadow" data-bs-theme="dark">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-dark mindfullink" href="#">MINDFULInsights</a>
      <TopBar />
      <div>
        {user && (
          <a className="text-black profile-name" href="#">
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>

            <IconButton onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </a>
        )}
      </div>
    </header>
  );
};

export default Nav;
