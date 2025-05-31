import React, { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import { Route, Routes, useNavigate } from "react-router";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import TaskPage from "./pages/TaskPage";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "./context/AppContext";
import { useLocation } from "react-router-dom";

const App = () => {

  const navigate = useNavigate();
  const { user } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (user === undefined) return;

    if (user && currentPath === "/") {
      navigate("/task");
    } 
    else if (!user && currentPath === "/task") {
      navigate("/");
    }
  }, [user, location]);

  return (
    <>
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

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
