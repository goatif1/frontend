import { Box, Typography } from "@mui/material";


const AppBarAccountButton = (props) => {
    const textColor = props.textColor ?? 'white';
    const borderRadius = props.borderRadius ?? '4px';
    const padding = props.padding ?? '2px 8px';

    let button_sx = {
        border: `1px solid ${textColor}`,
        borderRadius: {borderRadius},
        padding: {padding},
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

export default AppBarAccountButton;