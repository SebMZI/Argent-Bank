import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginToken } from "../../selectors/user.selectors";
import {
  selectFirstName,
  selectLastName,
  selectUserName,
} from "../../selectors/profile.selectors";
import Button from "../../components/Button/Button";
import { fetchUpdateProfile } from "../../actions/profile.actions";
import BankAccount from "../../components/BankAccount/BankAccount";

const User = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectLoginToken);
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const userName = useSelector(selectUserName);
  const [updatedUsername, setUpdatedUsername] = useState();
  const [toggle, setToggle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUpdateProfile(token, updatedUsername));
    setToggle(!toggle);
  };

  return (
    <main className="user-page">
      {toggle === false ? (
        <div className="user-welcome-content">
          <h1 className="welcome-title">Welcome back</h1>
          <p className="welcome-names">
            {firstName} {lastName}
          </p>
          <Button type="" text="Edit Name" fnc={() => setToggle(!toggle)} />
        </div>
      ) : (
        <div className="user-edit-container">
          <h1 className="edit-title">Edit user info</h1>
          <form className="edit-form">
            <div className="edit-items">
              <label htmlFor="username">User name:</label>
              <input
                type="text"
                id="username"
                defaultValue={updatedUsername ? updatedUsername : userName}
                onChange={(e) => setUpdatedUsername(e.target.value)}
              />
            </div>
            <div className="edit-items">
              <label htmlFor="firstname">First name:</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={firstName}
                disabled
              />
            </div>
            <div className="edit-items">
              <label htmlFor="lastname">Last name:</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={lastName}
                disabled
              />
            </div>
            <div className="btn-container">
              <Button type="submit" text="Save" fnc={(e) => handleSubmit(e)} />
              <Button type="" text="Cancel" fnc={() => setToggle(!toggle)} />
            </div>
          </form>
        </div>
      )}

      <div className="bankaccounts-container">
        <BankAccount id="3548" balance="42,547.58" />
        <BankAccount id="4719" balance="100,018,249.15" />
        <BankAccount id="6344" balance="9,017.20" />
      </div>
    </main>
  );
};

export default User;
