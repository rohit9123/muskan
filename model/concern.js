const mongoose = require("mongoose");
const concernModel = new mongoose.Schema({
  comment: {
    type: String,
  },
});
const Concern = mongoose.model("Concern", concernModel);
