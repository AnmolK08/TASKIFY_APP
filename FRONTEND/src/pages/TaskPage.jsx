import React, { useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";

const TaskPage = () => {
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden");


  return <div className="w-full relative">
    <div className="bg-white">
      <Header setAddTaskDiv= {setAddTaskDiv} />
    </div>

    <div className={`w-full ${AddTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
    <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center `}> <AddTask setAddTaskDiv= {setAddTaskDiv}/> </div>

  </div>;
};

export default TaskPage;
