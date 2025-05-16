import { Link } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, setUser } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-black/80 py-2 shadow-md" : "bg-black py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Go to home page"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500">
            <FaListCheck className="h-5 w-5 text-black" />
          </div>
          <span className="text-xl font-bold text-white">TASKIFY</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden space-x-8 md:flex">
          <Link
            to="/"
            className="text-zinc-300 hover:text-green-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-zinc-300 hover:text-green-400 transition-colors"
          >
            About Us
          </Link>
          {user && (
            <Link
              to="/task"
              className="text-zinc-300 hover:text-green-400 transition-colors"
            >
              Task
            </Link>
          )}
        </div>

        {/* Auth Buttons or Logout */}
        <div className="flex items-center gap-3">
          {!user && (
            <>
              <Link
                to="/register"
                className="rounded-md bg-green-500 px-5 py-2 text-sm font-medium text-black transition hover:bg-green-600"
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className="rounded-md bg-green-500 px-5 py-2 text-sm font-medium text-black transition hover:bg-green-600"
              >
                SignIn
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
