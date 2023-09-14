const Account = require("../database/models/accountModel");
const Transaction = require("../database/models/transactionModel");

const createAccount = async (req, res) => {
  const { userId, balance } = req.body;

  if (!balance) {
    res.status(400).json({ message: "All fields are required!" });
  }

  const acc = {
    user: userId,
    availableBalance: balance,
  };

  try {
    const result = await Account.create(acc);
    if (result) {
      return res.status(201).json({ message: "Account created!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error creating account." });
  }
};

const createTransaction = async (req, res) => {
  const { accId, date, desc, amount, balance, transactionType } = req.body;

  // Validate input data
  if (!accId || !date || !desc || !amount || !balance || !transactionType) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Find the account by its ID
    const acc = await Account.findById(accId);

    if (!acc) {
      return res
        .status(404)
        .json({ message: "No account found with this ID!" });
    }

    const transaction = new Transaction({
      date,
      desc,
      amount,
      balance,
      transactionType,
    });

    // Save the transaction to the database
    await transaction.save();

    // Associate the transaction with the account by pushing its _id
    acc.transactions.push(transaction._id);
    await acc.save();

    // Return the newly created transaction in the response
    return res.status(201).json({ message: "Transaction added", transaction });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating transaction!" });
  }
};

const getAllAccounts = async (req, res) => {
  const { userId } = req.body;

  try {
    const result = await Account.find({ user: userId })
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

  console.log(req.params.accId);
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

  if (!note && !category) {
    return res
      .status(400)
      .json({ message: "No Category or Note has been provided!" });
  }

  try {
    const account = await Account.findById(accId);

    if (!account) {
      return res.status(404).json({ message: "No account found!" });
    }

    await account.populate("transactions").execPopulate();
    const transaction = account.transactions.find(
      (transac) => transac._id === transacId
    );
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
  createAccount,
  createTransaction,
  getAllAccounts,
  getTransactionsFromAccount,
  updateTransaction,
};
