import {
    AppBar,
    Box,
    Toolbar,
} from "@mui/material";
import AppBarLogoButton from "../buttons/AppBarLogoButton";
import ColorsPalette from "../../../styles/colors_palette";


const PublicAppBar = (props) => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{bgcolor: ColorsPalette.background_red}}>
                <Toolbar>
                    <AppBarLogoButton/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


export default PublicAppBar;