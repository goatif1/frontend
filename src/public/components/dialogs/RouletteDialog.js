import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { getApiUrl, postData } from "../../../api/commons";
import { useParams } from "react-router-dom";
import { getAccount, getToken } from "../../../utils/access";
import { getRouletteOptions } from "../../../web3/web3_service";

const RouletteDialog = (props) => {

    const { enqueueSnackbar } = useSnackbar();

    const [race, setRace] = useState(props.race);
    const [admin, setAdmin] = useState(props.admin);

    const [rouletteOptions, setRouletteOptions] = useState(null);
    const [betting, setBetting] = useState(false);

    const { Web3 } = require('web3');

    const handleClose = () => {
        setRace(null);
        setRouletteOptions(null);
    }

    const getRoulette = async () => {
        try {
            getRouletteOptions(race.roulette);
        } catch (e) {
            enqueueSnackbar("Error getting the Roulette values", {variant: "error"});
        }

        console.log("ACCOUNT IN CONTEXT IS: ", getAccount());
    }

    useEffect(() => {
        getRoulette();
    }, [])

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullWidth={true}
            maxWidth={"md"}
        >
            <DialogTitle>
                {`${race.name} - Roulette`}
            </DialogTitle>
            <DialogContent>
                
            </DialogContent>
        </Dialog>
    );
}

export default RouletteDialog;