import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getAllCategories, deleteCategory, updateCategory } from "../api/api.js";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();

            setCategories(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);

            setCategories(categories.filter((category) => category.id !== id))

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >
                <Typography variant="h4">
                    Categories
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate("/categories/add")}
                >
                    Add Category
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    {category.id}
                                </TableCell>

                                <TableCell>
                                    {category.name}
                                </TableCell>

                                <TableCell>
                                    {category.description}
                                </TableCell>

                                <TableCell>
                                    {category.status}
                                </TableCell>

                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            navigate(`/categories/edit/${category.id}`)
                                        }
                                    >
                                        Edit
                                    </Button>

                                    <Button color="error"
                                        onClick={() => handleDelete(category.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CategoryList;
