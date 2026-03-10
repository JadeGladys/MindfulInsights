import { Box, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MessageIcon from '@mui/icons-material/Message';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const TopBar = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const colorMode = useContext(ColorModeContext);
   return <Box display="flex" justifyContent="space-between" p={2}>
    
    {/* SEARCH BAR */}
    <Box
        sx={{
          display: "flex",
          borderRadius: "3px",
          backgroundColor: colors.primary[400],
          width: "700px",
          /*to be removed once you implement backend*/marginRight: "300px",
        }}
    >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1}}>
            <SearchIcon />
        </IconButton>
    </Box>

    {/* ICONS */}
    <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? (
                <DarkModeOutlinedIcon />
            ) : (
                <LightModeOutlinedIcon />
            )}
        </IconButton>
        <IconButton>
            <NotificationsOutlinedIcon />
        </IconButton>
        <Link to="/message">
        <IconButton>
            <MessageIcon />
        </IconButton>
        </Link>
        
        <IconButton>
            <SettingsOutlinedIcon />
        </IconButton>
        
    </Box>

    <IconButton></IconButton>
   </Box>
};

export default TopBar