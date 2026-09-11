import { useState } from "react";
import { loginUser } from "../../api/api.js";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Typography,
    Button,
    TextField,
    Card,
    CardContent
} from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({
                email,
                password
            });

            if (response.data.user.role !== "vendor") {
                alert("Only vendor can access this panel!");
                return;
            }

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Card sx={{ width: 400 }}>
                <CardContent>

                    <Typography
                        variant="h5"
                        sx={{ mb: 2 }}
                    >
                        Vendor Login
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleLogin}
                    >
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            margin="normal"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Login
                        </Button>
                    </Box>

                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
