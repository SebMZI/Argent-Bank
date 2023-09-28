import React, { useState } from "react";
import { useCreateAccountMutation } from "../../features/banker/bankerApiSlice";

const Modal2 = ({ setModalToggle, clientId }) => {
  const [createAccount] = useCreateAccountMutation();
  const [availableBalance, setAvailableBalance] = useState();
  const handleAccount = async (e) => {
    e.preventDefault();
    const user = clientId;
    try {
      const result = await createAccount({ user, availableBalance });
      setAvailableBalance();
      setModalToggle(false);

      console.log(result);
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
        <form className="modal-form" onSubmit={(e) => handleAccount(e)}>
          <label htmlFor="clientId">ClientId: </label>
          <input type="text" id="accid" disabled value={clientId} />
          <label htmlFor="balance">Available Balance</label>
          <input
            type="number"
            min={0}
            placeholder="Enter a initial balance"
            defaultValue={availableBalance}
            onChange={(e) => setAvailableBalance(e.target.valueAsNumber)}
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

export default Modal2;
