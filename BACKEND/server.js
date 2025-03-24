const express = require('express');;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 6000;


app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then((result) => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})
