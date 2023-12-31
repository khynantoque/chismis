import {
  Box,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { useState, useEffect, ReactNode } from "react";
import DrawToggle from "../../components/PrimaryDraw/DrawToggle";
import React from "react";

type Props = {
  children: ReactNode
}

type ChildProps = {
  open: Boolean;
}

type ChildElement = React.ReactElement<ChildProps>;

const PrimaryDraw: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const below600 = useMediaQuery("(max-width:599px)");
  const [open, setOpen] = useState(false);

  const handleDrawOpen = () => {
    setOpen(true);
  };

  const handleDrawClose = () => {
    setOpen(false);
  };

  const openedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: "hidden"
  })
  const closedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: "hidden",
    width: theme.primaryDraw.closed,
  })

  const Drawer = styled(
    MuiDrawer,
    {}
  )(({theme, open}) => ({
    width: theme.primaryDraw.width,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(),
      "& .MuiDrawer-paper": openedMixin(),
    }),
    ...(!open && {
      ...closedMixin(),
      "& .MuiDrawer-paper": closedMixin(),
    }),
  }))

  useEffect(() => {
    setOpen(!below600);
  }, [below600]);

  return (
    <Drawer
      open={open}
      variant={below600 ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height})px`,
          width: `${theme.primaryDraw.width}px`,
        },
      }}
    >
      <Box>
        <Box sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 0,
            width: open ? "auto" : "100%"
        }}>
          <DrawToggle open={open} handleDrawerOpen={handleDrawOpen} handleDrawerClose={handleDrawClose} />
          
        </Box>
        {React.Children.map(children, (child) => {
            return React.isValidElement(child)
              ? React.cloneElement(child as ChildElement, { open })
              : child;
          })}
      </Box>
    </Drawer>
  );
};

export default PrimaryDraw;
