const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "email is required",
    unique: true,
  },
  password: {
    type: String,
    required: "password is required,",
  },
  name: {
    type: String,
    required: true,
  },
  phone: String,

  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("users", userSchema);
