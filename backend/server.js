import express from "express";
import { connectDB } from "./config/db.js";
import productsRoutes from "./routes/products.routes.js";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();


const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/products", productsRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/fronted/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "fronted", "dist", "index.html"));
    });
} else {
    // Basic route for testing API in development
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is running at http://localhost:${PORT}`);
    } catch (error) {
        console.error("Failed to connect to database:", error);
        process.exit(1);
    }
});