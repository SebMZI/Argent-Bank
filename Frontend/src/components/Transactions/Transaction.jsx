const Transaction = ({ transac, toggle }) => {
  return toggle ? (
    <div className="transaction-info">
      <div className="item-type">
        <p>Transaction type</p>
        <p>Category</p>
        <p>Note</p>
      </div>
      <div className="item-info">
        <p>{transac.transactionType}</p>
        <p>
          {transac.category}
          <i className="fa-solid fa-pencil"></i>
        </p>
        <p>
          {transac.note}
          <i className="fa-solid fa-pencil"></i>
        </p>
      </div>
    </div>
  ) : null;
};

export default Transaction;
