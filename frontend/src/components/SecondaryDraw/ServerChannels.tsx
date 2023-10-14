import { useEffect } from "react";
import useCrud from "../../hooks/useCrud";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MEDIA_URL } from "../../config";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const ServerChannels = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { dataCRUD, error, isLoading, fetchData } = useCrud<Category>(
    [],
    "/server/channel/"
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          backgroundColor: theme.palette.background.default,
        }}
      >
        Explore
      </Box>
      <List sx={{ py: 0 }}>
        {dataCRUD.map((category) => (
          <ListItem
            disablePadding
            key={category.id}
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/explore/${category.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemIcon>
                  <ListItemAvatar sx={{ minWidth: "0px" }}>
                    <img
                      alt="Server Icon"
                      src={`${MEDIA_URL}${category.icon}`}
                      style={{
                        width: "25px",
                        height: "25px",
                        display: "block",
                        margin: "auto",
                        filter: isDarkMode ? "invert(100%)" : "none",
                      }}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                        variant="body1"
                        textAlign="start"
                        paddingLeft={1}
                    >
                        {category.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ServerChannels;
