import PublicAppBar from "../../components/appbar/PublicAppBar";
import ColorPalette from "../../../styles/colors_palette";
import { Box, Stack, Typography, Grid } from "@mui/material";
import LoggedAppBar from "../../components/appbar/LoggedAppBar";
import { hasToken } from "../../../utils/access";
import GenericButton from "../../components/buttons/GenericButton";
import CreateLeagueDialog from "../../components/dialogs/CreateLeagueDialog";
import { useState } from "react";


const LeaguesPage = (props) => {

    const user_is_logged = hasToken();

    const [createLeagueOpen, setCreateLegueOpen] = useState(false);

    const handleCreateLeagueDialogOpen = () => {
        setCreateLegueOpen(true);
    }

    const handleCreateLeagueDialogClose = () => {
        setCreateLegueOpen(false);
    }

    console.log("LEAGUES PAGE");

    return (
        <Box sx={{ height: '100%', width: '100%', bgcolor: ColorPalette.background }}>
            {!user_is_logged ? <PublicAppBar/> : <LoggedAppBar/>}

            <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 6}}>
                <Grid item>
                    <Typography variant="h6">Leagues</Typography>
                </Grid>
                <Grid item>
                    <GenericButton
                        textColor="white"
                        onClick={() => {
                            console.log("Create League CLICKED!");
                            handleCreateLeagueDialogOpen();
                        }}
                        text="Create League"
                    />
                </Grid>
            </Grid>

            <CreateLeagueDialog
                open={createLeagueOpen}
                onClose={handleCreateLeagueDialogClose}
            />
            
        </Box>
    );
}

export default LeaguesPage;