import { Box, ButtonBase, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import ColorPalette from "../../../styles/colors_palette";
import { useNavigate } from "react-router-dom";
import ChampionshipStatus from "../info/ChampionshipStatus";

const ChampionshipsList = (props) => {

    let navigate = useNavigate();
    let championships = props.championships;

    return (
        <Box sx={{mt: 2, mb: 4, }} >
            <List style={{display: "flex", flexDirection: "row", overflowX: "auto"}}>
                {championships.map((championship, index) => {
                    return (<ButtonBase
                        sx={{
                            borderRadius: '16px',
                            ml: index == 0 ? 0 : 4,
                        }}
                        onClick={(event) => {
                            navigate(`/championships/${championship.id}`);
                        }}
                        >
                            <Box sx={{
                                border: 0.5, 
                                borderRadius: '16px', 
                                px: 2, 
                                py: 3, 
                                width: 180,
                                borderColor: ColorPalette.background_red
                            }}>
                                <Typography sx={{fontWeight: 'bold', fontSize: 16}}>
                                    {championship.name}
                                </Typography>
                                <Typography sx={{fontWeight: 'light', fontSize: 12}}>
                                    {championship.description}
                                </Typography>

                                <ChampionshipStatus
                                    status={championship.championship_status}
                                />
                            </Box>
                    </ButtonBase>);
                })}
            </List>
        </Box>
    );
}

export default ChampionshipsList;