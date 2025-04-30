import React from 'react'
import TaskCard from './TaskCard'

const InProgress = ({task}) => {
  return (
    <div className='flex flex-col gap-2'>
        {task && task.map((item, index) => (
            <TaskCard key={index} data={item} />
        ))}
                   
    </div>
  )
}

export default InProgress