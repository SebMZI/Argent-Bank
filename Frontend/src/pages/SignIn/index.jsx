import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../actions/user.actions";
import { useNavigate } from "react-router-dom";
import { selectLoginToken } from "../../selectors/user.selectors";
import { fetchProfile } from "../../actions/profile.actions";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector(selectLoginToken);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(fetchLogin(email, password));
  };

  const handleProfile = useCallback(
    (token) => {
      dispatch(fetchProfile(token));
    },
    [dispatch]
  );

  useEffect(() => {
    if (token) {
      navigate("/profile");
      handleProfile(token);
    }
  }, [token, navigate, handleProfile]);

  return (
    <main className="main-signin">
      <section className="signin">
        <form className="signin-form" onSubmit={handleLogin}>
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

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Signin;
