const { format } = require("date-fns");
const Account = require("../database/models/accountModel");
const Transaction = require("../database/models/transactionModel");

const getAllAccounts = async (req, res) => {
  const { userId } = req.body;

  try {
    const result = await Account.find({ user: userId || req.id })
      .select("-transactions")
      .exec();
    if (!result) {
      return res.status(404).json({ message: "No Account found!" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server Error!", body: err });
  }
};

const getTransactionsFromAccount = async (req, res) => {
  if (!req.params.accId) {
    return res.status(400).json({ message: "No ID has been provided!" });
  }
  try {
    const account = await Account.findById(req.params.accId);

    if (!account) {
      return res.status(404).json({ message: "No account found!" });
    }

    await account.populate("transactions").execPopulate();

    res.status(200).json(account.transactions);
  } catch (err) {
    res.status(500).json({ message: "Server Error!", body: err });
  }
};

const updateTransaction = async (req, res) => {
  const { accId, transacId } = req.params;
  const { note, category } = req.body;

  if (!accId || !transacId) {
    return res.status(400).json({ message: "No ID has been provided!" });
  }

  // if (!note && !category) {
  //   return res
  //     .status(400)
  //     .json({ message: "No Category or Note has been provided!" });
  // }

  try {
    const account = await Account.findById(accId);

    if (!account) {
      return res.status(404).json({ message: "No account found!" });
    }
    console.log(typeof transacId);

    await account.populate("transactions").execPopulate();
    const transaction = account.transactions.find(
      (transac) => transac._id == transacId
    );

    console.log(transaction);
    if (!transaction) {
      return res.status(404).json({ message: "No transaction found!" });
    }

    if (note) {
      transaction.note = note;
    }

    if (category) {
      transaction.category = category;
    }

    await transaction.save();

    res.status(200).json({
      message: "Transaction updated successfully!",
      body: transaction,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!" });
  }
};
module.exports = {
  getAllAccounts,
  getTransactionsFromAccount,
  updateTransaction,
};
