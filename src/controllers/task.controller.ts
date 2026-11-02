
import { Request, Response } from "express";
import { Task } from "../types/task";

// Dummy data sementara (in-memory)
let tasks: Task[] = [
  {
    id: 1,
    title: "Belajar TypeScript",
    description: "Mempelajari dasar TypeScript",
    status: "pending",
  },
  {
    id: 2,
    title: "Membuat REST API",
    description: "Membuat API menggunakan Express.js",
    status: "completed",
  },
];

// GET /tasks
// Mengambil seluruh daftar tugas
export const getTasks = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Berhasil mengambil seluruh tugas",
    data: tasks,
  });
};

// GET /tasks/:id
// Mengambil detail tugas berdasarkan ID
export const getTaskById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID tugas tidak valid",
    });
  }

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Tugas tidak ditemukan",
    });
  }

  res.status(200).json({
    success: true,
    message: "Berhasil mengambil detail tugas",
    data: task,
  });
};

// POST /tasks
// Menambahkan tugas baru
export const createTask = (req: Request, res: Response) => {
  const { title, description, status } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof description !== "string" ||
    !description.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Title dan description wajib diisi",
    });
  }

  if (
    status !== undefined &&
    status !== "pending" &&
    status !== "completed"
  ) {
    return res.status(400).json({
      success: false,
      message: "Status hanya boleh pending atau completed",
    });
  }

  const newTask: Task = {
    id: tasks.length > 0
      ? Math.max(...tasks.map((task) => task.id)) + 1
      : 1,
    title: title.trim(),
    description: description.trim(),
    status: status ?? "pending",
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Tugas berhasil ditambahkan",
    data: newTask,
  });
};

// PUT /tasks/:id
// Memperbarui tugas berdasarkan ID
export const updateTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID tugas tidak valid",
    });
  }

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Tugas tidak ditemukan",
    });
  }

  const { title, description, status } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof description !== "string" ||
    !description.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Title dan description wajib diisi",
    });
  }

  if (
    status !== undefined &&
    status !== "pending" &&
    status !== "completed"
  ) {
    return res.status(400).json({
      success: false,
      message: "Status hanya boleh pending atau completed",
    });
  }

  const updatedTask: Task = {
    id,
    title: title.trim(),
    description: description.trim(),
    status: status ?? tasks[taskIndex].status,
  };

  tasks[taskIndex] = updatedTask;

  res.status(200).json({
    success: true,
    message: "Tugas berhasil diperbarui",
    data: updatedTask,
  });
};

// DELETE /tasks/:id
// Menghapus tugas berdasarkan ID
export const deleteTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID tugas tidak valid",
    });
  }

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Tugas tidak ditemukan",
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: "Tugas berhasil dihapus",
    data: deletedTask,
  });
};
