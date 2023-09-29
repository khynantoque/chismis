import { AppBar, Box, Drawer, IconButton, Link, Toolbar, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import MenuIcon from "@mui/icons-material/Menu"
import React, { useEffect, useState } from "react"

const PrimaryAppBar = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const theme = useTheme()

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') {
            return;
        }
        setSideMenu(open)
    }

    const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'))

    useEffect(() => {
        if (isSmallScreen && sideMenu) {
            setSideMenu(false)
        }
    }, [isSmallScreen])

    return (
        <AppBar
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 2,
                backgroundColor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar variant="dense" sx={{
                height: theme.primaryAppBar.height,
                minHeight: theme.primaryAppBar.height,
            }}>
                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{mr:2}} onClick={toggleDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                </Box>

                <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
                    {[...Array(20)].map((_, i) => (
                        <Typography key={i} paragraph>
                            {i + 1}
                        </Typography>
                    ))}
                </Drawer>

                <Link href="/" underline="none" color="inherit">
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { fontWeight: 700, letterSpacing: "-0.5px"}}}
                    >
                        CHISMIS
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default PrimaryAppBar;