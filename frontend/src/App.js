import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { fetchUser } from "./utils/fetchUser";
import { useEffect } from "react";

const App = () => {
  const userInfo = fetchUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="/*" element={userInfo ? <Home /> : <Login />} />
      <Route path="/*" element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
