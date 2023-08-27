import { Typography } from "@mui/material";
import ColorPalette from "../../../styles/colors_palette";

const SectionTitle = (props) => {

    return (
        <Typography sx={{ color: ColorPalette.background_red, pl: 6, pr:6, fontWeight: 'bold', fontSize: 'h5.fontSize' }}>{props.title}</Typography>
    );
}

export default SectionTitle;