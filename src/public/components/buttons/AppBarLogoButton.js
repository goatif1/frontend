import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { hasToken } from "../../../utils/access";
import app_logo from "../../../images/app_logo.jpg";

// const APP_LOGO_PATH = "./images/app_logo.jpg";
// const APP_LOGO_PATH = "./images/app_logo.jpg";

const useStyles = makeStyles({
    imageButton: {
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.9,
        },
    },
});

const AppBarLogoButton = (props) => {
    const classes = useStyles();
    let navigate = useNavigate();
    const user_is_logged = hasToken();

    return (
        <img
            className={classes.imageButton}
            src={app_logo}
            // src={APP_LOGO_PATH}
            onClick={() => {
                if (user_is_logged){
                    navigate("/home");
                } else {
                    navigate("/");
                }
            }}
            alt="home"
        />
    );
}

export default AppBarLogoButton;