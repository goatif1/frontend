import { useState, useEffect, useContext } from "react";
import { getApiUrl, getData } from "../../../api/commons";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { getAccount, getToken, hasToken } from "../../../utils/access";
import PublicAppBar from "../../components/appbar/PublicAppBar";
import LoggedAppBar from "../../components/appbar/LoggedAppBar";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/titles/PageTitle";
import GenericButton from "../../components/buttons/GenericButton";
import ColorPalette from "../../../styles/colors_palette";
import AccountContext from "../../contexts/AccountContext";
import CreateChampionshipDialog from "../../components/dialogs/CreateChampionshipDialog";
import ChampionshipsList from "../../components/lists/ChampionshipsList";
import DriversStanding from "../../components/lists/DriversStanding";
import TeamsStanding from "../../components/lists/TeamsStanding";

const ChampionshipDetailPage = (props) => {
    const user_is_logged = hasToken();
    const account = getAccount();
    const { enqueueSnackbar } = useSnackbar();
    
    // League
    const [league, setLeague] = useState(null);
    const [isLeagueAdmin, setIsLeagueAdmin] = useState(false);
    const params = useParams();
    // Championship
    const [championship, setChampionship] = useState(null);

    // Tab 0 - News
    const [news, setNews] = useState([]);
    // Tab 1 - Drivers
    const [drivers, setDrivers] = useState([]);
    // Tab 2 - Teams
    const [teams, setTeams] = useState([]);
    const [teamsWithDrivers, setTeamsWithDrivers] = useState([]);
    // Tab 3 - Races
    const [races, setRaces] = useState([]);

    // Tabs
    const [tab, setTab] = useState(0);

    const getLeague = async () => {
        let url = getApiUrl() + "/organizations/" + championship.id_organization;
        let league_res = await getData(url, false, getToken());
        if (league_res && league_res.data) {
            if (user_is_logged && account){
                setIsLeagueAdmin(league_res.data.admin == account);
            }
            setLeague(league_res.data);
        } else {
            enqueueSnackbar("Error getting league.", {variant: "error"});
        }
    }

    const getChampionship = async () => {
        let url = getApiUrl() + "/championships/" + params.id_championship;
        let championships_res = await getData(url, false, getToken());
        if (championships_res && championships_res.data) {
            setChampionship(championships_res.data);
        } else {
            enqueueSnackbar("Error getting championship.", {variant: "error"});
        }
    }

    const getChampionshipDriversStanding = async () => {
        let url = getApiUrl() + "/championships/" + params.id_championship + "/drivers_standing";
        let drivers_standings_res = await getData(url, false, getToken());
        if (drivers_standings_res && drivers_standings_res.data) {
            setDrivers(drivers_standings_res.data);
        } else {
            enqueueSnackbar("Error getting championship drivers standings.", {variant: "error"});
        }
    }

    const getChampionshipTeamsStanding = async () => {
        let url = getApiUrl() + "/championships/" + params.id_championship + "/teams_standing";
        let teams_standings_res = await getData(url, false, getToken());
        if (teams_standings_res && teams_standings_res.data) {
            setTeams(teams_standings_res.data);
        } else {
            enqueueSnackbar("Error getting championship teams standings.", {variant: "error"});
        }
    }

    useEffect(() => {
        getChampionship();
        getChampionshipDriversStanding();
        getChampionshipTeamsStanding();
    }, []);

    useEffect(() => {
        if (championship){
            getLeague();
        }
    }, [championship]);

    useEffect(() => {
        if (drivers && teams){
            console.log("drivers and teams: ", teams);
            let new_teams = teams;
            new_teams.map((team) => {
                let driver = drivers.find(driver => driver.address_driver == team.address_driver_1);
                if (driver){
                    team.nickname_driver_1 = driver.nickname;
                    team.points_driver_1 = driver.total_points;
                } else {
                    team.nickname_driver_1 = "Unknown";
                    team.points_driver_1 = 0;
                }

                driver = drivers.find(driver => driver.address_driver == team.address_driver_2);
                if (driver){
                    team.nickname_driver_2 = driver.nickname;
                    team.points_driver_2 = driver.total_points;
                } else {
                    team.nickname_driver_2 = "Unknown";
                    team.points_driver_2 = 0;
                }
            });

            setTeamsWithDrivers(new_teams);
        }
    }, [drivers, teams]);

    return (
        <Box sx={{ height: '100%', width: '100%'}}>
            {!user_is_logged ? <PublicAppBar actual_page="leagues"/> : <LoggedAppBar actual_page="leagues"/>}

            {league && <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 3}}>
                <Grid item>
                    <PageTitle title={championship.name}/>
                </Grid>
                {isLeagueAdmin && <Grid item sx={{pr: 6}}>
                    <GenericButton
                        textColor={ColorPalette.background_red}
                        onClick={() => {
                            console.log("EDIT")
                        }}
                        text="Manage"
                        bgColor={ColorPalette.white}
                    />
                </Grid>}
            </Grid>}

            {championship && (
                <Box sx={{
                    mx: 6
                }}>
                    {/* DESCRIPTION */}
                    <Typography>
                        {championship.description}
                    </Typography>

                    {/* TABS */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                            value={tab} 
                            onChange={(e, new_tab) => {
                                setTab(new_tab);
                            }} 
                            aria-label="championship-tabs"
                        >
                            <Tab label="News" />
                            <Tab label="Drivers" />
                            <Tab label="Teams" />
                            <Tab label="Races" disabled/>
                        </Tabs>
                    </Box>

                    <Box sx={{mt: 2.5}}>
                        {/* TAB NEWS */}
                        {tab == 0 && news && news.length > 0 && (
                            <Box>
                                <Typography>Here will go the news</Typography>
                            </Box>
                        )}

                        {tab == 0 && (!news || news.length == 0) && (
                            <Box>
                                <Typography>There aren't news to read.</Typography>
                            </Box>
                        )}


                        {/* TAB DRIVERS */}
                        {tab == 1 && drivers && drivers.length > 0 && (
                            <Box>
                                <DriversStanding
                                    drivers={drivers}
                                />
                            </Box>
                        )}

                        {tab == 1 && (!drivers || drivers.length == 0) && (
                            <Box>
                                <Typography>There aren't drivers yet.</Typography>
                            </Box>
                        )}

                        {/* TAB TEAMS */}
                        {tab == 2 && teamsWithDrivers && teamsWithDrivers.length > 0 && (
                            <Box>
                                <TeamsStanding
                                    teams={teamsWithDrivers}
                                />
                            </Box>
                        )}

                        {tab == 2 && (!teamsWithDrivers || teamsWithDrivers.length == 0) && (
                            <Box>
                                <Typography>There aren't teams yet.</Typography>
                            </Box>
                        )}
                    </Box>

                </Box>
            )}

            {/* DIALOGS */}
            
        </Box>
    );
}

export default ChampionshipDetailPage;