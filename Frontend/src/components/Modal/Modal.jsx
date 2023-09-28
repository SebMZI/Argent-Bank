import React, { useState } from "react";
import { useCreateTransactionMutation } from "../../features/banker/bankerApiSlice";
import { useDispatch } from "react-redux";

const Modal = ({ setModalToggle, accId }) => {
  const [createTransaction] = useCreateTransactionMutation();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState();
  const [balance, setBalance] = useState();
  const [desc, setDesc] = useState("");

  const handleTransaction = async (e) => {
    e.preventDefault();

    try {
      const result = await createTransaction({ accId, amount, balance, desc });
      setDesc("");
      setAmount();
      setBalance();
      setModalToggle(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal">
      <div
        className="modal-overlay"
        onClick={() => setModalToggle(false)}
      ></div>
      <div className="modal-content">
        <form className="modal-form" onSubmit={(e) => handleTransaction(e)}>
          <label htmlFor="accid">Account Id: </label>
          <input type="text" id="accid" disabled value={accId} />
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            id="desc"
            placeholder="Enter transaction description"
            defaultValue={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            min={0}
            defaultValue={amount}
            placeholder="Enter transaction amount"
            onChange={(e) => setAmount(e.target.valueAsNumber)}
          />
          <label htmlFor="balance">Balance</label>
          <input
            type="number"
            id="balance"
            defaultValue={balance}
            min={0}
            onChange={(e) => setBalance(e.target.valueAsNumber)}
          />
          <div className="modal-btns">
            <button className="btn close" onClick={() => setModalToggle(false)}>
              Cancel
            </button>
            <button className="btn submit" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
