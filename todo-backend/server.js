require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const taskRoutes =
require("./routes/taskRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api", taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server Running On Port ${process.env.PORT}`
  );
});