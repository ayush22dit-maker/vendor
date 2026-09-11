import fs from "fs";
import multer from "multer";
import path from "path";

const uploadDir = path.resolve("uploads/products");
fs.mkdirSync(uploadDir, { recursive: true });

export const isAllowedImage = (file = {}) => {
    const allowedMimeTypes = new Set([
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ]);

    const allowedExtensions = new Set([
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    ]);

    const originalName = String(file.originalname || "");
    const mimetype = String(file.mimetype || "").toLowerCase();
    const extension = path.extname(originalName).toLowerCase();

    const hasAllowedExtension = allowedExtensions.has(extension);
    const hasAllowedMimeType = allowedMimeTypes.has(mimetype);

    return hasAllowedExtension || hasAllowedMimeType;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const fileName = Date.now() + "-" + file.originalname;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (isAllowedImage(file)) {
        cb(null, true);
    } else {
        cb(
            new Error("Only JPG, JPEG, PNG and WEBP images are allowed"),
            false
        );
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;