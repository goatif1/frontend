import { useEffect, useState } from "react";
import LoadingSection from "../../components/loading/LoadingSection";
import { Box } from "@mui/material";


const NextWeekendSection = (props) => {
    const [weekend, setWeekend] = useState(null);

    const fetchData = async () => {
        setWeekend({
            id: 1,
            alias: "Bahrein - Gulf Air Bahrein Grand Prix 2023",
            image: "https://media.formula1.com/image/upload/f_auto/q_auto/v1677245020/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Bahrain.jpg.transform/8col/image.jpg",
            weekend_type: 1,
            race_id: 1,
            race_finished: false,
            race_date: "14/09/2023 19:30"
        });
        console.log("FETCH DATA");
    }

    useEffect(() => {
        fetchData();
    }, [])

    return 
        {!weekend && 
            <Box sx={{ height: '200px', backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                <LoadingSection />
            </Box>
        }
        {weekend && 
            <Box sx={{ height: '200px', backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                <LoadingSection />
            </Box>
        }
    ;
}

export default NextWeekendSection;