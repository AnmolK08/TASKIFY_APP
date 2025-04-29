const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/User.routes");
const taskRoutes = require("./routes/Task.routes");
const dbConnect = require("./configs/db");
require("dotenv").config();

const PORT = process.env.PORT || 1800; 

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes); 
app.use("/api/v1/task", taskRoutes); 

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
