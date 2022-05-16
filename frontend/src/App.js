import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { fetchUser } from "./utils/fetchUser";

const App = () => {
  const userInfo = fetchUser();
  return (
    <Routes>
      <Route path="/*" element={userInfo ? <Home /> : <Login />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default App;
