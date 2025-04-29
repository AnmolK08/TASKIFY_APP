const Task = require('../models/Task.model.js');
const mongoose = require('mongoose');

exports.addTask = async (req, res) => {
  try {
    const {title , description , priority , status} = req.body;
    const { user } = req.user;

    if(!title || !description){
      res.status(400).json({ error : "All feilds are required"});
    }

    const newTask = new Task({title , description , priority , status});
    await newTask.save();

    user.tasks.push(newTask._id);
    await user.save();

    res.status(200).json({ success : "Task Added" , newTask});
    
  } catch (error) {
    console.error("Error creating new task", error);
    res.status(500).json({ error : "Internal Server Error"});
  }
};

exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDetails = await Task.findById(id);

    res.status(200).json({ taskDetails });
    
  } catch (error) {
    res.status(500).json({ error : "Internal Server Error"});
  }
};

exports.editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {title , description , priority , status} = req.body;
    const { user } = req.user;

    if(!title || !description){
      res.status(400).json({ error : "All feilds are required"});
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {title , description , priority , status}
    );
    if (!updatedTask) {
      res.status(400).json({ error : "Task not found"});
    }

    res.status(200).json({ success : "Task updated" , updatedTask});
    
  } catch (error) {
    
    res.status(500).json({ error : "Internal Server Error"});
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).send("Task not found");
    }

    res.status(200).json({ success : "Task deleted"});
  } catch (error) {
    res.status(500).json({ error : "Internal Server Error"});
  }
};
