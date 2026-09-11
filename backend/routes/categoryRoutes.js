import express from "express";

import {
    Createcategory,
    Getallcategory,
    GetcategoryById,
    updateCategory,
    Deletecategory
} from "../controllers/categorycontoller.js";

import { verifyToken } from "../middlewares/authmiddleware.js";
import { authorizeRoles } from "../middlewares/rolemiddleware.js";      

const router = express.Router();

// Get all categories
router.get(
    "/",
    Getallcategory
);

// Get category by id
router.get(
    "/:id",
    GetcategoryById
);

// Create category - Vendor only
router.post(
    "/",
    verifyToken,
    authorizeRoles("vendor"),
    Createcategory
);

// Update category - Vendor only
router.put(
    "/:id",
    verifyToken,
    authorizeRoles("vendor"),
    updateCategory
);

// Delete category - Vendor only
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("vendor"),
    Deletecategory
);

export default router;