// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utiles
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// Connect Database
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

const app = express();

// Set up
app.use(express.json(), express.urlencoded({ extended: true }), cookieParser());

// Router
app.use("/", routes);

// Load Image
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// Set up API
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

// Config
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
