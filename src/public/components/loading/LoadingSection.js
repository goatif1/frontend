import { CircularProgress } from "@mui/material";
import ColorPalette from "../../../styles/colors_palette";


const LoadingSection = (props) => {
    return (
        <CircularProgress sx={{ color: ColorPalette.accent_dark }}/>
    );
}

export default LoadingSection;