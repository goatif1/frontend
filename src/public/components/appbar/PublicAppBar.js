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
import { getApiUrl, getData } from "../../../api/commons";

const { Web3 } = require('web3');

const PublicAppBar = (props) => {

    const { enqueueSnackbar } = useSnackbar();

    const login = async () => {
        try {

            let provider = null;
            if (window.ethereum) provider = window.ethereum;
            else if (window.web3) provider = window.web3.currentProvider;
            else enqueueSnackbar("Web3 Provider not found", {variant: 'error'});

            if (provider){
                await provider.request({method: 'eth_requestAccounts'});
                const web3 = new Web3(provider);
                const userAccount = await web3.eth.getAccounts();
                const account = userAccount[0].toLowerCase();

                const url_nonce = getApiUrl() + `/users/${account}/nonce`;
                let generatedNonce_Response = await getData(url_nonce);

                console.log("GENERATED NONCE RESPONSE: ", generatedNonce_Response);
            }

            // LOGIN / SIGNUP PROCESS: https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial

        } catch (e) {
            enqueueSnackbar("Login error", {variant: 'error'});
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