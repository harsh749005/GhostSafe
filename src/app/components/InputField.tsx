import React from 'react';

type InputFieldProps = {
  label: string;
  type: 'text' | 'email' | 'tel' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
};

const InputField = ({ 
  label, 
  type, 
  value, 
  onChange, 
  onBlur,
  error, 
  required = false 
}: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={label.toLowerCase()} className="block text-[#b0b0b0] text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          id={label.toLowerCase()}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          className={`w-full border ${
            error ? 'border-red-500' : 'border-[#2b2b2b]'
          } text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;