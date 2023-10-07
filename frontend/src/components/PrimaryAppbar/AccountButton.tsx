import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import DarkModeSwitch from "./DarkMode/DarkModeSwitch";

const AccountButton = () => {
    const renderMenu = (
        <Menu open={true}>
            <MenuItem>
                <DarkModeSwitch/>
            </MenuItem>
        </Menu>
    )

    return (
        <Box sx={{ display: { xs: "flex" } }}>
            <IconButton edge="end" color="inherit">
                <AccountCircle/>
            </IconButton>
            {renderMenu}
        </Box>
    )
}

export default AccountButton;