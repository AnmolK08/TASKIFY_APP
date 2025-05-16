import React from "react";
import { useAppContext } from "../context/AppContext";

const TaskCard = ({ data }) => {
  const { setEditTaskId } = useAppContext();

  const showEditDiv = (e, id) => {
    e.preventDefault();
    setEditTaskId(id);
  };

  const getPriorityStyles = (priority) => {
    const priorityStyles = {
      low: "text-green-400 bg-green-900",
      medium: "text-yellow-400 bg-yellow-900",
      high: "text-red-400 bg-red-900",
    };

    return priorityStyles[priority] || "text-gray-400 bg-gray-800";
  };

  return (
    <button
      className="bg-zinc-900 border border-zinc-700 rounded px-4 w-full py-2 hover:shadow-md hover:border-green-500 transition-all duration-300 text-left text-white"
      onClick={(e) => showEditDiv(e, data._id)}
      role="link"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold truncate">{data.title}</h1>
        <div
          className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityStyles(
            data.priority
          )}`}
        >
          {data.priority}
        </div>
      </div>
      <hr className="my-2 border-zinc-700" />
      <p className="text-sm text-zinc-400 line-clamp-3">{data.description}</p>
    </button>
  );
};

export default TaskCard;
