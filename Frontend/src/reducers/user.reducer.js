import {
  FETCH_LOGIN_STARTED,
  FETCH_LOGIN_SUCCEEDED,
  FETCH_LOGIN_FAILED,
  USER_DISCONNECTION,
} from "../constants/login.constants";

const initialState = {
  logged: false,
  status: "uninitialized",
  token: null,
  error: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOGIN_STARTED: {
      return {
        ...state,
        status: "loading",
      };
    }
    case FETCH_LOGIN_SUCCEEDED: {
      return {
        ...state,
        token: action.token,
        logged: true,
        status: "succeeded",
        error: null,
      };
    }
    case FETCH_LOGIN_FAILED: {
      return {
        ...state,
        logged: false,
        error: action.error,
        token: null,
        status: "failed",
      };
    }
    case USER_DISCONNECTION: {
      return {
        ...state,
        logged: false,
        token: null,
      };
    }
    default: {
      return state;
    }
  }
}
