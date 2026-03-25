import express from "express";
import cookieParser from "cookie-parser";
import connectToDB from "./utils/connectDB.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();

import todoRoutes from "./routes/todo-routes.js";
import authRoutes from "./routes/auth-routes.js";

app.use(express.json());
app.use(cookieParser());

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

connectToDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
