import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/bg-login.avif";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, password });

    try {
      const res = await axios.post(
        "http://localhost:1800/api/v1/user/register",
        { name, email, password }
      );
      toast.success("Register Successfully.");
      navigate("/login");
    } catch (error) {
      error.response?.data?.message || "Registration failed. Try again.";
    }
  };

  return (
    <div className="flex flex-row-reverse h-screen w-full overflow-hidden">
      {/* Left side with blurred background image */}
      <div className="relative hidden w-1/2 items-center justify-center bg-black md:flex">
        <div className="absolute inset-0 z-0 opacity-50">
          <img
            src={bgImg}
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

      {/* Right side with signup form */}
      <div className="flex w-full flex-col justify-center bg-black p-8 md:w-1/2">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile logo - only visible on small screens */}
          <div className="mb-8 text-center md:hidden">
            <h1 className="text-4xl font-bold tracking-wider text-white">
              TASKIFY
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white">
              SIGN UP
              <span className="mt-1 block h-1 w-8 bg-green-500"></span>
            </h2>
            <p className="mt-4 text-sm text-gray-400">
              Create your account to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center border border-gray-700 px-3 py-2">
                <FaUser className="mr-2 h-5 w-5 text-green-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-transparent text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center border border-gray-700 px-3 py-2">
                <FaEnvelope className="mr-2 h-5 w-5 text-green-500" />
                <input
                  type="email"
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

            {/* <div className="mb-6">
                <div className="flex items-center border border-gray-700 px-3 py-2">
                  <FaLock className="mr-2 h-5 w-5 text-green-500" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full bg-transparent text-white focus:outline-none"
                    required
                  />
                </div>
              </div> */}

            <button
              type="submit"
              className="w-auto ml-[35%] border border-gray-700 px-8 py-2 text-white hover:border-green-500 hover:text-green-500"
            >
              SIGN UP
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-green-500 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
