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

const { Web3 } = require('web3');

const PublicAppBar = (props) => {

    const { enqueueSnackbar } = useSnackbar();

    const login = async () => {
        try {

            let provider = null;
            if (window.ethereum) provider = window.ethereum;
            else if (window.web3) provider = window.web3.currentProvider;
            else console.error("NOT METAMASK");

            if (provider){
                await provider.request({method: 'eth_requestAccounts'});
                const web3 = new Web3(provider);
                const userAccount = await web3.eth.getAccounts();
                console.log("USER ACCOUNT: ", userAccount);
                const account = userAccount[0];
            }

            enqueueSnackbar("LOG IN ERROR", {variant: 'error'});

        } catch (e) {
            console.error("AN ERROR OCCURRED IN LOG IN: ", e);
        }
        
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

                {/* LOGIN and REGISTER buttons */}
                <Box
                    sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}
                >
                    {/* LOGIN BUTTON */}
                    <Box sx={{ marginLeft: '10px' }}>
                        <GenericButton
                            textColor="white"
                            onClick={() => {
                                console.log("LOGIN CLICKED!");
                                login();
                            }}
                            text="Login"
                        />
                    </Box>

                    {/* REGISTER BUTTON */}
                    <Box sx={{ marginLeft: '10px' }}>
                        <GenericButton
                            textColor="white"
                            onClick={() => {
                                console.log("REGISTER CLICKED!")
                            }}
                            text="Register"
                        />
                    </Box>
                </Box>

            </Toolbar>
        </AppBar>

    );
}


export default PublicAppBar;