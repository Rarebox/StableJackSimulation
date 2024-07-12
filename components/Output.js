import React from 'react';

const Output = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-lg font-medium mb-2">
        {label}
      </label>
      <div className="border rounded px-3 py-2 text-center">
        {value}
      </div>
    </div>
  );
};

export default Output;