import { useState, useEffect, useContext } from "react";
import { getApiUrl, getData } from "../../../api/commons";
import { Box, Grid } from "@mui/material";
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

const LeagueDetailPage = (props) => {
    const user_is_logged = hasToken();
    const {account} = useContext(AccountContext);
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
            if (user_is_logged && account && account.public_address){
                setIsLeagueAdmin(league_res.data.admin == account.public_address);
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