import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { getApiUrl, getData, postData } from "../../../api/commons";
import { useParams } from "react-router-dom";
import { getAccount, getToken } from "../../../utils/access";
import { getRouletteOptions, increaseOptionWeight } from "../../../web3/web3_service";
import { Wheel } from 'react-custom-roulette'

const BetOptionDialog = (props) => {
    const { Web3 } = require('web3');
    const { enqueueSnackbar } = useSnackbar();

    const [race, setRace] = useState(props.race);
    const [option, setOption] = useState(props.option);

    const [waiting, setWaiting] = useState(false);

    const [value, setValue] = useState("");

    const bet = async () => {
        let increased = await increaseOptionWeight(race.roulette, option.option_id, parseInt(value));
        console.log("INCREASED: ");
        if (increased){
            enqueueSnackbar("Weight increased successfully.", {variant: "success"});
            
            setWaiting(false);
            setValue("");

            props.onBet();
        } else {
            enqueueSnackbar("An error occurred on weighti increase.", {variant: "error"});
            setWaiting(false);
        }
    }


    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullWidth={false}
            maxWidth={"md"}
        >
            <DialogTitle>
                {`Increase the option (${option.option_name}) value`}
            </DialogTitle>

            <DialogContent>
                {!waiting && (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <TextField
                            autofocus
                            margin="dense"
                            id="value"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                            label="Weight increment"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <Button
                            sx={{pt: 2, pb: 2, mt: 2}}
                            onClick={() => {
                                setWaiting(true);
                                bet();
                            }}
                            variant="contained"
                            size="small"
                        >
                            Increase
                        </Button>
                    </Box>
                )}
                {waiting && (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <p>Increasing value...</p>
                        <CircularProgress sx={{mt: 2}}/>
                    </Box>
                )}
            </DialogContent>

        </Dialog>
    );

}


export default BetOptionDialog;