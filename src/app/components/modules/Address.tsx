import { useState } from 'react';
import { Star, X, Maximize2, ChevronDown } from 'lucide-react';

interface AddressFormData {
  name: string;
  folder: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  gender: string;
  birthday: {
    month: string;
    day: string;
    year: string;
  };
  company: string;
  address1: string;
  address2: string;
}

const Address = () => {
  const [formData, setFormData] = useState<AddressFormData>({
    name: '',
    folder: '',
    title: 'Mr',
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    gender: 'Male',
    birthday: {
      month: '',
      day: '',
      year: '',
    },
    company: '',
    address1: '',
    address2: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('birthday.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        birthday: {
          ...prev.birthday,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    // <div 
    //   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    //   onClick={(e) => e.stopPropagation()}
    // >
      <div style={{border: "2px solid white"}} className=" bg-white shadow-lg rounded-lg w-4xl mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Header */}
        <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center space-x-2">
            <button className="hover:bg-red-700 p-1 rounded">
              <ChevronDown className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-medium">Edit address</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button className="hover:bg-red-700 p-1 rounded">
              <Maximize2 className="h-5 w-5" />
            </button>
            <button className="hover:bg-red-700 p-1 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
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
              <div className="space-y-1">
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
              </div>

              {/* Advanced Settings */}
              <div>
                <button
                  type="button"
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                >
                  <ChevronDown className="h-4 w-4" />
                  <span className="text-sm font-medium">Advanced Settings:</span>
                </button>
              </div>
            </div>

            {/* Right Column - Address Form */}
            <div className="space-y-4 ">
              <div className="grid grid-cols-1 gap-4 overflow-y-auto  h-[500px] p-4 rounded">
                {/* Title */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>

                {/* Name Fields */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Username */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Birthday */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Birthday</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      name="birthday.month"
                      value={formData.birthday.month}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="birthday.day"
                      placeholder="Day"
                      value={formData.birthday.day}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      name="birthday.year"
                      placeholder="Year"
                      value={formData.birthday.year}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Address Fields */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Address 1</label>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Address 2</label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>



              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800"
              >
                <Star className="h-6 w-6" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded"
              >
                👥
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded"
              >
                🗑️
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded"
              >
                🔄
              </button>
            </div>
            <div className="space-x-3">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    // </div>
  );
};

export default Address;