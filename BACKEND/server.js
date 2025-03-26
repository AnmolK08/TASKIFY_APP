const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const ToDoRoutes = require("./routes/ToDoRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 1800; 

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api/todo", ToDoRoutes); 
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
