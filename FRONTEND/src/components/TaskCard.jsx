import React from 'react';

const TaskCard = ({ data }) => {

    const showEditDiv = (e ,id)=>{
        e.preventDefault()
        window.localStorage.setItem('editTaskId', id);
        window.location.reload();
    }


  return (
    <button className='bg-white rounded px-4 w-full py-2 hover:shadow transition-all duration-300 text-left'
    onClick={(e) => showEditDiv(e, data._id)}
    >
      <div className='flex items-center justify-between'>
        <h1>{data.title}</h1>
        <div
          className={`text-sm px-2 rounded-full ${
            data.priority === 'low'
              ? 'text-green-500 bg-green-100'
              : data.priority === 'medium'
              ? 'text-yellow-500 bg-yellow-100'
              : 'text-red-500 bg-red-100'
          }`}
        >
          <p>{data.priority}</p>
        </div>
      </div>
      <hr className='my-2' />
      <p className='text-sm text-zinc-500'>{data.description}</p>
    </button>
  );
};

export default TaskCard;
