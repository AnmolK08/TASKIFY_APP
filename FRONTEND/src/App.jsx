import React, { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import { Route, Routes, useNavigate } from "react-router";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import TaskPage from "./pages/TaskPage";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userLoggedIn") === "yes") {
      navigate("/task");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/task" element={<TaskPage />} />
      </Routes>
    </>
  );
};

export default App;
