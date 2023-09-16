import { Box, ButtonBase, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import ColorPalette from "../../../styles/colors_palette";
import { useNavigate } from "react-router-dom";

const MyLeaguesList = (props) => {

    let navigate = useNavigate();
    let leagues = props.leagues;

    return (
        <Box sx={{mt: 2, ml: 6, mb: 4, mr: 6 }} >
            <List style={{display: "flex", flexDirection: "row", overflowX: "auto"}}>
                {leagues.map((league, index) => {
                    return (<ButtonBase
                        sx={{
                            borderRadius: '16px',
                            ml: index == 0 ? 0 : 4,
                        }}
                        onClick={(event) => {
                            navigate(`/leagues/${league.id}`);
                        }}
                        >
                            <Box sx={{
                                border: 0.5, 
                                borderRadius: '16px', 
                                px: 2, 
                                py: 3, 
                                width: 180,
                                height: 45,
                                borderColor: ColorPalette.background_red
                            }}>
                                <Typography sx={{fontWeight: 'bold', fontSize: 16}}>
                                    {league.name}
                                </Typography>
                                <Typography sx={{fontWeight: 'light', fontSize: 12}}>
                                    {league.description}
                                </Typography>
                            </Box>
                    </ButtonBase>);
                })}
            </List>
        </Box>
    );
}

export default MyLeaguesList;