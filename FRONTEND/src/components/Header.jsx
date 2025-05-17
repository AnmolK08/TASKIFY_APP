import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { setUser, setAddTaskDiv } = useAppContext();

  const logout = async () => {
  try {
    await axios.post(
      "http://localhost:1800/api/v1/user/logout",
      {},
      { withCredentials: true }
    );

    toast.success("Logout successful");
    setUser(null);
    navigate("/login");
  } catch (error) {
    toast.error("Logout failed. Please try again.");
    setUser(null); 
    navigate("/login");
  }
};


  return (
    <div className="flex px-12 py-2 items-end justify-end border-b-2 border-gray-700 mt-[7vh] bg-black">
      <div className="flex gap-6 items-center">
        <button
          className="border px-4 py-2 rounded-md text-black bg-green-500 hover:bg-green-600 transition-colors"
          onClick={() => setAddTaskDiv("block")}
          aria-label="Add Task"
        >
          Add Task
        </button>
        <button
          onClick={logout}
          aria-label="Logout"
          className="p-2 rounded hover:bg-green-700 transition-colors"
          title="Logout"
        >
          <IoLogOutOutline className="text-2xl text-green-500" />
        </button>
      </div>
    </div>
  );
};

export default Header;
