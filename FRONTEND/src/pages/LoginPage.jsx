import React, { useState } from "react";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/bg-login.avif";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:1800/api/v1/user/login", {
        email,
        password,
      } , { withCredentials: true });

      const loggedInUser = res.data.user;
      console.log(res)
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      toast.success("Login successful");
      navigate("/task");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left side with background image */}
      <div className="relative hidden w-1/2 items-center justify-center bg-black md:flex">
        <div className="absolute inset-0 z-0 opacity-50">
          <img
            src={bgImage}
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="z-10 text-center">
          <h1 className="text-5xl font-bold tracking-wider text-white">
            TASKIFY
          </h1>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex w-full flex-col justify-center bg-black p-8 md:w-1/2">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 text-center md:hidden">
            <h1 className="text-4xl font-bold tracking-wider text-white">
              TASKIFY
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white">
              SIGN IN
              <span className="mt-1 block h-1 w-8 bg-green-500"></span>
            </h2>
            <p className="mt-4 text-sm text-gray-400">
              Please enter your username and password below to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center border border-gray-700 px-3 py-2">
                <FaEnvelope className="mr-2 h-5 w-5 text-green-500" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-transparent text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center border border-gray-700 px-3 py-2">
                <FaLock className="mr-2 h-5 w-5 text-green-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-transparent text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mb-6 text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-400 hover:text-green-500"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-auto border ml-[35%] border-gray-700 px-8 py-2 text-white hover:border-green-500 hover:text-green-500"
            >
              SIGN IN
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-green-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
