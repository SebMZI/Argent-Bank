import React from "react";
import { useTransactionsQuery } from "../../features/bank/bankApiSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentTransactions,
  setTransactions,
} from "../../features/bank/bankSlice";
import Transaction from "../Transactions/Transaction";

const BankAccount = ({ id, balance, accId }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [toggleTransac, setToggleTransac] = useState({});
  const { data: transactions } = useTransactionsQuery(accId);
  dispatch(setTransactions({ transactions }));

  const transactionsArray = useSelector(selectCurrentTransactions);

  const toggleTransaction = (transactionId) => {
    setToggleTransac((prevState) => ({
      ...prevState,
      [transactionId]: !prevState[transactionId] || false,
    }));
  };

  return toggle ? (
    <div className="acc-container">
      <article className="account" onClick={() => setToggle(!toggle)}>
        <div className="account-content">
          <p className="account-id">Argent Bank Checking ({id})</p>
          <p className="account-balance">${balance}</p>
          <p className="account-subtitle">Available balance</p>
        </div>
        <p className="chevron">{toggle ? "X" : ">"}</p>
      </article>
      <div className="transaction-container">
        <div className="transaction-header">
          <p>Date</p>
          <p>Description</p>
          <p>Amount</p>
          <p>Balance</p>
        </div>
        {transactionsArray &&
          transactionsArray.map((transac) => (
            <div key={transac._id} className="transac-content">
              <article
                className="transaction"
                onClick={() => toggleTransaction(transac._id)}
              >
                <p>{transac.date}</p>
                <p>{transac.desc}</p>
                <p>${transac.amount}</p>
                <p>${transac.balance}</p>
                <p>{">"}</p>
              </article>
              <Transaction
                transac={transac}
                toggle={toggleTransac[transac._id] || false}
              />
            </div>
          ))}
      </div>
    </div>
  ) : (
    <div>
      <article className="account" onClick={() => setToggle(!toggle)}>
        <div className="account-content">
          <p className="account-id">Argent Bank Checking ({id})</p>
          <p className="account-balance">${balance}</p>
          <p className="account-subtitle">Available balance</p>
        </div>
        <p className="chevron">{toggle ? "X" : ">"}</p>
      </article>
    </div>
  );
};

export default BankAccount;
