import PublicAppBar from "../../components/appbar/PublicAppBar";
import ColorPalette from "../../../styles/colors_palette";
import { Box, Stack, Typography, Grid } from "@mui/material";
import LoggedAppBar from "../../components/appbar/LoggedAppBar";
import { getToken, hasToken } from "../../../utils/access";
import GenericButton from "../../components/buttons/GenericButton";
import CreateLeagueDialog from "../../components/dialogs/CreateLeagueDialog";
import { useContext, useEffect, useState } from "react";
import AccountContext from "../../contexts/AccountContext";
import { getApiUrl, getData } from "../../../api/commons";
import { useSnackbar } from "notistack";


const LeaguesPage = (props) => {

    const user_is_logged = hasToken();
    const { account, setAccount } = useContext(AccountContext);
    const { enqueueSnackbar } = useSnackbar();
    
    // Leagues
    const [myLeagues, setMyLeagues] = useState(null);
    const [all_leagues, setAllLeagues] = useState(null);
    
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
            setMyLeagues(my_leagues);
        }

        if (leagues && leagues.length > 0){
            setAllLeagues(leagues);
        }
    }

    useEffect(() => {
        getLeagues();
    }, [])

    return (
        <Box sx={{ height: '100%', width: '100%', bgcolor: ColorPalette.background }}>
            {!user_is_logged ? <PublicAppBar/> : <LoggedAppBar/>}

            <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 6}}>
                <Grid item>
                    <Typography variant="h6">Leagues</Typography>
                </Grid>
                {user_is_logged && <Grid item>
                    <GenericButton
                        textColor="white"
                        onClick={() => {
                            console.log("Create League CLICKED!");
                            handleCreateLeagueDialogOpen();
                        }}
                        text="Create League"
                    />
                </Grid>}
            </Grid>

            {myLeagues && myLeagues.length > 0 && <Box>

            </Box>}

            <CreateLeagueDialog
                open={createLeagueOpen}
                onClose={handleCreateLeagueDialogClose}
            />
            
        </Box>
    );
}

export default LeaguesPage;