console.log("Server is running");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yourDatabaseName")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
