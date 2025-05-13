import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

const AddTask = ({setAddTaskDiv}) => {

    const [Values, setValues] = useState({
        title: "",
        priority: "low",
        status: "yetToStart",
        description: "",
    })
    const addTask = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:1800/api/v1/task/addTask", Values, {withCredentials: true});
        if(res.data.success) {
            toast.success("Task added successfully");
            setAddTaskDiv("hidden");
        }
        else {
            toast.error("Error adding task");
        }
        setValues({
            title: "",
            priority: "low",
            status: "yetToStart",
            description: "",
        })
        } catch (error) {
            console.log(error.response.data.error);
            toast.error("Error adding task");
        }
    }

  return (
    <div className="bg-white rounded px-4 py-8">
      <h1 className="text-center font-semibold text-xl">Add Task</h1>
      <hr className="mb-4 mt-2" />
      <form method="POST" className="flex flex-col gap-4">
        <input
          type="text"
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
          placeholder="Title"
          name="title"
          value={Values.title}
          onChange={(e) => setValues({...Values, title: e.target.value})}
        />

        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="mb-2">Select Priority</h3>
            <select
              name="priority"
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
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
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
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
          className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
          value={Values.description}
          onChange={(e) => setValues({...Values, description: e.target.value})}
        ></textarea>

        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="border px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
            onClick={addTask}
          >
            Add Task
          </button>
          <button
            type="button"
            className="border px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
            onClick={() => setAddTaskDiv("hidden")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
