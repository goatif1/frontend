import { Box, Typography } from "@mui/material";
import ColorPalette from "../../../styles/colors_palette";


const AppBarPageButton = (props) => {
    const padding = props.padding ?? '2px 8px';

    let button_sx = {
        padding: {padding},
        display: 'inline-block',
        cursor: 'pointer'
    };

    let typography_sx = {
        color: ColorPalette.white,
        textDecoration: 'underline',
    };
    if (props.selected){
        typography_sx = {
            color: "white",
            textDecoration: 'underline',
            fontWeight: 'bold'
        }
    }

    if (props.bgColor) button_sx.backgroundColor = props.bgColor;

    return (
        <Box
            sx={button_sx}
            onClick={() => {
                if (props.onClick) props.onClick();
            }}
        >
            <Typography sx={typography_sx}>
                {props.text}
            </Typography>
        </Box>
    );
}

export default AppBarPageButton;