import React from "react";

const BankAccount = ({ id, balance }) => {
  return (
    <article className="account">
      <div className="account-content">
        <p className="account-id">Argent Bank Checking (x{id})</p>
        <p className="account-balance">${balance}</p>
        <p className="account-subtitle">Available balance</p>
      </div>
      <p className="chevron">{">"}</p>
    </article>
  );
};

export default BankAccount;
