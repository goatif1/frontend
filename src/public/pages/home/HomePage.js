import { Box } from "@mui/material";
import LoggedAppBar from "../../components/appbar/LoggedAppBar";


const HomePage = (props) => {

    return (
        <Box height="100vh">
            <LoggedAppBar/>
            <Box>
                <p>User is logged in</p>
            </Box>
        </Box>
    );
}

export default HomePage;