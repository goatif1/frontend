// RegisterPage.js

import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, CssBaseline, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { getApiUrl, getData, postData } from '../../../api/commons';
import { getToken } from '../../../utils/access';

const RegisterPage = () => {

    const WAIT_NICKNAME = 2000;
    const [timer, setTimer] = useState();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nickname, setNickname] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");

    // Regex
    const nickname_regex = /^[a-zA-Z0-9_-]{3,16}$/;
    const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const password_regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-._,]).{8,}$/;

    const isNicknameAvailable = async (new_nickname) => {
        let url = getApiUrl() + "/auth/nickname?nickname=" + new_nickname;
        let isAvailable_res = await getData(url, true, getToken());

        if (isAvailable_res && isAvailable_res.data){
            if (isAvailable_res.data.available == false){
                setNicknameError(`'${new_nickname}' is not available`);
            }
        }
    }

    const handleRegister = async () => {
        // Handle registration logic
        console.log('Email: ', email);
        console.log('nickname: ', nickname);
        console.log('password: ', password);
        console.log('repeatPassword: ', repeatPassword);
        let url = getApiUrl() + "/auth/register";
        let data = {
            email: email,
            nickname: nickname,
            password: password
        };

        try {
            let register_res = await postData(url, data, false, null);
            if (register_res && register_res.data && register_res.data.status && register_res.data.status == "Success"){
                // TODO: Go to home page
            }
        } catch (e) {
            console.log("Exception on register: ", e);
        }

    };

    let email_correct = email_regex.test(email) && !Boolean(emailError);
    let nickname_correct = nickname_regex.test(nickname) && !Boolean(nicknameError);
    let password_correct = password_regex.test(password) && repeatPassword == password && !Boolean(passwordError) && !Boolean(repeatPasswordError);
    console.log("Email correct: ", email_correct);
    console.log("Nickname correct: ", nickname_correct);
    console.log("Password correct: ", password_correct);

    let fields_valid = email_correct && nickname_correct && password_correct;

    const handleInputChange = (new_nickname) => {
        clearTimeout(timer);
        let new_timer = setTimeout(() => {
            console.log("Timer 2 seconds.");
            isNicknameAvailable(new_nickname);
        }, WAIT_NICKNAME);
        setTimer(new_timer);
    }

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
                            if (email_regex.test(e.target.value)){
                                setEmailError("");
                            } else {
                                setEmailError("Email incorrect format");
                            }
                        }}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={Boolean(emailError)}
                        helperText={emailError}
                    />
                    <TextField
                        margin="normal"
                        required
                        value={nickname}
                        onChange={(e) => {
                            setNickname(e.target.value);
                            setNicknameError("");
                            if (nickname_regex.test(e.target.value)){
                                handleInputChange(e.target.value);
                            } else {
                                setNicknameError("Nickname needs to have between 3 and 16 characters. Only allowed characters are: letters, numbers and '-' and '_' symbols.")
                            }
                        }}
                        fullWidth
                        id="nickname"
                        label="Nickname"
                        name="nickname"
                        autoComplete="nickname"
                        error={Boolean(nicknameError)}
                        helperText={nicknameError}
                    />
                    <TextField
                        margin="normal"
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (password_regex.test(e.target.value)){
                                setPasswordError("");
                            } else {
                                setPasswordError("Invalid password format. Password must have between at least 8 characters, at least one lowercase and one uppercase letter, one digit, and at least one special character (e.g., @, $, !, %, *, ?, &)")
                            }
                        }}
                        error={Boolean(passwordError)}
                        helperText={passwordError}
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
                            if (e.target.value != password){
                                setRepeatPasswordError("Passwords must match.");
                            } else {
                                setRepeatPasswordError("");
                            }
                        }}
                        fullWidth
                        name="password"
                        label="Repeat password"
                        type="password"
                        id="repeat_password"
                        autoComplete="new-password"
                        error={Boolean(repeatPasswordError)}
                        helperText={repeatPasswordError}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleRegister}
                        disabled={!fields_valid}
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
