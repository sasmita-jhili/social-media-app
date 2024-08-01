import { API_BASE_URL, api } from "../../config/api";
import {
  CREATE_COMMENT_POST_FAILURE,
  CREATE_COMMENT_POST_REQUEST,
  CREATE_COMMENT_POST_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./post.action.type";

export const createPostAction = (postData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    const { data } = await api.post(
      `${API_BASE_URL}/api/post/create`,
      postData
    );
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    console.log("postData..", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }
};

export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/post/getall`);

    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });

    // console.log("get all post..", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_ALL_POST_FAILURE, payload: error });
  }
};

export const getUsersPostAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USERS_POST_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/post/user/${userId}`);

    dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });

    console.log("get User post..", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_USERS_POST_FAILURE, payload: error });
  }
};

export const likePostAction = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });
  try {
    const { data } = await api.put(`${API_BASE_URL}/api/post/like/${postId}`);

    dispatch({ type: LIKE_POST_SUCCESS, payload: data });

    console.log("Like post..", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: LIKE_POST_FAILURE, payload: error });
  }
};

//// CREATE COMMENT ACTION
export const createCommentAction = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_POST_REQUEST });
  try {
    const { data } = await api.post(
      `${API_BASE_URL}/api/comments/post/${reqData.postId}`,
      reqData.data
    );
    dispatch({ type: CREATE_COMMENT_POST_SUCCESS, payload: data });
    console.log("create comment success..", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: CREATE_COMMENT_POST_FAILURE, payload: error });
  }
};
