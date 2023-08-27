import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ColorPalette from "../../../styles/colors_palette";

const AllLeaguesList = (props) => {

    let leagues = props.leagues;

    return (
        <Box sx={{mt: 2, ml: 6, mr: 6, border: `2px solid ${ColorPalette.background_red}`, borderRadius: '16px'}}>
            <List style={{maxHeight: 400, overflow: "auto"}}>
                {leagues.map((league, index) => {
                    return (
                        <ListItem disablePadding sx={{backgroundColor: index % 2 != 0 ? ColorPalette.white : "white"}}>
                            <ListItemButton>
                                <ListItemText primary={league.name} secondary={league.description}/>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}

export default AllLeaguesList;