import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./redux/Auth/auth.reducers";
import { postReducer } from "./redux/post/post.reducer";
import { messageReducer } from "./redux/message/message.reducers";

const composedEnhancer = applyMiddleware(thunk);

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer,
  message: messageReducer,
});
export const store = legacy_createStore(rootReducers, composedEnhancer);
