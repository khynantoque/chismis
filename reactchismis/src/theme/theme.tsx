import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar: {
            height: number
        }
    }

    interface ThemeOptions {
        primaryAppBar?: {
            height: number
        }
    }
}

const createMuiTheme = () => {
    return createTheme({
        typography: {
            fontFamily: ['IBM Plex Sans', 'sans-serif'].join(','),
        },
        primaryAppBar: {
            height: 50
        },
        components: {
            MuiAppBar: {
                defaultProps: {
                    color: "default",
                    elevation: 0
                }
            }
        }
    })
}

export default createMuiTheme