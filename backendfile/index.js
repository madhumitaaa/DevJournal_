const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const connectDB=require('./config/db')
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/auth",require("./routes/auth"));
app.use("/api/entries",require("./routes/entries"));
const PORT=process.env.PORT||5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
