import { Avatar, Button, ButtonBase, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react"
import RaceResultsDialog from "../dialogs/RaceResultsDialog";
import RouletteIcon from "../../../images/roulette.png";
import RouletteDialog from "../dialogs/RouletteDialog";
import CreateRouletteDialog from "../dialogs/CreateRouletteDialog";
import { enqueueSnackbar } from "notistack";

const RacesList = (props) => {

    const [admin, setAdmin] = useState(props.admin);
    const [races, setRaces] = useState();

    const [selectedRace, setSelectedRace] = useState(null);
    const [seeResults, setSeeResults] = useState(false);
    const [seeRoulette, setSeeRoulette] = useState(false);

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
            name: "Roulette"
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
    console.log("PROPS ADMIN: ", admin);
    
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
                                    <b>{race.name}</b>
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
                                    <ButtonBase
                                        onClick={() => {
                                            if (race && !race.roulette && !admin){
                                                // Case where race has no roulette and user is not the admin
                                                // So there's no place to see the roulette yet
                                                enqueueSnackbar("Roulette has no roulette yet. Wait until Admin generates it.", {variant: "warning"})
                                            } else {
                                                setSelectedRace(race);
                                                setSeeRoulette(true);
                                            }
                                        }}
                                    >
                                        <Avatar
                                            src={RouletteIcon}
                                        />
                                    </ButtonBase>
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
                    admin={admin}
                    onClose={() => {
                        setSelectedRace(null);
                        setSeeResults(false);
                    }}
                />
            )}

            {seeRoulette && selectedRace && selectedRace.roulette && (
                <RouletteDialog
                    race={selectedRace}
                    admin={admin}
                    open={seeRoulette && selectedRace}
                    onClose={() => {
                        setSelectedRace(null);
                        setSeeRoulette(false);
                    }}
                />
            )}

            {seeRoulette && selectedRace && !selectedRace.roulette && (
                <CreateRouletteDialog
                    race={selectedRace}
                    admin={admin}
                    open={seeRoulette && selectedRace}
                    onClose={() => {
                        setSelectedRace(null);
                        setSeeRoulette(false);
                    }}
                />
            )}

        </TableContainer>
    );
}

export default RacesList;