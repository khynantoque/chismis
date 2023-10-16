import { Box, CssBaseline } from "@mui/material";
import MessageInterface from "../components/Main/MessageInterface";
import Main from "./templates/Main";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import ServerChannels from "../components/SecondaryDraw/ServerChannels";
import UserServers from "../components/PrimaryDraw/UserServers";

const Server = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <PrimaryAppBar/>
            <PrimaryDraw>
                <UserServers open={true}/>
            </PrimaryDraw>
            <SecondaryDraw>
                <ServerChannels/>
            </SecondaryDraw>
            <Main>
                <MessageInterface/>
            </Main>
        </Box>
    )
}

export default Server;