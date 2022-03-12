const mongoose = require("mongoose");
const projectModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Array,
    default: [],
  },
  concern: {
    type: Array,
    default: [],
  },
  percantage: {
    type: Number,
    min: 0,
    max: 100,
  },
});
const Project = mongoose.model("Project", projectModel);
module.exports = projectModel;
