const ToDo = require('../models/ToDoList');
const mongoose = require('mongoose');

exports.createToDo = async (req, res) => {
  try {
    const data = req.body;
    const newTodo = new ToDo(data);
    await newTodo.save();
    res.status(201).send(newTodo);
    console.log("New todo created successfully");
  } catch (error) {
    console.error("Error creating new todo", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getTodos = async (req, res) => {
  try {
    let { userId } = req.params;
    const objectId = new mongoose.Types.ObjectId(userId);
    
    const todos = await ToDo.find({ userId: objectId }).populate('userId');

    if (!todos.length) {
      console.log("No todos found for user:", userId);
      return res.status(404).json({ message: "No todos found" });
    }

    res.status(200).json(todos);
    console.log("Todos fetched successfully:", todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedTodo = await ToDo.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { returnOriginal: false }
    );
    if (!updatedTodo) {
      return res.status(404).send("Todo not found");
    }
    res.status(200).send(updatedTodo);
    console.log("Todo updated successfully");
  } catch (error) {
    console.error("Error updating todo", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await ToDo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).send("Todo not found");
    }
    res.sendStatus(204);
    console.log("Todo deleted successfully");
  } catch (error) {
    console.error("Error deleting todo", error);
    res.status(500).send("Internal Server Error");
  }
};
