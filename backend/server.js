require("dotenv").config();

const express = require("express");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

app.use(express.json());

// Routes
app.use("/api/event", eventRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
