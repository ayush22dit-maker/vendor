import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { createCategory } from "../api/api.js";

const CategoryForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Active");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            await createCategory({
                name,
                description,
                status
            });

            navigate("/categories");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Category add failed"
            );
        }
    };

    return (
        <Box>
            <Typography variant="h4" mb={3}>
                Add Category
            </Typography>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        {error && (
                            <Typography
                                color="error"
                                mb={2}
                            >
                                {error}
                            </Typography>
                        )}

                        <TextField
                            fullWidth
                            label="Category Name"
                            margin="normal"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                        <TextField
                            fullWidth
                            label="Description"
                            margin="normal"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                        <FormControl
                            fullWidth
                            margin="normal"
                        >
                            <InputLabel>
                                Status
                            </InputLabel>

                            <Select
                                value={status}
                                label="Status"
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >
                                <MenuItem value="Active">
                                    Active
                                </MenuItem>

                                <MenuItem value="Inactive">
                                    Inactive
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            Add Category
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CategoryForm;
