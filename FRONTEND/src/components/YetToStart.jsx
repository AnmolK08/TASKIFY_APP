import React from 'react';
import TaskCard from './TaskCard';
import { useAppContext } from '../context/AppContext';

const YetToStart = () => {
  const { tasks } = useAppContext();

  const yetToStartTasks = tasks.yetToStart;

  return (
    <div className="flex flex-col gap-2">
      {yetToStartTasks.length > 0 ? (
        yetToStartTasks.map((item, index) => (
          <TaskCard key={index} data={item} />
        ))
      ) : (
        <p>No tasks yet to start</p>
      )}
    </div>
  );
};

export default YetToStart;
