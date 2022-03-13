const mongoose = require("mongoose");
const projectModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Array,
      default: [],
    },
    createdBy: {
      type: String,
      required: true,
    },
    concern: {
      type: Array,
      default: [],
    },
    percantage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  { timestamps: true }
);
const Project = mongoose.model("Project", projectModel);
module.exports = Project;
