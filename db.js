const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection failed:", err));
}

module.exports = { connectDB };
