const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./Routes/auth.js");
const userRoute = require("./Routes/user");
const dbUrl = "mongodb+srv://rohit:rohit@cluster0.xpykl.mongodb.net/test";
const projectRoute = require("./Routes/project");
mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/project", projectRoute);
app.listen("3000", () => {
  console.log("server started");
});
