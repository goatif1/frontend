import PublicAppBar from "../../components/appbar/PublicAppBar";
import ColorPalette from "../../../styles/colors_palette";
import { Box } from "@mui/material";


const PublicHomePage = (props) => {

    return (
        <Box height="100vh">
            <PublicAppBar/>
            <Box sx={{ bgcolor: ColorPalette.background}}>

            </Box>
        </Box>
    );
}

export default PublicHomePage;