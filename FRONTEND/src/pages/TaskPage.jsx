import React, { useEffect } from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import StackTitle from "../components/StackTitle";
import YetToStart from "../components/YetToStart";
import InProgress from "../components/InProgress";
import Completed from "../components/Completed";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import EditTask from "../components/EditTask";

const TaskPage = () => {
  const {
    user,
    addTaskDiv,
    editTaskDiv,
    setEditTaskDiv,
    editTaskId,
    tasks,
    setTasks,
  } = useAppContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1800/api/v1/user/getUserDetails",
          { withCredentials: true }
        );
        setTasks(res.data.tasks);
      } catch (error) {
        toast.error("Failed to fetch tasks.");
      }
    };

    fetchTasks();

    if (editTaskId) {
      setEditTaskDiv("block");
    }
  }, [addTaskDiv, editTaskId, setEditTaskDiv, setTasks]);


  return (
    <div className="w-full relative">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 shadow-md">
        <Header />
      </div>

      {/* Main content */}
      <div className="px-12 py-4 flex gap-12 bg-zinc-800 min-h-[89vh] max-h-auto text-white">
        <div className="w-1/3">
          <StackTitle title={"Yet To Start"} />
          <div className="pt-2">{tasks && <YetToStart />}</div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"In Progress"} />
          <div className="pt-2">{tasks && <InProgress />}</div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"Completed"} />
          <div className="pt-2">{tasks && <Completed />}</div>
        </div>
      </div>

      {/* Add Task Overlay */}
      <div
        className={`w-full ${addTaskDiv} block h-screen fixed top-0 left-0 bg-black opacity-70`}
      ></div>
      <div
        className={`w-full ${addTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}
      >
        <AddTask />
      </div>

      {/* Edit Task Overlay */}
      <div
        className={`w-full ${editTaskDiv} block h-screen fixed top-0 left-0 bg-black opacity-70`}
      ></div>
      <div
        className={`w-full ${editTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}
      >
        <EditTask />
      </div>
    </div>
  );
};

export default TaskPage;
