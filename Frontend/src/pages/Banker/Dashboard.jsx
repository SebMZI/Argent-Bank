import React, { useEffect } from "react";
import { useClientsQuery } from "../../features/banker/bankerApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUsers,
  setUsers,
} from "../../features/banker/bankerSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: clients } = useClientsQuery();
  const dispatch = useDispatch();
  const users = useSelector(selectCurrentUsers);

  useEffect(() => {
    dispatch(setUsers({ clients }));
  }, [clients]);

  const filteredUsers = users?.result?.filter(
    (client) => client.roles.Client === 2502
  );

  return (
    <main className="banker">
      <h1 className="banker-title">Dashboard</h1>
      <h2 className="banker-subtitle">Client list</h2>
      <div>
        {filteredUsers?.map((client, index) => (
          <Link to={`/panel/banker/users/${client._id}`} key={index}>
            <article className="card-client">
              <p>
                {client.firstName} {client.lastName}
              </p>
              <span>{">"}</span>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
