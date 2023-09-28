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
import { selectCurrentRoles } from "../../features/auth/authSlice";
import Modal from "../Modal/Modal";

const BankAccount = ({ id, balance, accId }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [toggleTransac, setToggleTransac] = useState({});
  const { data: transactions } = useTransactionsQuery(accId);
  const [transactionFiltered, setTransactionsFiltered] = useState();
  dispatch(setTransactions(transactions));

  const roles = useSelector(selectCurrentRoles);
  const rolesArray = Object.values(roles);

  const client = rolesArray && rolesArray.includes(2502);

  useEffect(() => {
    if (transactions) {
      // Vous pouvez mettre en place cette logique pour filtrer les transactions
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.accId === accId
      );
      setTransactionsFiltered(filteredTransactions);
    }
  }, [transactions, accId]);

  const toggleTransaction = (transactionId) => {
    setToggleTransac((prevState) => ({
      ...prevState,
      [transactionId]: !prevState[transactionId] || false,
    }));
  };

  return toggle ? (
    <>
      {modalToggle ? (
        <Modal setModalToggle={setModalToggle} accId={accId} />
      ) : null}
      <div className="acc-container">
        <article className="account" onClick={() => setToggle(!toggle)}>
          <div className="account-content">
            <p className="account-id">Argent Bank Checking ({id})</p>
            <p className="account-balance">${balance}</p>
            <p className="account-subtitle">Available balance</p>
          </div>
          <p className="chevron">{toggle ? "x" : ">"}</p>
        </article>
        {client ? null : (
          <div>
            <button
              className="btn"
              onClick={() => {
                setModalToggle(!modalToggle);
                // window.scrollTo("top", "0");
              }}
            >
              Add transaction
            </button>
          </div>
        )}

        <div className="transaction-container">
          <div className="transaction-header">
            <p>Date</p>
            <p>Description</p>
            <p>Amount</p>
            <p>Balance</p>
          </div>
          {transactionFiltered &&
            transactionFiltered.map((transac) => (
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
                  accId={accId}
                  transac={transac}
                  toggle={toggleTransac[transac._id] || false}
                />
              </div>
            ))}
        </div>
      </div>
    </>
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
