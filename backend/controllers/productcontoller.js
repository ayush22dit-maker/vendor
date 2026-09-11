import db from "../config/db.js";

export const addProduct = async (req, res) => {
    try {
        const {
            category_id,
            name,
            description,
            status,
            price,
            discount,
            stock_quantity
        } = req.body;

        const vendor_id = req.user.id;

        if (!category_id || !name || !description || !status || !price || !stock_quantity) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload product image"
            });
        }

        if (price < 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be positive"
            });
        }

        if (discount < 0 || discount > 100) {
            return res.status(400).json({
                success: false,
                message: "Discount must be between 0 and 100"
            });
        }

        if (stock_quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock quantity must be positive"
            });
        }

        const images = JSON.stringify([
            req.file.filename
        ]);

        const [result] = await db.query(
            "CALL sp_addProducts(?,?,?,?,?,?,?,?,?)",
            [
                category_id,
                vendor_id,
                name,
                description,
                status,
                price,
                discount || 0,
                stock_quantity,
                images
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
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

export const getAllproduct = async (req, res) => {
    try {
        const [result] = await db.query(
            "CALL getProduct()"
        );

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
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

export const getproductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product id is required"
            });
        }

        const [result] = await db.query(
            "CALL getProductById(?)",
            [id]
        );

        const product = result[0][0];

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            category_id,
            name,
            description,
            status,
            price,
            discount,
            stock_quantity
        } = req.body;

        const vendor_id = req.user.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product id is required"
            });
        }

        if (!category_id || !name || !description || !status || !price || !stock_quantity) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload product image"
            });
        }

        if (price < 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be positive"
            });
        }

        if (discount < 0 || discount > 100) {
            return res.status(400).json({
                success: false,
                message: "Discount must be between 0 and 100"
            });
        }

        if (stock_quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock quantity must be positive"
            });
        }

        const images = JSON.stringify([
            req.file.filename
        ]);

        const [result] = await db.query(
            "CALL updateProducts(?,?,?,?,?,?,?,?,?,?)",
            [
                id,
                category_id,
                vendor_id,
                name,
                description,
                status,
                price,
                discount || 0,
                stock_quantity,
                images
            ]
        );

        const product = result[0][0];

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found or unauthorized"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor_id = req.user.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product id is required"
            });
        }

        await db.query(
            "CALL DeleteProduct(?,?)",
            [
                id,
                vendor_id
            ]
        );

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};