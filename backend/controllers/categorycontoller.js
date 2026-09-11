import db from "../config/db.js";

export const Createcategory = async (req, res) => {
    try {
        const { name, description, status } = req.body;

        if (!name || !description || !status) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            });
        }

        const [result] = await db.query(
            "CALL sp_AddCategory(?,?,?)",
            [name, description, status]
        );

        return res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: result[0][0]
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const Getallcategory = async (req, res) => {
    try {
        const [result] = await db.query(
            "CALL sp_GetCategories()"
        );

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: result[0]
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const GetcategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Category id is required"
            });
        }

        const [result] = await db.query(
            "CALL sp_GetCategoryById(?)",
            [id]
        );

        const category = result[0][0];

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: category
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Category id is required"
            });
        }

        if (!name || !description || !status) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            });
        }

        const [result] = await db.query(
            "CALL sp_UpdateCategory(?,?,?,?)",
            [
                id,
                name,
                description,
                status
            ]
        );

        const category = result[0][0];

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const Deletecategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Category id is required"
            });
        }

        const [result] = await db.query(
            "CALL sp_DeleteCategory(?)",
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};