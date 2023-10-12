import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";

const DriversStanding = (props) => {

    const [drivers, setDrivers] = useState(props.drivers);
    const [admin, setAdmin] = useState(props.admin);
    const columns = [
        {
            name: "Position",
            align: "left"
        },
        {
            name: "Nickname",
            align: "left"
        },
        {
            name: "Address",
            align: "left"
        },
        {
            name: "Total Points",
            align: "left"
        },
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="drivers standing">
                {/* HEADER */}
                <TableHead>
                    <TableRow>
                        {columns.map((column) => {
                            return (
                                <TableCell align={column.align}>
                                    {column.name}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>

                {/* DRIVERS */}
                <TableBody>
                    {drivers.map((driver, index) => {
                        return (
                            <TableRow
                                key={driver.address_driver}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* Position */}
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>

                                {/* Nickname */}
                                <TableCell>
                                    <b>{driver.nickname}</b>
                                </TableCell>
                                
                                {/* Address */}
                                <TableCell>
                                    {driver.address_driver}
                                </TableCell>

                                {/* Total Points */}
                                <TableCell>
                                    <b>{driver.total_points}</b>
                                </TableCell>

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DriversStanding;