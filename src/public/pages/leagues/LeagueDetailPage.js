import { useState, useEffect, useContext } from "react";
import { getApiUrl, getData } from "../../../api/commons";
import { Box, Grid, Typography } from "@mui/material";
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

const LeagueDetailPage = (props) => {
    const user_is_logged = hasToken();
    const account = getAccount();
    console.log("ACCOUNT: ", account);
    const { enqueueSnackbar } = useSnackbar();
    
    // League
    const [league, setLeague] = useState(null);
    const [championships, setChampionships] = useState(null);
    const [isLeagueAdmin, setIsLeagueAdmin] = useState(false);
    const params = useParams();

    // Create
    const [createChamiponship, setCreateChampionship] = useState(false);

    const getLeague = async () => {
        let url = getApiUrl() + "/organizations/" + params.id_league;
        let league_res = await getData(url, false, getToken());
        if (league_res && league_res.data) {
            console.log("ACCOUNT: ", account);
            if (user_is_logged && account){
                setIsLeagueAdmin(league_res.data.admin == account);
            }
            setLeague(league_res.data);
        } else {
            enqueueSnackbar("Error getting league.", {variant: "error"});
        }
    }

    const getChampionships = async () => {
        let url = getApiUrl() + "/organizations/" + params.id_league + "/championships";
        let championships_res = await getData(url, false, getToken());
        if (championships_res && championships_res.data) {
            setChampionships(championships_res.data);
        } else {
            enqueueSnackbar("Error getting championships.", {variant: "error"});
        }
    }

    useEffect(() => {
        getLeague();
        getChampionships();
    }, []);

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
                    getChampionships();
                }}
                open={createChamiponship}
            />
            
        </Box>
    );
}

export default LeagueDetailPage;