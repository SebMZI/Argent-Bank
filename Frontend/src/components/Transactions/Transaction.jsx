import { useState } from "react";
import { useEditTransactionMutation } from "../../features/bank/bankApiSlice";

const Transaction = ({ accId, transac, toggle }) => {
  const [editTransaction] = useEditTransactionMutation();
  const [noteToggle, setNoteToggle] = useState(false);
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [editedNote, setEditedNote] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const transacId = transac._id;

  const handleEditNote = async (transactionId) => {
    try {
      const result = await editTransaction({
        accId,
        transactionId,
        note: "test",
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditCategory = async (transactionId) => {
    try {
      const result = await editTransaction(
        { accId, transactionId },
        { category: editedCategory }
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return toggle ? (
    <div className="transaction-info">
      <div className="item-type">
        <p>Transaction type</p>
        <p>Category</p>
        <p>Note</p>
      </div>
      <div className="item-info">
        <div>
          <p>{transac.transactionType}</p>
        </div>
        <div>
          {!categoryToggle ? (
            <p>
              {transac.category}
              <i
                className="fa-solid fa-pencil"
                onClick={() => setCategoryToggle(!categoryToggle)}
              ></i>
            </p>
          ) : (
            <div className="edit-transac">
              <input
                type="text"
                defaultValue={
                  editedCategory ? editedCategory : transac.category
                }
                onChange={(e) => setEditedCategory(e.target.value)}
              />
              <i
                className="fa-solid fa-xmark"
                onClick={() => setCategoryToggle(!categoryToggle)}
              ></i>
              <i
                className="fa-solid fa-check"
                onClick={() => handleEditCategory(transacId)}
              ></i>
            </div>
          )}
        </div>
        <div>
          {!noteToggle ? (
            <p>
              {transac.note}
              <i
                className="fa-solid fa-pencil"
                onClick={() => setNoteToggle(!noteToggle)}
              ></i>
            </p>
          ) : (
            <div className="edit-transac">
              <input
                type="text"
                defaultValue={editedNote ? editedNote : transac.note}
                onChange={(e) => setEditedNote(e.target.value)}
              />
              <i
                className="fa-solid fa-xmark"
                onClick={() => setNoteToggle(!noteToggle)}
              ></i>
              <i
                className="fa-solid fa-check"
                onClick={() => handleEditNote(transacId)}
              ></i>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Transaction;
