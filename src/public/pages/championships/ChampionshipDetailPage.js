import { useState, useEffect, useContext } from "react";
import { getApiUrl, getData } from "../../../api/commons";
import { Box, Grid, Typography } from "@mui/material";
import { getToken, hasToken } from "../../../utils/access";
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

const ChampionshipDetailPage = (props) => {
    const user_is_logged = hasToken();
    const {account} = useContext(AccountContext);
    const { enqueueSnackbar } = useSnackbar();
    
    // League
    const [league, setLeague] = useState(null);
    // Championship
    const [championship, setChampionship] = useState(null);
    const [championshipDriversStanding, setChampionshipDriversStandings] = useState(null);
    const [championshipTeamsStanding, setChampionshipTeamsStandings] = useState(null);
    const [isLeagueAdmin, setIsLeagueAdmin] = useState(false);
    const params = useParams();

    const getLeague = async () => {
        let url = getApiUrl() + "/organizations/" + params.id_league;
        let league_res = await getData(url, false, getToken());
        if (league_res && league_res.data) {
            console.log("ACCOUNT: ", account);
            if (user_is_logged && account && account.public_address){
                setIsLeagueAdmin(league_res.data.admin == account.public_address);
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
        let url = getApiUrl() + "/championships/" + params.id_championship + "/driver_standing";
        let drivers_standings_res = await getData(url, false, getToken());
        if (drivers_standings_res && drivers_standings_res.data) {
            setChampionshipDriversStandings(drivers_standings_res.data);
        } else {
            enqueueSnackbar("Error getting championship drivers standings.", {variant: "error"});
        }
    }

    const getChampionshipTeamsStanding = async () => {
        let url = getApiUrl() + "/championships/" + params.id_championship + "/team_standing";
        let teams_standings_res = await getData(url, false, getToken());
        if (teams_standings_res && teams_standings_res.data) {
            setChampionshipTeamsStandings(teams_standings_res.data);
        } else {
            enqueueSnackbar("Error getting championship teams standings.", {variant: "error"});
        }
    }

    useEffect(() => {
        getLeague();
        getChampionship();
    }, []);

    useEffect(() => {
        if (league && championship){
            getChampionshipDriversStanding();
            getChampionshipTeamsStanding();
        }
    }, [league, championship])

    return (
        <Box sx={{ height: '100%', width: '100%'}}>
            {!user_is_logged ? <PublicAppBar actual_page="leagues"/> : <LoggedAppBar actual_page="leagues"/>}

            {league && <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 3}}>
                <Grid item>
                    <PageTitle title={league.name}/>
                </Grid>
                {isLeagueAdmin && <Grid item sx={{pr: 6}}>
                    <GenericButton
                        textColor={ColorPalette.background_red}
                        onClick={() => {
                            setCreateChampionship(true);
                        }}
                        text="Create Championship"
                        bgColor={ColorPalette.white}
                    />
                </Grid>}
            </Grid>}

            {league && (
                <Box sx={{
                    mx: 6
                }}>
                    {/* DESCRIPTION */}
                    <Typography>
                        {league.description}
                    </Typography>

                    {championships && <ChampionshipsList championships={championships}/>}


                </Box>
            )}

            <CreateChampionshipDialog
                onClose={() => {
                    setCreateChampionship(false);
                    getChampionship();
                }}
                open={createChamiponship}
            />
            
        </Box>
    );
}

export default ChampionshipDetailPage;