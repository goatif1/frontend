import { useState } from "react";
import { getApiUrl, getData } from "../../../api/commons";
import { Box, Grid } from "@mui/material";
import { hasToken } from "../../../utils/access";
import PublicAppBar from "../../components/appbar/PublicAppBar";
import LoggedAppBar from "../../components/appbar/LoggedAppBar";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

const LeagueDetailPage = (props) => {
    const user_is_logged = hasToken();
    const { enqueueSnackbar } = useSnackbar();
    
    // League
    const [league, setLeague] = useState(null);
    const params = useParams();

    console.log("PARAMETERS: ", params);

    // const getLeague = async () => {
    //     let league = null;

    //     let url = getApiUrl() + "/organizations/";
    //     let leagues_result = await getData(url, false, getToken());
    //     if (leagues_result && leagues_result.data) {
    //         console.log("LEAGUES: ", leagues_result.data);
    //         league = leagues_result.data;
    //     } else {
    //         enqueueSnackbar("Error getting leagues.", {variant: "error"});
    //     }


    // }

    // useEffect(() => {
    //     getLeagues();
    // }, [])

    return (
        <Box sx={{ height: '100%', width: '100%'}}>
            {!user_is_logged ? <PublicAppBar actual_page="leagues"/> : <LoggedAppBar actual_page="leagues"/>}

            {/* <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 3}}>
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
            </Grid> */}
            
        </Box>
    );
}

export default LeagueDetailPage;