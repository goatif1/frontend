import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Box, Dialog, DialogContent, DialogTitle, Grid, Tab, Tabs, TextField } from "@mui/material";

const ManageChampionshipDialog = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    
    const [id, setId] = useState(props.id);
    const [championship, setChampionship] = useState(null);

    // Tab
    const [tab, setTab] = useState(1);
    /*
    Tabs:
        0 - Championship Data
        1 - Drivers
        2 - Teams
        3 - Races
        4 - Races results
     */

    // Drivers
    const [drivers, setDrivers] = useState([]);
    // Teams
    const [teams, setTeams] = useState([]);
    // Races
    const [races, setRaces] = useState([]);
    // Races Results
    const [racesResults, setRacesResults] = useState([]);


    // Get data functions
    const getChampionship = async () => {
        let url = getApiUrl() + "/championships/" + id;
        let championships_res = await getData(url, false, getToken());
        if (championships_res && championships_res.data) {
            setChampionship(championships_res.data);
        } else {
            enqueueSnackbar("Error getting championship.", {variant: "error"});
        }
    }

    const getChampionshipDriversStanding = async () => {
        let url = getApiUrl() + "/championships/" + id + "/drivers_standing";
        let drivers_standings_res = await getData(url, false, getToken());
        if (drivers_standings_res && drivers_standings_res.data) {
            setDrivers(drivers_standings_res.data);
        } else {
            enqueueSnackbar("Error getting championship drivers standings.", {variant: "error"});
        }
    }

    const getChampionshipTeamsStanding = async () => {
        let url = getApiUrl() + "/championships/" + id + "/teams_standing";
        let teams_standings_res = await getData(url, false, getToken());
        if (teams_standings_res && teams_standings_res.data) {
            setTeams(teams_standings_res.data);
        } else {
            enqueueSnackbar("Error getting championship teams standings.", {variant: "error"});
        }
    }

    const getRaces = async () => {
        let url = getApiUrl() + "/championships/" + id + "/races";
        let races_res = await getData(url, false, getToken());
        if (races_res && races_res.data) {
            setRaces(races_res.data);
        } else {
            enqueueSnackbar("Error getting championship races.", {variant: "error"});
        }
    }

    const getRacesResults = async () => {
        let url = getApiUrl() + "/championships/" + id + "/races/results";
        let results_res = await getData(url, false, getToken());
        if (results_res && results_res.data) {
            setRacesResults(results_res.data);
        } else {
            enqueueSnackbar("Error getting championship races results.", {variant: "error"});
        }
    }

    // Load data on the first load
    useEffect(() => {
        getChampionship();
        getChampionshipDriversStanding();
        getChampionshipTeamsStanding();
        getRaces();
        getRacesResults();
    }, []);


    // Close Dialog
    const handleClose = () => {
        // Clean all data
        setTab(1);
        setChampionship(null);
        setDrivers(null);
        setTeams(null);
        setRaces(null);
        setRacesResults(null);

        // Close
        props.onClose();
    }

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="md"
        >

            <DialogTitle>Manage the Championship</DialogTitle>

            <DialogContent sx={{height: 600}}>

                {/* Tabs */}
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs
                        value={tab}
                        onChange={(e, new_val) => {
                            setTab(new_val);
                        }}
                        aria-label="manage-championship-tabs"
                    >
                        <Tab label="Championship Data" disabled/>
                        <Tab label="Drivers"/>
                        <Tab label="Teams"/>
                        <Tab label="Races"/>
                        <Tab label="Races Results"/>
                    </Tabs>
                </Box>

                <Box sx={{mt: 2.5}}>
                    {/* Championship Data */}
                    {tab == 0 && (
                        <Grid container>
                            {/* Name */}
                            <Grid item sm={6}>
                                <TextField
                                    
                                />
                            </Grid>
                        </Grid>
                    )}
                </Box>

            </DialogContent>

        </Dialog>
    );
    
}


export default ManageChampionshipDialog;