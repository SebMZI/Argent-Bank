import {
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCEEDED,
  FETCH_PROFILE_STARTED,
  FETCH_UPDATEPROFILE_STARTED,
  FETCH_UPDATEPROFILE_FAILED,
  FETCH_UPDATEPROFILE_SUCCEEDED,
} from "../constants/profile.constants";

const initialState = {
  error: null,
  data: null,
  email: null,
  firstName: null,
  userName: null,
  lastName: null,
  status: "uninitialized",
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_STARTED || FETCH_UPDATEPROFILE_STARTED: {
      return {
        ...state,
        status: "started",
      };
    }

    case FETCH_PROFILE_SUCCEEDED || FETCH_UPDATEPROFILE_SUCCEEDED: {
      return {
        ...state,
        status: "succeeded",
        data: action.data,
        email: action.data.email,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        userName: action.data.userName,
        error: null,
      };
    }

    case FETCH_PROFILE_FAILED || FETCH_UPDATEPROFILE_FAILED: {
      return {
        ...state,
        error: action.error,
        status: "failed",
      };
    }

    default:
      return state;
  }
}
