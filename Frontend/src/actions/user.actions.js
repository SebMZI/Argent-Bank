import axios from "axios";
import {
  FETCH_LOGIN_STARTED,
  FETCH_LOGIN_SUCCEEDED,
  FETCH_LOGIN_FAILED,
  USER_DISCONNECTION,
} from "../constants/login.constants";

export const fetchLoginStarted = () => ({
  type: FETCH_LOGIN_STARTED,
});

export const fetchLoginSucceeded = (token) => ({
  type: FETCH_LOGIN_SUCCEEDED,
  token,
});

export const fetchLoginFailed = (error) => ({
  type: FETCH_LOGIN_FAILED,
  error,
});

export const disconnection = () => ({
  type: USER_DISCONNECTION,
});

export const fetchLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(fetchLoginStarted());
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await dispatch(fetchLoginSucceeded(res.data.body.token));
    } catch (error) {
      dispatch(fetchLoginFailed(error.message));
    }
  };
};

export const userDisconnected = () => {
  return (dispatch) => {
    dispatch(disconnection());
  };
};
