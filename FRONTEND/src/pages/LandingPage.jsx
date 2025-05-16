import React from "react";
import { Link, Navigate } from "react-router-dom";
import bgImage from "../assets/bg-6.avif";
import { useAppContext } from "../context/AppContext";

const LandingPage = () => {
  return (
    <section
      className="relative w-full h-screen pt-32 pb-20 md:pt-40 md:pb-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mx-auto text-white max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Organize your <span className="text-green-500">work</span> and{" "}
          <span className="text-green-500">life</span>, finally.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white">
          Become focused, organized, and calm with TASKIFY app. <br /> The task
          manager app.
        </p>
        <div className="mt-10">
          <Link
            to="/task"
            className="inline-block rounded-md bg-green-500 px-6 py-3 font-medium text-black transition-transform hover:scale-105"
          >
            Make Task List
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
