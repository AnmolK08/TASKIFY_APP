import React from "react";
import { useAppContext } from "../context/AppContext";
import TaskCard from "./TaskCard";

const InProgress = () => {
  const { tasks } = useAppContext();

  const inProgressTasks = tasks.inProgress;

  return (
    <div className="flex flex-col gap-2">
      {inProgressTasks.length > 0 ? (
        inProgressTasks.map((item, index) => (
          <TaskCard key={index} data={item} />
        ))
      ) : (
        <p>No tasks in progress</p>
      )}
    </div>
  );
};

export default InProgress;
