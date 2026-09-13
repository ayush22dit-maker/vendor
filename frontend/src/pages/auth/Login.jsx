import { useState } from "react";
import { loginUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    TextField,
    Card,
    CardContent,
} from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await loginUser({
                email,
                password,
            });

            console.log(response.data);


            localStorage.setItem("token", response.data.token);


            navigate("/dashboard");
        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
                        Customber  Login
                    </Typography>

                    <Box component="form" onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Login
                        </Button>

                        <Typography
                            sx={{
                                mt: 1,
                                textAlign: "center",
                                cursor: "pointer",
                                color: "primary.main",
                            }}
                            onClick={() => navigate("/register")}
                        >
                            Create an account
                        </Typography>


                         <Button
                                type="button"
                                variant="text"
                                sx={{
                                    display: "block",
                                    mt: 1,
                                    ml: "auto",
                                    fontWeight: 600,
                                    textTransform: "none",
                                }}
                                onClick={() => {
                                    
                                    navigate("/forgot-password");
                                }}
                            >
                                Forgot Password?
                            </Button>
                            
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
