const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT = 3001 } = process.env;

require("dotenv").config();

const mainRouter = require("./carsroute/cars.js");

const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/ai-car-bot")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.post("/messages", (req, res) => {
  const { message } = req.body;
  console.log("Received message:", message);
  res.json({ response: "Message received" });
});

app.use(express.json());
app.use(cors());

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
