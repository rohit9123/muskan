const mongoose = require("mongoose");
const concernModel = new mongoose.Schema({
  comment: {
    type: string,
  },
});
const Concern = mongoose.model("Concern", concernModel);
