// RegisterPage.js

import React, { useState } from 'react';
import { Button, TextField, Container, CssBaseline, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterPage = () => {

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const handleRegister = () => {
        // Handle registration logic
        console.log('Email: ', email);
        console.log('nickname: ', nickname);
        console.log('password: ', password);
        console.log('repeatPassword: ', repeatPassword);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        value={nickname}
                        onChange={(e) => {
                            setNickname(e.target.value);
                        }}
                        fullWidth
                        id="nickname"
                        label="Nickname"
                        name="nickname"
                        autoComplete="nickname"
                    />
                    <TextField
                        margin="normal"
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        value={repeatPassword}
                        onChange={(e) => {
                            setRepeatPassword(e.target.value);
                        }}
                        fullWidth
                        name="password"
                        label="Repeat password"
                        type="password"
                        id="repeat_password"
                        autoComplete="new-password"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                    <Link to="/login">
                        <Button fullWidth variant="outlined">
                            Already have an account? Login
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;
