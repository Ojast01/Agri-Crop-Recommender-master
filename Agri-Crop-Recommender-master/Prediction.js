const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  age: Number,
  bp: Number,
  sugar: Number,
  prediction: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Prediction", predictionSchema);