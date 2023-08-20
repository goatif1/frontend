import {
    AppBar,
    Toolbar,
    Typography,
    Box
} from "@mui/material";
import AppBarLogoButton from "../buttons/AppBarLogoButton";
import ColorsPalette from "../../../styles/colors_palette";
import GenericButton from "../buttons/GenericButton";
import { useSnackbar } from "notistack";
import { deleteToken } from "../../../utils/access";
import { redirect, useNavigate } from "react-router-dom";

const { Web3 } = require('web3');

const LoggedAppBar = (props) => {

    const { enqueueSnackbar } = useSnackbar();
    let navigate = useNavigate();

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
                        <GenericButton
                            textColor="white"
                            onClick={() => {
                                console.log("LEAGUES CLICKED!");
                                navigate("/leagues")
                            }}
                            text="Leagues"
                        />
                    </Box>
                    
                    {/* LOGOUT BUTTON */}
                    <Box sx={{ marginLeft: '10px' }}>
                        <GenericButton
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