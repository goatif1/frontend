import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";

const BetOptionDialog = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    const [race, setRace] = useState(props.race);
    const [option, setOption] = useState(props.option);

    const [waiting, setWaiting] = useState(false);

    const [value, setValue] = useState("");

    const bet = async () => {
        //  TODO: increase an option weight in backend
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