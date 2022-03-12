const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      min: 6,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isAdmin: Boolean,
    task: {
      type: Array,
      default: [],
    },
    createTask: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
