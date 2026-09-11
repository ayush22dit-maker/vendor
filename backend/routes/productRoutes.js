import express from "express";

import {
    addProduct,
    getAllproduct,
    getproductById,
    updateProduct,
    deleteProducts
} from "../controllers/productcontoller.js";

import { verifyToken } from "../middlewares/authmiddleware.js";
import { authorizeRoles } from "../middlewares/rolemiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get(
    "/",
    getAllproduct
);

router.get(
    "/:id",
    getproductById
);

router.post(
    "/",
    verifyToken,
    authorizeRoles("vendor"),
    upload.single("image"),
    addProduct
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("vendor"),
    upload.single("image"),
    updateProduct
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("vendor"),
    deleteProducts
);

export default router;