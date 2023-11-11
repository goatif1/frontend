// LoginPage.js

import React from 'react';
import { Button, TextField, Container, CssBaseline, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const handleLogin = () => {
    // Handle login logic
    console.log('Login clicked');
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
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
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
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link to="/register">
            <Button fullWidth variant="outlined">
              Don't have an account? Register
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
