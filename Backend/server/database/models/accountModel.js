const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const transactions = require("./transactionModel");

const accountSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  availableBalance: {
    type: Number,
    required: true,
  },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
});

accountSchema.plugin(AutoIncrement, {
  inc_field: "account",
  id: "accountId",
  start_seq: 4199,
});

module.exports = mongoose.model("Account", accountSchema);
