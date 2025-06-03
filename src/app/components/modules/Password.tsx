import { useState } from 'react';
import { Star, X, Maximize2, Eye, EyeOff, ChevronDown } from 'lucide-react';

const PasswordManager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    name: '',
    username: '',
    password: '',
    notes: '',
    folder: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{border: "var(--border)"}} className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* Header */}
      <div className="bg-[#212121] border-2 text-[#b0b0b0] px-4 py-3 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center space-x-2">
          <button className="hover:bg-red-700 p-1 rounded">
            <ChevronDown className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-medium">Add password</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button className="hover:bg-red-700 p-1 rounded">
            <Maximize2 className="h-5 w-5" />
          </button>
          <button  className="hover:bg-red-700 p-1 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* URL Field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">URL:</label>
          <div className="flex">
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r hover:bg-gray-200"
            >
              <ChevronDown className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Folder Field */}
          {/* <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Folder:</label>
            <div className="flex">
              <input
                type="text"
                name="folder"
                value={formData.folder}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r hover:bg-gray-200"
              >
                <ChevronDown className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div> */}

          {/* Username Field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Site password:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Notes Field */}
        {/* <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div> */}

        {/* Advanced Settings */}
      

        {/* Footer */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            className="text-gray-600 hover:text-gray-800"
          >
            <Star className="h-6 w-6" />
          </button>
          <div className="space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 cursor-pointer hover:bg-blue-600 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordManager;