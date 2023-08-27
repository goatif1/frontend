import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const AllLeaguesList = (props) => {

    let leagues = props.leagues;

    return (
        <Box sx={{width: "100%" }}>
            <List>
                {leagues.map((league) => {
                    return (
                        <ListItem>
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