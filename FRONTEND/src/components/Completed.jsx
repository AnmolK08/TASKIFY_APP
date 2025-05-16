import React from "react";
import { useAppContext } from "../context/AppContext";
import TaskCard from "./TaskCard";

const Completed = () => {
  const { tasks } = useAppContext();

  const completedTasks = tasks.completed;

  return (
    <div className="flex flex-col gap-2">
      {completedTasks.length > 0 ? (
        completedTasks.map((item, index) => (
          <TaskCard key={index} data={item} />
        ))
      ) : (
        <p>No completed tasks</p>
      )}
    </div>
  );
};

export default Completed;
