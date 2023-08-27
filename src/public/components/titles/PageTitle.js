import { Typography } from "@mui/material";
import ColorPalette from "../../../styles/colors_palette";

const PageTitle = (props) => {

    return (
        <Typography sx={{ color: ColorPalette.background_red, pl: 6, fontWeight: 'bold', fontSize: 'h3.fontSize' }}>{props.title}</Typography>
    );
}

export default PageTitle;