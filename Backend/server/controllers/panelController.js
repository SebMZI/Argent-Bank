const User = require("../database/models/userModel");
const { format } = require("date-fns");
const Account = require("../database/models/accountModel");
const Transaction = require("../database/models/transactionModel");

const getAllUsers = async (req, res) => {
  try {
    const result = await User.find()
      .select("-password")
      .select("-refreshToken")
      .select("-createdAt")
      .select("-updatedAt")
      .select("-__v");

    return res.status(200).json({ result });
  } catch (err) {
    console.log("Error in panelController, getAllUsers ", err);
    return res
      .status(500)
      .json({ message: "Impossible to fetch all the users. ", err });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Client Id required!" });
  }

  try {
    const result = await User.findOne({ _id: id })
      .select("-password")
      .select("-refreshToken")
      .select("-createdAt")
      .select("-updatedAt")
      .select("-__v")
      .exec();
    if (!result) {
      return res.status(404).json({ message: "No user Found!" });
    }
    return res.status(200).json({ result });
  } catch (err) {
    console.log("Error in panelController, getUser ", err);
    return res
      .status(500)
      .json({ message: "Error in panelController, getUser ", err });
  }
};

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
  const { accId, desc, amount, balance } = req.body;
  const date = format(new Date(), "dd/MM/yyyy");
  // Validate input data
  if (!accId || !desc || !amount || !balance) {
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
      accId,
      date: date,
      desc,
      amount,
      balance,
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

module.exports = { getAllUsers, createAccount, createTransaction, getUser };
