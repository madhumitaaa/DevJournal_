const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    console.log("✅ MongoDB connected successfully");
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log("connection error:", err.message);
    process.exit(1);
  }
};
module.exports = connectdb;
