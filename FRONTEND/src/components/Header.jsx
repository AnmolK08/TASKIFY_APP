import React from "react";
import { IoLogOutOutline } from "react-icons/io5";

const Header = ({setAddTaskDiv}) => {
  return (
    <div className="flex px-12 py-4 items-center justify-between border-b-2 border-gray-700">
      <div>
        <h1 className="text-2xl font-bold text-green-500">TASKIFY</h1>
      </div>
      <div className="flex gap-8">
        <button className="border px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600" onClick={() => setAddTaskDiv("block")}>
          Add Task
        </button>
        <button>
          <IoLogOutOutline className="text-2xl text-green-500" />
        </button>
      </div>
    </div>
  );
};

export default Header;
