import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { getApiUrl, postData } from "../../../api/commons";
import { useParams } from "react-router-dom";
import { getToken } from "../../../utils/access";

const RouletteDialog = (props) => {

    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const [race, setRace] = useState(props.race);
    const [admin, setAdmin] = useState(props.admin);

    const [roulette, setRoulette] = useState(null);
    const [generating, setGenerating] = useState(false);


    const generate_roulette = async () => {
        console.log("RACE: ", race);
        try {
            let url = getApiUrl() + "/championships/" + params.id_championship + "/races/" + race.id_race + "/roulette";
            let created = await postData(url, {}, true, getToken());
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
                {race && race.roulette == null && !generating && (
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="start"
                        alignItems="center"
                    >
                        {"This race has no roulette yet."}
                        <Button
                            sx={{mt: 2}}
                            onClick={() => {
                                setGenerating(true);
                                generate_roulette();
                            }}
                            variant="outlined"
                        >
                            {"Generate Roulette"}
                        </Button>
                    </Box>
                )}

                {race && race.roulette == null && generating && (
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="start"
                        alignItems="center"
                    >
                        {"Generating roulette."}
                        <CircularProgress/>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default RouletteDialog;