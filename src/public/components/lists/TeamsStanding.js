import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";

const TeamsStanding = (props) => {

    const [teams, setTeams] = useState(props.teams);
    const [admin, setAdmin] = useState(props.admin);

    const columns = [
        {
            name: "Position",
            align: "left"
        },
        {
            name: "Name",
            align: "left"
        },
        {
            name: "Total Points",
            align: "left"
        },
        {
            name: "Driver 1",
            align: "left"
        },
        {
            name: "Driver 1 Points",
            align: "left"
        },,
        {
            name: "Driver 2",
            align: "left"
        },
        {
            name: "Driver 2 Points",
            align: "left"
        },
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="teams standing">
                {/* HEADER */}
                <TableHead>
                    <TableRow>
                        {columns.map((column) => {
                            return (
                                <TableCell align={column.align ?? "center"}>
                                    {column.name}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>

                {/* DRIVERS */}
                <TableBody>
                    {teams && teams.length > 0 && teams.map((team, index) => {
                        console.log("TEAM: ", team);
                        return (
                            <TableRow
                                key={team.team_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* Position */}
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                
                                {/* Name */}
                                <TableCell>
                                    <b>{team.name}</b>
                                </TableCell>

                                {/* Total Points */}
                                <TableCell>
                                    <b>{team.total_points}</b>
                                </TableCell>

                                {/* Driver 1 */}
                                <TableCell>
                                    {team.nickname_driver_1 ?? ""}
                                </TableCell>

                                {/* Driver 1 Points */}
                                <TableCell>
                                    {team.points_driver_1 ?? 0}
                                </TableCell>

                                {/* Driver 2 */}
                                <TableCell>
                                    {team.nickname_driver_2 ?? ""}
                                </TableCell>

                                {/* Driver 2 Points */}
                                <TableCell>
                                    {team.points_driver_2 ?? 0}
                                </TableCell>

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TeamsStanding;