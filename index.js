const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./Routes/auth.js");
const dbUrl = String(process.env.url);
mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("connected to database myDb ;)");
  }
);
app.use(express.json());

app.use("/api/auth", authRoute);

app.listen("3002", () => {
  console.log("server started");
});
