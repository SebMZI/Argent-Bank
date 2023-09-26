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
    const editedContent = { note: editedNote ? editedNote : " " };

    try {
      const result = await editTransaction({
        accId,
        transactionId,
        editedContent,
      });
      console.log(result);
      setNoteToggle(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditCategory = async (transactionId) => {
    const editedContent = { category: editedCategory ? editedCategory : " " };

    try {
      const result = await editTransaction({
        accId,
        transactionId,
        editedContent,
      });
      console.log(result);
      setCategoryToggle(false);
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
              {editedCategory ? editedCategory : transac.category}
              <i
                className="fa-solid fa-pencil"
                onClick={() => setCategoryToggle(!categoryToggle)}
              ></i>
            </p>
          ) : (
            <div className="edit-transac">
              <input
                className="edit-input"
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
              {editedNote ? editedNote : transac.note}
              <i
                className="fa-solid fa-pencil"
                onClick={() => setNoteToggle(!noteToggle)}
              ></i>
            </p>
          ) : (
            <div className="edit-transac">
              <input
                className="edit-input"
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
