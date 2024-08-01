import axios from "axios";
import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./auth.actionType";
import { API_BASE_URL, api } from "../../config/api";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signin`,
      loginData.data
    );

    if (data.accessToken) {
      localStorage.setItem("jwt", data.accessToken);
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.accessToken });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const registerUserAction = (rigisterData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      rigisterData.data
    );

    if (data.accessToken) {
      localStorage.setItem("jwt", data.accessToken);
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};

export const getProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_PROFILE_FAILURE, payload: error });
  }
};

export const updateUserProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const { data } = await api.put(`${API_BASE_URL}/api/user/update`, reqData);
    console.log("update------------", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
  }
};
export const searchUserAction = (query,jwt) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/user/search?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("search user .....", data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log(".....", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error });
  }
};
