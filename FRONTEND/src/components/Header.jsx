import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = ({setAddTaskDiv}) => {
    const navigate = useNavigate();
    
    const logout = async() => {
        try {
            const res = await axios.post("http://localhost:1800/api/v1/user/logout", {} ,{withCredentials: true});
            alert("Logout successful:", res.data.success);
            localStorage.clear("userLoggedIn");
            navigate("/login");
        } catch (error) {
            navigate("/login");
        }
    }

  return (
    <div className="flex px-12 py-4 items-center justify-between border-b-2 border-gray-700">
      <div>
        <h1 className="text-2xl font-bold text-green-500">TASKIFY</h1>
      </div>
      <div className="flex gap-8">
        <button className="border px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600" onClick={() => setAddTaskDiv("block")}>
          Add Task
        </button>
        <button onClick={logout}>
          <IoLogOutOutline className="text-2xl text-green-500" />
        </button>
      </div>
    </div>
  );
};

export default Header;
