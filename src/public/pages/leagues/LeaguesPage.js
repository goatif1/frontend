import PublicAppBar from "../../components/appbar/PublicAppBar";
import { Box, Typography, Grid } from "@mui/material";
import LoggedAppBar from "../../components/appbar/LoggedAppBar";
import { getToken, hasToken } from "../../../utils/access";
import CreateLeagueDialog from "../../components/dialogs/CreateLeagueDialog";
import { useEffect, useState } from "react";
import { getApiUrl, getData } from "../../../api/commons";
import { useSnackbar } from "notistack";
import AllLeaguesList from "../../components/lists/AllLeaguesList";
import PageTitle from "../../components/titles/PageTitle";
import ColorPalette from "../../../styles/colors_palette";
import GenericButton from "../../components/buttons/GenericButton";


const LeaguesPage = (props) => {

    const user_is_logged = hasToken();
    const { enqueueSnackbar } = useSnackbar();
    
    // Leagues
    const [myLeagues, setMyLeagues] = useState(null);
    const [allLeagues, setAllLeagues] = useState(null);
    
    // Dialog
    const [createLeagueOpen, setCreateLegueOpen] = useState(false);
    const handleCreateLeagueDialogOpen = () => {
        setCreateLegueOpen(true);
    }
    const handleCreateLeagueDialogClose = () => {
        setCreateLegueOpen(false);
        getLeagues();
    }

    const getLeagues = async () => {
        let leagues = null;
        let my_leagues = null;

        let url = getApiUrl() + "/organizations/";
        let leagues_result = await getData(url, false, getToken());
        if (leagues_result && leagues_result.data) {
            console.log("LEAGUES: ", leagues_result.data);
            leagues = leagues_result.data;
        } else {
            enqueueSnackbar("Error getting leagues.", {variant: "error"});
        }

        if (user_is_logged){
            let url_my_leagues = getApiUrl() + "/organizations/admin";
            let my_leagues_result = await getData(url_my_leagues, true, getToken());
            if (my_leagues_result && my_leagues_result.data) {
                my_leagues = my_leagues_result.data;
            } else {
                enqueueSnackbar("Error getting my leagues.", {variant: "error"});
            }
        }

        if (my_leagues && my_leagues.length > 0){
            my_leagues = my_leagues.sort((league_a, league_b) => league_a.name.localeCompare(league_b.name));
            setMyLeagues(my_leagues);
        }

        if (leagues && leagues.length > 0){
            leagues = leagues.sort((league_a, league_b) => league_a.name.localeCompare(league_b.name));
            setAllLeagues(leagues);
        }
    }

    useEffect(() => {

        getLeagues();
    }, [])

    return (
        <Box sx={{ height: '100%', width: '100%'}}>
            {!user_is_logged ? <PublicAppBar actual_page="leagues"/> : <LoggedAppBar actual_page="leagues"/>}

            <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 3}}>
                <Grid item>
                    <PageTitle title="Leagues"/>
                </Grid>
                {user_is_logged && <Grid item sx={{pr: 6}}>
                    <GenericButton
                        textColor={ColorPalette.background_red}
                        onClick={() => {
                            handleCreateLeagueDialogOpen();
                        }}
                        text="Create League"
                        bgColor={ColorPalette.white}
                    />
                </Grid>}
            </Grid>

            {myLeagues && myLeagues.length > 0 && <Box>

            </Box>}

            <Typography variant="h8">Leagues</Typography>
            {allLeagues && allLeagues.length > 0 && <AllLeaguesList leagues={allLeagues}/>}

            <CreateLeagueDialog
                open={createLeagueOpen}
                onClose={handleCreateLeagueDialogClose}
            />
            
        </Box>
    );
}

export default LeaguesPage;