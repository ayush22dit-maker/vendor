import { useState } from "react";
import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    TextField,
    Card,
    CardContent,
} from "@mui/material";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await registerUser({
                name,
                email,
                password,
            });

            console.log(response.data);


            navigate("/login");
        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message || "Registration failed"
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
                        Register
                    </Typography>

                    <Box component="form" onSubmit={handleRegister}>
                        <TextField
                            fullWidth
                            label="Name"
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

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
                            Register
                        </Button>

                        <Typography
                            sx={{
                                mt: 1,
                                textAlign: "center",
                                cursor: "pointer",
                                color: "primary.main",
                            }}
                            onClick={() => navigate("/login")}
                        >
                            Already have an account? Login
                        </Typography>

                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Register;
