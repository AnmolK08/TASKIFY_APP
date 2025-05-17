import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const EditTask = () => {
  const { setEditTaskDiv, editTaskId, setEditTaskId, setTasks } =
    useAppContext();

  const [Values, setValues] = useState({
    _id: "",
    title: "",
    priority: "low",
    status: "yetToStart",
    description: "",
  });

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1800/api/v1/task/getTask/${editTaskId}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setValues(res.data.taskDetails);
        } else {
          toast.error("Error fetching task details");
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.error || "Error fetching task details"
        );
      }
    };

    if (editTaskId) {
      fetchTaskDetails();
    }
  }, [editTaskId]);

  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:1800/api/v1/task/editTask/${Values._id}`,
        Values,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Task edited successfully");
        setEditTaskId("");
        setEditTaskDiv("hidden");
      } else {
        toast.error("Error editing task");
      }
    } catch (error) {
      toast.error("Error editing task");
    }
  };

  const deleteTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:1800/api/v1/task/deleteTask/${Values._id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Task deleted successfully");
        setEditTaskId("");
        setEditTaskDiv("hidden");
      } else {
        toast.error("Error deleting task");
      }
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  return (
    <div className="bg-zinc-900 text-white rounded px-4 py-8 w-lg mx-auto">
      <h1 className="text-center font-semibold text-xl">Edit Task</h1>
      <hr className="mb-4 mt-2 border-zinc-700" />
      <form
        method="POST"
        className="flex flex-col gap-4"
        onSubmit={handleEditTask}
      >
        <input
          type="text"
          className="border px-2 py-1 rounded border-zinc-700 bg-zinc-800 outline-none text-white"
          placeholder="Title"
          name="title"
          value={Values.title}
          onChange={(e) => setValues({ ...Values, title: e.target.value })}
          required
        />

        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="mb-2">Select Priority</h3>
            <select
              name="priority"
              className="border px-2 py-1 rounded border-zinc-700 bg-zinc-800 outline-none w-full text-white"
              value={Values.priority}
              onChange={(e) =>
                setValues({ ...Values, priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="w-full">
            <h3 className="mb-2">Select Status</h3>
            <select
              name="status"
              className="border px-2 py-1 rounded border-zinc-700 bg-zinc-800 outline-none w-full text-white"
              value={Values.status}
              onChange={(e) => setValues({ ...Values, status: e.target.value })}
            >
              <option value="yetToStart">Yet to Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          className="border px-2 py-1 rounded border-zinc-700 bg-zinc-800 outline-none h-[25vh] text-white"
          value={Values.description}
          onChange={(e) =>
            setValues({ ...Values, description: e.target.value })
          }
        ></textarea>

        <div className="flex items-center justify-around gap-4">
          <button
            type="submit"
            className="border px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors"
          >
            Edit Task
          </button>
          <button
            type="button"
            className="border px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
            onClick={deleteTask}
          >
            Delete Task
          </button>

          <button
            type="button"
            className="border px-4 py-2 rounded-md text-white bg-gray-700 hover:bg-gray-600 transition-colors"
            onClick={() => {
              setEditTaskId("");
              setEditTaskDiv("hidden");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
