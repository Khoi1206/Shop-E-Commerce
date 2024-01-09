// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utiles
import connectDB from "./config/db.js";
import routes from "./routes/index.js";

// Connect Database
const PORT = 5000;
dotenv.config();
connectDB();

const app = express();

// Set up
app.use(
  express.urlencoded({
    extended: true,
  }),
  express.json(),
  cookieParser()
);

app.use("/", routes);

// Config
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
