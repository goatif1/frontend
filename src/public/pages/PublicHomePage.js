import PublicAppBar from "../components/appbar/PublicAppBar";
import ColorPalette from "../../styles/colors_palette";
import { Box } from "@mui/material";


const PublicHomePage = (props) => {

    return (
        <Box>
            <PublicAppBar/>
            {/* <Box height="100vh" sx={{ bgcolor: ColorPalette.background }}>
                <NextWeekendSection/>
            </Box> */}
            <Box height="100vh" sx={{ bgcolor: ColorPalette.background}}>

            </Box>
        </Box>
    );
}

export default PublicHomePage;