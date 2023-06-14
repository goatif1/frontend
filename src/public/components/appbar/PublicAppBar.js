import {
    AppBar,
    Button,
    Toolbar,
    Typography,
} from "@mui/material";
import AppBarLogoButton from "../buttons/AppBarLogoButton";
import ColorsPalette from "../../../styles/colors_palette";
import { ThemeProvider, createTheme } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        login_button: {
            main: ColorsPalette.background,
            contrastText: '#fff',
        }
    }
})


const PublicAppBar = (props) => {
    return (

        <AppBar position="static" sx={{ bgcolor: ColorsPalette.background_red }}>
            <Toolbar>
                {/* LOGO */}
                <AppBarLogoButton />
                {/* TITLE */}
                <Typography sx={{ml: "16px"}} variant="h8">
                    Goatif1 League
                </Typography>
                
                <ThemeProvider theme={theme}>
                    <Button variant="outlined" color="login_button">Login</Button>
                </ThemeProvider>
            </Toolbar>
        </AppBar>

    );
}


export default PublicAppBar;