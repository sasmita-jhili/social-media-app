import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch(LOGIN_REQUEST);
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signin`,
      loginData.data
    );

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    console.log("login success",data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const REGISTER_REQUESTUserAction = (rigisterData) => async (dispatch) => {
    dispatch(LOGIN_REQUEST);
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/register`,
        rigisterData.data
      );
  
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
      }
      console.log("register success",data);
      dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    } catch (error) {
      console.log(error);
      dispatch({ type: REGISTER_FAILURE, payload: error });
    }
  };
