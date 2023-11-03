import {
    AppBar,
    Toolbar,
    Typography,
    Box
} from "@mui/material";
import AppBarLogoButton from "../buttons/AppBarLogoButton";
import ColorsPalette from "../../../styles/colors_palette";
import AppBarAccountButton from "../buttons/AppBarAccountButton";
import { useSnackbar } from "notistack";
import { getApiUrl, getData, postData } from "../../../api/commons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AccountContext from "../../contexts/AccountContext";
import AppBarPageButton from "../buttons/AppBarPageButton";
import { hasToken, setToken, storeAccount } from "../../../utils/access";

const { Web3 } = require('web3');

const PublicAppBar = (props) => {

    const { enqueueSnackbar } = useSnackbar();
    const { setAccount } = useContext(AccountContext);
    let navigate = useNavigate();
    const user_is_logged = hasToken();

    let actual_page = props.actual_page ?? "";

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
                let nonce_response = await getData(url_nonce);

                console.log("NONCE RESPONSE: ", nonce_response);

                let nonce = nonce_response.data.data;
                if (!nonce){
                    enqueueSnackbar("Login error", {variant: 'error'});
                    return;
                }

                // Signature
                const userMessage = `GoatiF1 Sign to log in with one-time nonce: ${nonce}`;
                const msg = `0x${stringToHex(userMessage)}`;
                const sign = await provider.request({
                    method: 'personal_sign',
                    params: [msg, account]
                });

                let auth_response = await handleAuthenticate(account, sign);
                if (auth_response && auth_response.data){
                    let token = auth_response.data.token;
                    setToken(token);
                    setAccount({
                        public_address: account
                    });
                    storeAccount(account);
                    navigate("/home");
                }

            }

            // LOGIN / SIGNUP PROCESS: https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial

        } catch (e) {
            console.error(e)
            enqueueSnackbar("Login error", {variant: 'error'});
        }
        
    }

    const stringToHex = (str) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        return Array.prototype.map.call(data, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    const handleAuthenticate = async (publicAddress, signature) => {
        const url_auth = getApiUrl() + "/auth";
        let auth_response = await postData(url_auth, {address: publicAddress, signature: signature});
        return auth_response;
    }

    return (

        <AppBar position="static" sx={{ bgcolor: ColorsPalette.background_red }}>
            <Toolbar>
                {/* LOGO */}
                <AppBarLogoButton />
                {/* TITLE */}
                <Box 
                    sx={{display: 'inline-block', cursor: 'pointer'}}
                    onClick={() => {
                        if (user_is_logged){
                            navigate("/home");
                        } else {
                            navigate("/");
                        }
                    }}
                >
                    <Typography sx={{ml: "16px"}} variant="h8">
                        GoatiF1
                    </Typography>
                </Box>
                

                {/* LOGIN and REGISTER buttons */}
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

                    {/* LOGIN BUTTON */}
                    <Box sx={{ marginLeft: '10px' }}>
                        <AppBarAccountButton
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
                        <AppBarAccountButton
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