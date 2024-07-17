import React from 'react';

const Toggle = ({ checked, onChange, disabled }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div className={`toggle__line w-10 h-4 rounded-full shadow-inner ${checked ? 'bg-green-400' : 'bg-red-400 '}`}></div>
        <div className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${checked ? 'transform translate-x-full bg-green-500' : 'bg-gray-500'}`}></div>
      </div>
    </label>
  );
};

export default Toggle;