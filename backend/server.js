import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';


dotenv.config();
 const PORT  = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/uploads' , express.static("uploads"))

app.use("/api/auth",authRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/products",productRoutes);

app.get("/" , (req, res) =>{
    res.send("server is running ");
})

app.listen(PORT,()=>{
    console.log(`backend server is running on http://localhost:${PORT}`)
} );
