import React from "react";
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

  console.log(clientInfo);
  console.log(accounts);

  return (
    <main className="banker">
      <div>
        <h1 className="banker-client">
          Client: {clientInfo?.firstName} {clientInfo?.lastName}
        </h1>
        <a href={`mailto:${clientInfo?.email}`}>email: {clientInfo?.email}</a>
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
