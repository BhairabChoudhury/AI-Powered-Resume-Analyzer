const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoute = require("./routes/authRoutes");
const matchRoute = require("./routes/matchRoutes");

dotenv.config();
connectDB();// function call

const app = express();
app.use(cors());
app.use(express.json());
console.log("server hit") ; 
app.use("/api/user", userRoute);
app.use("/api/match", matchRoute);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});