import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { getApiUrl, postData } from "../../../api/commons";
import { useParams } from "react-router-dom";
import { getToken } from "../../../utils/access";
import ColorPalette from "../../../styles/colors_palette";
import { Wheel } from 'react-custom-roulette'

const CreateRouletteDialog = (props) => {

    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const [race, setRace] = useState(props.race);
    const [admin, setAdmin] = useState(props.admin);

    const [roulette, setRoulette] = useState(null);
    const [generating, setGenerating] = useState(false);
    console.log("RACE: ", race);

    const [optionName, setOptionName] = useState("");
    const [optionValue, setOptionValue] = useState("10");
    const [optionColor, setOptionColor] = useState("#3C91E6");

    const [options, setOptions] = useState([]);
    const [wheelData, setWheelData] = useState([]);

    const colors = [
        "#3C91E6",
        "#A2D729",
        "#FA824C",
        "#FAFFFD",
        "#C792DF",
        "#6C698D",
        "#C1FFF2",
        "#FEFFBE",
        "#F4BFDB"
    ]

    const generate_roulette = async () => {
        console.log("RACE: ", race);
        let create_data = {}
        try {
            let url = getApiUrl() + "/championships/" + params.id_championship + "/races/" + race.id_race + "/roulette";
            let created = await postData(url, create_data, true, getToken());
            if (created){
                // todo, get the data from the roulette
                setGenerating(false);
            }
        } catch (e) {
            console.log("Error roulette create: ", e);
            setGenerating(false);
            enqueueSnackbar("Error generating new roulette.");
        }
    }

    console.log("Options: ", options);

    const handleClose = () => {
        setOptions([]);
        setWheelData([]);
        props.onClose();
    }

    const handleCreate = async () => {
        setGenerating(true);

        let url = getApiUrl() + "/championships/" + params.id_championship + "/races/" + race.id_race + "/roulette";
        let create_data = {
            options: options
        }

        let create_roulette_res = await postData(url, create_data, true, getToken());
        if (create_roulette_res && create_roulette_res.data && create_roulette_res.data.status && create_roulette_res.data.status == "Success"){
            enqueueSnackbar("Roulette created successfully.", {variant: "success"});
            setGenerating(false);
            // handleClose();
        } else {
            setGenerating(false);
            enqueueSnackbar("Error creating roulette.", {variant: "error"});
        }
    }

    let enableCreate = options && options.length >= 2 && !generating;

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullWidth={true}
            maxWidth={"md"}
        >
            <DialogTitle>
                <Typography variant="h5" color={ColorPalette.background_red}>
                    {`${race.name} - Roulette`}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item sm={12}>
                        <Typography variant="h6">
                            {"Create new options"}
                        </Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            autofocus
                            margin="dense"
                            id="name"
                            value={optionName}
                            onChange={(e) => {
                                setOptionName(e.target.value);
                            }}
                            label="Option Name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            margin="dense"
                            id="name"
                            value={optionValue}
                            onChange={(e) => {
                                setOptionValue(e.target.value);
                            }}
                            label="Option Weight"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item sm={2}>
                        <Select
                            margin="dense"
                            id="color"
                            value={optionColor}
                            onChange={(e) => {
                                setOptionColor(e.target.value);
                            }}
                            label="Option Color"
                            type="select"
                            fullWidth
                        >
                            {colors.map((color) => {
                                return (
                                    <MenuItem key={color} value={color}>
                                        <Box display="flex" flexDirection="row" alignItems="center">
                                            <Box
                                                sx={{
                                                    height: "15px", 
                                                    width: "15px", 
                                                    backgroundColor: color,
                                                    border: 1,
                                                    mr: 2
                                                }}
                                            />
                                            {color}
                                        </Box>
                                        {/* <div style={{ backgroundColor: color, height: "15px" }} /> */}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Grid>
                    {/* Button to add option */}
                    <Grid item sm={2}>
                        <Button
                        sx={{pt: 2, pb: 2, ml: 2}}
                            disabled={!(optionName.trim().length > 3 && parseInt(optionValue) > 0)}
                            onClick={() => {
                                setOptions(prevOptions => [...prevOptions, {
                                    name: optionName,
                                    value: parseInt(optionValue)
                                }]);
                                setWheelData(prevWheelData => [...prevWheelData, {
                                    option: optionName,
                                    optionSize: parseInt(optionValue),
                                    style: {
                                        backgroundColor: optionColor,
                                        fontSize: 16
                                    }
                                }])
                                setOptionName("");
                                setOptionValue("10");
                                setOptionColor("#3C91E6");
                            }}
                            variant="contained"
                            size="small"
                        >
                            Add option
                        </Button>
                    </Grid>

                    <Grid item sm={12} sx={{mt: 4}}>
                        <Typography variant="h6">
                            {"Current options"}
                        </Typography>
                    </Grid>
                    {options && options.length > 0 && (
                        <Grid item sm={12}>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="options table">
                                    {/* Header */}
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Name</b></TableCell>
                                            <TableCell><b>Weigth</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {options.map((option, index) => {
                                            return (
                                                <TableRow
                                                    key={`Option_${index + 1}`}
                                                >
                                                    <TableCell>{option.name}</TableCell>
                                                    <TableCell>{option.value}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )}
                    {!options || options.length == 0 && (
                        <Grid>
                            {"There are no options yet."}
                        </Grid>
                    )}
                    
                    <Grid item sm={12} sx={{mt: 4}}>
                        <Typography variant="h6">
                            {"Roulette Visualization"}
                        </Typography>
                    </Grid>
                    {!wheelData || wheelData.length < 2 && (
                        <Grid>
                            {"Create at least 2 options to previsualize the roulette."}
                        </Grid>
                    )}
                    {wheelData && wheelData.length >= 2 && (
                        <Grid item sm={12}>
                            <Box display="flex" flexDirection="row" justifyContent="center">
                                <Wheel
                                    mustStartSpinning={false}
                                    prizeNumber={0}
                                    data={wheelData}
                                    backgroundColors={colors}
                                    textColors={['#ffffff']}
                                />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button disabled={generating} onClick={handleClose}>Cancel</Button>
                <Button disabled={!enableCreate} onClick={handleCreate}>Create Roulette</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateRouletteDialog;