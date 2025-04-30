import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import StackTitle from "../components/StackTitle";
import YetToStart from "../components/YetToStart";
import InProgress from "../components/InProgress";
import Completed from "../components/Completed";
import axios from "axios";

const TaskPage = () => {
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
  const [EditTaskDiv, setEditTaskDiv] = useState("hidden");
  const [EditTaskId, setEditTaskId] = useState(second)
  const [Tasks, setTasks] = useState();


  useEffect(()=>{
    try {
      const fetUserDetails = async () => {
        const res = await axios.get("http://localhost:1800/api/v1/user/getUserDetails", {withCredentials: true});
        if (res.status === 200) {
          setTasks(res.data.user.tasks)
        } else {
          console.log("Error fetching user details")
        }
      }

      fetUserDetails();
      if(window.localStorage.getItem('editTaskId')) {
        setEditTaskDiv("block");
        setEditTaskId(window.localStorage.getItem('editTaskId'));;
      }

    } catch (error) {
      console.log("Error fetching user details", error)
    }
  },[AddTaskDiv])

  
  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>

      <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh] max-h-auto">
        <div className="w-1/3">
          <StackTitle title={"Yet To Start"} />
          <div className="pt-2">
            {Tasks && <YetToStart task={Tasks[0].yetToStart} />}
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"In Progress"} />
          <div className="pt-2">
          {Tasks && <InProgress task={Tasks[1].inProgress} />}
            
          </div>
        </div>
        <div className="w-1/3">
          <StackTitle title={"Completed"} />
          <div className="pt-2">
          {Tasks && <Completed task={Tasks[2].completed} />}
           
          </div>
        </div>
      </div>

      <div
        className={`w-full ${AddTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}
      ></div>
      <div
        className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center `}
      >
        <AddTask setAddTaskDiv={setAddTaskDiv} />
      </div>


      <div
        className={`w-full ${EditTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}
      ></div>
      <div
        className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center `}
      >
        <AddTask EditTaskId={EditTaskId} setEditTaskDiv={setEditTaskDiv} />
      </div>
    </div>
  );
};

export default TaskPage;
