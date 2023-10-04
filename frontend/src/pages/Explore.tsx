import { Box, CssBaseline } from "@mui/material"
import PopularChannels from "../components/PrimaryDraw/PopularChannels"
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories"
import Main from "./templates/Main"
import PrimaryAppBar from "./templates/PrimaryAppBar"
import PrimaryDraw from "./templates/PrimaryDraw"
import SecondaryDraw from "./templates/SecondaryDraw"
import ExploreServers from "../components/Main/ExploreServers"

const Explore = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <PrimaryAppBar/>
            <PrimaryDraw>
                <PopularChannels open={false}/>
            </PrimaryDraw>
            <SecondaryDraw>
                <ExploreCategories/>
            </SecondaryDraw>
            <Main>
                <ExploreServers/>
            </Main>
        </Box>
    )
}

export default Explore