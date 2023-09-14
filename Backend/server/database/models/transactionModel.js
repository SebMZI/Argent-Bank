const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactionType: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
