import db from "./config/db.js";
import bcrypt from "bcrypt";

const createVendor = async () => {
    try {
        const password = "vendor123";

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            "CALL sp_RegisterUser(?,?,?,?)",
            [
                1,
                "Test Vendor",
                "vendor@gmail.com",
                hashedPassword
            ]
        );

        console.log("Vendor created successfully");
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit();
    }
};

createVendor();