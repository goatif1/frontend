import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ColorPalette from "../../../styles/colors_palette";
import { useNavigate } from "react-router-dom";

const MyLeaguesList = (props) => {

    let navigate = useNavigate();
    let leagues = props.leagues;

    return (
        <Box sx={{mt: 2, ml: 6, mb: 4, mr: 6, border: `2px solid ${ColorPalette.white}`, borderRadius: '16px'}}>
            <List style={{maxHeight: 400, overflow: "auto"}}>
                {leagues.map((league, index) => {
                    return (
                        <ListItem disablePadding>
                            <ListItemButton
                            onClick={(event) => {
                                navigate(`/leagues/${league.id}`);
                            }}
                            >
                                <ListItemText primary={league.name} secondary={league.description}/>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}

export default MyLeaguesList;