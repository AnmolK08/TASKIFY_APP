const Task = require("../models/Task.model.js");
const mongoose = require("mongoose");
const User = require("../models/User.model.js");

exports.addTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const { user } = req;

    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTask = new Task({
      title,
      description,
      priority: priority || "low",
      status: status || "yetToStart",
    });
    await newTask.save();

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.tasks.push(newTask._id);
    await user.save();

    res.status(200).json({ success: "Task Added", newTask });
  } catch (error) {
    console.error("Error creating new task", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDetails = await Task.findById(id);

    if (!taskDetails) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ taskDetails });
  } catch (error) {
    console.error("Error fetching task details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, priority, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ success: "Task updated", updatedTask });
  } catch (error) {
    console.error("Error updating task", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    const user = await User.findById(req.user._id);
    if (user) {
      user.tasks = user.tasks.filter((taskId) => !taskId.equals(id));
      await user.save();
    }

    res.status(200).json({ success: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
