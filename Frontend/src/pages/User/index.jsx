import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import BankAccount from "../../components/BankAccount/BankAccount";
import {
  selectCurrentFirstname,
  selectCurrentId,
  selectCurrentLastname,
  selectCurrentUsername,
} from "../../features/user/userSlice";
import {
  useUpdateUserMutation,
  useUserQuery,
} from "../../features/user/userApiSlice";
import { setUserInfo } from "../../features/user/userSlice";
import { useAccountsQuery } from "../../features/bank/bankApiSlice";
import { logOut } from "../../features/auth/authSlice";

const User = () => {
  const userId = useSelector(selectCurrentId);
  const dispatch = useDispatch();
  const { data: user, isError } = useUserQuery();
  const [updateUser] = useUpdateUserMutation();
  const { data: accounts } = useAccountsQuery({ userId });

  console.log("accounts: ", accounts);

  const firstname = useSelector(selectCurrentFirstname);
  const lastname = useSelector(selectCurrentLastname);
  const username = useSelector(selectCurrentUsername);

  const [updatedUsername, setUpdatedUsername] = useState();
  const [toggle, setToggle] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUser({ userName: updatedUsername }).unwrap();
      dispatch(setUserInfo({ userName: username }));
      console.log(result);
      setToggle(!toggle);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(setUserInfo({ user }));
  }, [user]);

  return (
    <main className="user-page">
      {toggle === false ? (
        <div className="user-welcome-content">
          <h1 className="welcome-title">Welcome back</h1>
          <p className="welcome-names">{`${firstname} ${lastname}`}</p>
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
                defaultValue={updatedUsername ? updatedUsername : username}
                onChange={(e) => setUpdatedUsername(e.target.value)}
              />
            </div>
            <div className="edit-items">
              <label htmlFor="firstname">First name:</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={firstname}
                disabled
              />
            </div>
            <div className="edit-items">
              <label htmlFor="lastname">Last name:</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={lastname}
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
        {accounts &&
          accounts.map((acc) => (
            <BankAccount
              key={acc._id}
              id={acc.account}
              balance={acc.availableBalance}
              accId={acc._id}
            />
          ))}
      </div>
    </main>
  );
};

export default User;
