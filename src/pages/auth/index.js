import { useState } from "react"
import axios from '@/lib/axios'
import {
    Box, Button, Container, CssBaseline, Grid, Link, Paper, TextField, Typography
} from "@mui/material";

export default function Login() {

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const handleLogin = async (event) => {
        event.preventDefault();
        
        const data = new FormData(event.currentTarget);
        await csrf()
        axios.post('/api/auth/login', data)
            .then(response => console.log(response))
            .catch(error => console.error(error))
    }

    return (
        <Container component="main" maxWidth="lg">
            <Box
                sx={{
                    marginTop: 8,
                }}
            >
                <Grid container>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: "url('/login.jpg')",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleLogin}
                                sx={{ mt: 1 }}
                            >
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
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>

                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>

                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    )
}