import {
    AppBar,
    Toolbar,
    Typography,
    Box
} from "@mui/material";
import AppBarLogoButton from "../buttons/AppBarLogoButton";
import ColorsPalette from "../../../styles/colors_palette";
import AppBarAccountButton from "../buttons/AppBarAccountButton";
import { deleteToken } from "../../../utils/access";
import { useNavigate } from "react-router-dom";
import AppBarPageButton from "../buttons/AppBarPageButton";

const LoggedAppBar = (props) => {

    let navigate = useNavigate();
    let actual_page = props.actual_page ?? "";


    const logout = () => {
        deleteToken();
        navigate("/");
    }

    return (

        <AppBar position="static" sx={{ bgcolor: ColorsPalette.background_red }}>
            <Toolbar>
                {/* LOGO */}
                <AppBarLogoButton />
                {/* TITLE */}
                <Typography sx={{ml: "16px"}} variant="h8">
                    GoatiF1
                </Typography>

                {/* LOGOUT button */}
                <Box
                    sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}
                >
                    {/* Leagues BUTTON */}
                    <Box sx={{ marginLeft: '10px' }}>
                        <AppBarPageButton
                            onClick={() => {
                                navigate("/leagues")
                            }}
                            text="Leagues"
                            selected={actual_page === "leagues"}
                        />
                    </Box>
                    
                    {/* LOGOUT BUTTON */}
                    <Box sx={{ marginLeft: '10px' }}>
                        <AppBarAccountButton
                            textColor="white"
                            onClick={() => {
                                console.log("logout CLICKED!");
                                logout();
                            }}
                            text="Logout"
                        />
                    </Box>

                </Box>

            </Toolbar>
        </AppBar>

    );
}


export default LoggedAppBar;