import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { getApiUrl, getData, postData } from "../../../api/commons";
import { useParams } from "react-router-dom";
import { getAccount, getToken } from "../../../utils/access";
import { getRouletteOptions, getRouletteResult, spinRoulette } from "../../../web3/web3_service";
import { Wheel } from 'react-custom-roulette'
import BetOptionDialog from "./BetOptionDialog";

const RouletteDialog = (props) => {

    const { Web3 } = require('web3');
    const { enqueueSnackbar } = useSnackbar();

    const [race, setRace] = useState(props.race);
    const [admin, setAdmin] = useState(props.admin);

    const [rouletteOptions, setRouletteOptions] = useState(null);
    const [totalWeight, setTotalWeight] = useState(0);
    const [wheelData, setWheelData] = useState(null);

    const [betting, setBetting] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    
    const [spinned, setSpinned] = useState(true);
    const [spinnedResult, setSpinnedResult] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const [spinning, setSpinning] = useState(false);

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

    const handleClose = () => {
        setRace(null);
        setRouletteOptions(null);
    }

    const getRouletteOptionsNames = async () => {
        let url = getApiUrl() + "/championships/" + race.id_championship + "/races/" + race.id_race + "/roulette";

        let roulette_options_res = await getData(url, true, getToken());

        if (roulette_options_res && roulette_options_res.data){
            return roulette_options_res.data;
        }

        return [];
    }

    const getRoulette = async () => {
        try {
            // Get the roulette result
            let constract_result_res = await getRouletteResult(race.roulette);
            let roulette_spinned = constract_result_res[0];
            console.log("roulette spinned: ", roulette_spinned);
            setSpinned(roulette_spinned);
            let roulette_spinned_option = parseInt((constract_result_res[1]).toString().replace("n", ""));
            console.log("roulette spinned result: ", roulette_spinned_option);
            setSpinnedResult(roulette_spinned_option);

            // Get options from the smart contract
            let contract_options_res = await getRouletteOptions(race.roulette);
            let contract_options = [];
            let new_total_weight = 0;
            contract_options_res.map((c_option) => {
                let w = parseInt(c_option[1].toString().replace("n", ""))
                contract_options.push({
                    id: parseInt(c_option[0].toString().replace("n", "")),
                    weight: w,
                });
                new_total_weight += w;
            });

            let backend_options = await getRouletteOptionsNames();

            backend_options.map((option) => {
                let contract_found_option = contract_options.find(c_option => c_option.id == option.option_id);
                option.weight = contract_found_option.weight;
            });
            console.log("BACKEND OPTIONS: ", backend_options);
            setRouletteOptions(backend_options);
            setTotalWeight(new_total_weight);

            let wheelData = [];
            backend_options.map((option) => {
                wheelData.push({
                    option: option.option_name,
                    optionSize: option.weight,
                    style: {
                        fontSize: 16
                    }
                })
            });
            setWheelData(wheelData);

            // Secure other variables
            setBetting(false);
            setSelectedOption(null);

        } catch (e) {
            enqueueSnackbar("Error getting the Roulette values", {variant: "error"});
        }
    }

    const spin = async () => {
        try {
            let spin_result = await spinRoulette(race.roulette);
            console.log("SPIN RESULT IS: ", spin_result);
            spin_result = parseInt(spin_result.toString().replace("n", ""))

            if (spin_result && spin_result > 0){
                setSpinnedResult(spin_result);
                setSpinned(true);
                setShowResult(true);
                // TODO: timer
                setSpinning(false);
            }

        } catch (e) {
            setSpinning(false);
            enqueueSnackbar("An error occurred while spinning roulette. Please refresh the page and try again.")
        }
    }

    useEffect(() => {
        getRoulette();
    }, []);

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
                <Grid container>
                    {rouletteOptions && rouletteOptions.length >= 2 && (
                        <Grid item sm={12}>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="options table">
                                    {/* Header */}
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Name</b></TableCell>
                                            <TableCell><b>Weigth</b></TableCell>
                                            <TableCell><b>Probability</b></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rouletteOptions.map((option, index) => {
                                            return (
                                                <TableRow
                                                    key={`Option_${index + 1}`}
                                                >
                                                    <TableCell>{option.option_name}</TableCell>
                                                    <TableCell>{option.weight}</TableCell>
                                                    <TableCell>{`${((option.weight / totalWeight) * 100).toFixed(2)}%`}</TableCell>
                                                    <TableCell>
                                                        <Box display="flex" flexDirection="row" justifyContent="end">
                                                            <Button
                                                                sx={{pt: 2, pb: 2, ml: 2}}
                                                                onClick={() => {
                                                                    setBetting(true);
                                                                    setSelectedOption(option);
                                                                }}
                                                                variant="contained"
                                                                size="small"
                                                                disabled={spinned}
                                                            >
                                                                Increase
                                                            </Button>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )}

                    {wheelData && wheelData.length >= 2 && (
                        <Grid item sm={12} sx={{mt: 4}}>
                            <Box display="flex" flexDirection="row" justifyContent="center">
                                <Wheel
                                    mustStartSpinning={spinning}
                                    prizeNumber={spinnedResult}
                                    data={wheelData}
                                    backgroundColors={colors}
                                    textColors={['#ffffff']}
                                />
                            </Box>
                        </Grid>
                    )}

                    {admin && wheelData && wheelData.length >= 2 && !betting && (
                        <Grid item sm={12}>
                            <Box display="flex" flexDirection="row" justifyContent="center">
                                <Button
                                    sx={{mr: 4, pt: 1, pb: 1, pl: 10, pr: 10}}
                                    onClick={() => {
                                        setSpinning(true);
                                        spin();
                                    }}
                                    variant="contained"
                                    size="medium"
                                    disabled={spinned}
                                >
                                    {`🎰 Spin 🎰`}
                                </Button>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>

            {betting && selectedOption && (
                <BetOptionDialog
                    open={betting && selectedOption}
                    onClose={() => {
                        setBetting(false);
                        setSelectedOption(null);
                    }}
                    onBet={() => {
                        setBetting(false);
                        setSelectedOption(false);
                        getRoulette();
                    }}
                    race={race}
                    option={selectedOption}

                />
            )}
        </Dialog>
    );
}

export default RouletteDialog;