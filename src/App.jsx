import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";

import Message from "./pages/Message/Message";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "./redux/Auth/auth.action";
import Profile from "./pages/Profile/Profile";

function App() {
  const auth =useSelector(state=>state.auth.user)
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileAction(jwt));
    }
  }, [jwt,dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/*" element={auth ? <HomePage /> : <Login />} />
        <Route path="/message" element={<Message />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
