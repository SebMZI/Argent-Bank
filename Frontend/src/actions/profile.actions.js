import axios from "axios";
import {
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCEEDED,
  FETCH_PROFILE_STARTED,
  FETCH_UPDATEPROFILE_STARTED,
  FETCH_UPDATEPROFILE_SUCCEEDED,
  FETCH_UPDATEPROFILE_FAILED,
} from "../constants/profile.constants";

export const fetchProfileStarted = () => ({
  type: FETCH_PROFILE_STARTED,
});

export const fetchUpdateProfileStarted = () => ({
  type: FETCH_UPDATEPROFILE_STARTED,
});

export const fetchProfileSucceeded = (data) => ({
  type: FETCH_PROFILE_SUCCEEDED,
  data,
});

export const fetchUpdateProfileSucceeded = (data) => ({
  type: FETCH_UPDATEPROFILE_SUCCEEDED,
  data,
});

export const fetchProfileFailed = (error) => ({
  type: FETCH_PROFILE_FAILED,
  error,
});

export const fetchUpdateProfileFailed = (error) => ({
  type: FETCH_UPDATEPROFILE_FAILED,
  error,
});

export const fetchProfile = (token) => {
  return async (dispatch) => {
    dispatch(fetchProfileStarted());
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            method: "POST",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchProfileSucceeded(res.data.body));
    } catch (error) {
      dispatch(fetchProfileFailed(error));
    }
  };
};

export const fetchUpdateProfile = (token, updatedUsername) => {
  return async (dispatch) => {
    dispatch(fetchUpdateProfileStarted());
    try {
      const res = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        {
          userName: updatedUsername,
        },
        {
          headers: {
            method: "PUT",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchUpdateProfileSucceeded(res.data.body));
    } catch (error) {
      dispatch(fetchUpdateProfileFailed(error));
    }
  };
};
