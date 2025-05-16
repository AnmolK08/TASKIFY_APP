import React from 'react';

const StackTitle = ({ title }) => {
  return (
    <div className="border-b border-zinc-600 pb-2 bg-zinc-900">
      <h1 className="font-semibold text-zinc-300 text-center">{title}</h1>
    </div>
  );
};

export default StackTitle;
