import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";

import Message from "./pages/Message/Message";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/message" element={<Message />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
