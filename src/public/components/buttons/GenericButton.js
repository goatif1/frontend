import { Box, Typography } from "@mui/material";


const GenericButton = (props) => {
    const textColor = props.textColor ?? 'white';

    let button_sx = {
        border: `1px solid ${textColor}`,
        borderRadius: '4px',
        padding: '2px 8px',
        display: 'inline-block',
        cursor: 'pointer'
    };

    if (props.bgColor) button_sx.backgroundColor = props.bgColor;

    return (
        <Box
            sx={button_sx}
            onClick={() => {
                if (props.onClick) props.onClick();
            }}
        >
            <Typography sx={{ color: textColor }}>
                {props.text}
            </Typography>
        </Box>
    );
}

export default GenericButton;