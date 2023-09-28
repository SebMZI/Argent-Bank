import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetClientQuery } from "../../features/banker/bankerApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentClient,
  setClient,
} from "../../features/banker/bankerSlice";
import { useAccountsQuery } from "../../features/bank/bankApiSlice";
import {
  selectCurrentAccounts,
  setAccounts,
} from "../../features/bank/bankSlice";
import BankAccount from "../../components/BankAccount/BankAccount";
import Modal2 from "../../components/Modal/Modal2";

const Client = () => {
  const { id } = useParams();
  const { data: client } = useGetClientQuery(id);
  const dispatch = useDispatch();
  dispatch(setClient(client));
  const clientInfo = useSelector(selectCurrentClient);
  const userId = clientInfo?._id;
  const { data: accounts, isLoading } = useAccountsQuery({ userId });
  dispatch(setAccounts(accounts));
  const allAccounts = useSelector(selectCurrentAccounts);
  const [modalToggle, setModalToggle] = useState(false);

  return (
    <main className="banker">
      {modalToggle ? (
        <Modal2 setModalToggle={setModalToggle} clientId={id} />
      ) : null}
      <div className="banker-header">
        <h1 className="banker-client">
          Client: {clientInfo?.firstName} {clientInfo?.lastName}
        </h1>
        <a href={`mailto:${clientInfo?.email}`}>email: {clientInfo?.email}</a>
        <button
          className="btn addAcc"
          onClick={() => setModalToggle(!modalToggle)}
        >
          Add Account
        </button>
      </div>
      <div className="banker-accounts">
        {allAccounts?.map((acc) => (
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

export default Client;
