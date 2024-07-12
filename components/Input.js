import React from 'react';

const Input = ({ label, value, setValue, type = 'text' }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-red-500 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default Input;
