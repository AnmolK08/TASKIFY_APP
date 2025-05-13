import { Link } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all backdrop-blur-md duration-300 ${
        scrolled ? "bg-transparent py-3" : "bg-black/90 py-3 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500">
            <FaListCheck className="h-5 w-5 text-black" />
          </div>
          <span className="text-xl font-bold text-white">TASKIFY</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden space-x-8 md:flex">
          <Link to="/" className="text-white hover:text-green-500">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-green-500">
            About Us
          </Link>
          {user && <Link to="/task" className="text-white hover:text-green-500">
            Task
          </Link>}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="rounded-md bg-green-500 px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-green-600"
          >
            SignUp
          </Link>
          <Link
            to="/login"
            className="rounded-md bg-green-500 px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-green-600"
          >
            SignIn
          </Link>
        </div>
      </div>
    </nav>
  );
}
