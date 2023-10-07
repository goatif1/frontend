import { Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react"
import RaceResultsDialog from "../dialogs/RaceResultsDialog";

const RacesList = (props) => {

    const [races, setRaces] = useState();
    const [selectedRace, setSelectedRace] = useState(null);
    const [seeResults, setSeeResults] = useState(false);

    const columns = [
        {
            name: "Order"
        },
        {
            name: "Name"
        },
        {
            name: "Description"
        },
        {
            name: "Circuit"
        },
        {
            name: "Country"
        },
        {
            name: "Status"
        },
        {
            name: "Race date"
        },
        {
            name: "Results"
        }
    ];

    useEffect(() => {
        let ordered_races = props.races.sort((race_a, race_b) => {
            if (race_a.race_datetime_utc == race_b.race_datetime_utc){
                return race_a.id_race - race_b.id_race;
            }
            return race_a.race_datetime_utc - race_b.datetime_utc;
        });
        for (const race of ordered_races){
            let date = new Date(race.race_datetime_utc);
            let localeDate =  date.toLocaleString('en-GB', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, day: "2-digit", month: "2-digit", year:"numeric", hour: "2-digit", minute: "2-digit", minute: "2-digit"});
            console.log("RACE DATE: ", localeDate);
            race.race_datetime_lt = localeDate;
        }
        setRaces(ordered_races);
    }, []);

    console.log("PROPS RACES: ", props.races);
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="races">
                {/* Header */}
                <TableHead>
                    <TableRow>
                        {columns.map((column) => {
                            return (
                                <TableCell align="left">
                                    {column.name}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>

                {/* Races */}
                <TableBody>

                    {races && races.length > 0 && races.map((race, index) => {
                        return (
                            <TableRow
                                key={race.race_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>

                                <TableCell>
                                    {race.name}
                                </TableCell>

                                <TableCell>
                                    {race.description}
                                </TableCell>

                                <TableCell>
                                    {`${race.circuit_name} - ${race.circuit_description}`}
                                </TableCell>

                                <TableCell>
                                    {race.circuit_country}
                                </TableCell>

                                <TableCell>
                                    <Chip 
                                        label={race.race_finished ? "Finished" : "Not started"}
                                        variant={race.race_finished ? "outlined" : "filled"}
                                        color={race.race_finished ? "success" : "default"}
                                    />
                                </TableCell>

                                <TableCell>
                                    {race.race_datetime_lt}
                                </TableCell>

                                <TableCell>
                                    <Button
                                        disabled={!race.race_finished}
                                        variant="outlined"
                                        onClick={() => {
                                            setSelectedRace(race);
                                            setSeeResults(true);
                                        }}
                                    >
                                        {"See race results"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            {seeResults && selectedRace && (
                <RaceResultsDialog
                    race={selectedRace}
                    onClose={() => {
                        setSelectedRace(null);
                        setSeeResults(false);
                    }}
                />
            )}

        </TableContainer>
    );
}

export default RacesList;