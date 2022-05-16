import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { fetchUser } from "./utils/fetchUser";
import { useEffect } from "react";

const App = () => {
  const userInfo = fetchUser();

  useEffect(() => {
    fetchUser();
  }, [userInfo]);

  return (
    <Routes>
      <Route path="/*" element={userInfo ? <Home /> : <Login />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
