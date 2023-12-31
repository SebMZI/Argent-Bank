import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import {
  selectCurrentRoles,
  setCredentials,
} from "../../features/auth/authSlice";
import { selectCurrentToken } from "../../features/auth/authSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const [login, { isError }] = useLoginMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector(selectCurrentToken);
  const roles = useSelector(selectCurrentRoles);
  const rolesArray = Object.values(roles);

  const client = rolesArray && rolesArray.includes(2502);
  const banker = rolesArray && rolesArray.includes(1406);

  const handleSubmit = async (e) => {
    console.log(email, password);
    e.preventDefault();
    try {
      const userData = await login({
        email: email,
        password: password,
      });
      console.log("userdata: ", userData);
      dispatch(setCredentials({ ...userData }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      if (client) {
        navigate("/profile");
      } else if (banker) {
        navigate("/panel/banker");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  return (
    <main className="main-signin">
      <section className="signin">
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <i className="fa-solid fa-circle-user"></i>
            <h2>Sign In</h2>
          </div>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="saveLogins-container">
            <label htmlFor="savelogins">Remember me</label>
            <input type="checkbox" id="savelogins" />
          </div>

          <div className="error">
            {isError ? "Email or Password Invalid." : null}
          </div>

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Signin;
