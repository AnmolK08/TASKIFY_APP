const mongoose = require('mongoose');

const dbConnect = async ()=>{
    await mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
}

module.exports =  dbConnect;