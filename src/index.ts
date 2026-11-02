
import express from "express";
import taskRoutes from "./routes/task.routes";

const app = express();
const PORT = 5000;

// Middleware untuk membaca JSON dari request body
app.use(express.json());

// Menghubungkan routes
app.use("/tasks", taskRoutes);

// Endpoint utama
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Management API is running!",
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
