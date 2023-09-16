import { Box, Typography } from "@mui/material";

const STATUS_NOTSTARTED = 1;
const STATUS_INPROGRESS = 2;
const STATUS_FINISHED = 3;
const STATUS_CANCELLED = 4;

/*
Championship.status:
1 - Not started - orange - #F4B860
2 - In progress - blue - #A9D3FF
3 - Finished - green - #1B998B
4 - Cancelled - red - #C83E4D
*/
const status_config_from_id = (status) => {
    switch (status) {
        case STATUS_NOTSTARTED:
            return {
                text: "Not started",
                bg_color: "#F4B860"
            };
        case STATUS_INPROGRESS:
            return {
                text: "In progress",
                bg_color: "#A9D3FF"
            };
        case STATUS_FINISHED:
            return {
                text: "Finished",
                bg_color: "#1B998B"
            };
        case STATUS_CANCELLED:
            return {
                text: "Cancelled",
                bg_color: "#C83E4D"
            };
    }
}

const ChampionshipStatus = (props) => {
    let config = status_config_from_id(props.status);

    return (
        <Box sx={{
            opacity: 0.5, 
            backgroundColor: config.bg_color,
            pt: 0.5,
            pb: 0.5,
            mt: 1,
            borderRadius: 2
        }}>
            <Typography sx={{fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase'}}>
                {config.text}
            </Typography>
        </Box>
    );
}

export default ChampionshipStatus;