import express from "express";
import todoRoutes from "./routes/todo-routes.js";
const app = express();

app.use(express.json());

// app.use("/", (req, res) => {
//   res.send("Server is Healthy...");
// });

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

// app.get("/about", (req, res) => {
//   res.send("About Page");
// });

// app.get("/contact", (req, res) => {
//   res.send("Contact Page");
// });

app.use("/api/todos", todoRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// GET - to fetch data
// POST - to create data
// PUT - to update data
// PATCH - to partially update data
// DELETE - to delete data
