import { makeStyles } from "@mui/styles";

// const APP_LOGO_PATH = "src/assets/images/app_logo.jpg";
const APP_LOGO_PATH = "./images/app_logo.jpg";

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

    return (
        <img
            className={classes.imageButton}
            src={APP_LOGO_PATH}
            onClick={() => {
                console.log("button clicked")
            }}
            alt="home"
        />
    );
}

export default AppBarLogoButton;