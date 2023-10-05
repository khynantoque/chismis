import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import createMuiTheme from "../theme/theme";
import { ColorModeContext } from "../context/DarkModeContext";

interface ToggleColorModeProps {
  children: React.ReactNode;
}

const ToggleColorMode = ({ children }: ToggleColorModeProps) => {
  const [mode, setMode] = useState<"light" | "dark">(
    () => localStorage.getItem("colorMode") as "light" | "dark"
  ) || (useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light");

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode])

  const colorMode = useMemo(() => ({toggleColorMode}), [toggleColorMode])

  const theme = useMemo(() => createMuiTheme(mode), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
