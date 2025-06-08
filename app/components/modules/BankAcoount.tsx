import { useState } from "react";
import { Star, X, Maximize2, ChevronDown } from "lucide-react";

interface PaymentCardFormData {
  name: string;
  folder: string;
  nameOnCard: string;
  type: string;
  number: string;
  securityCode: string;
  startDate: {
    month: string;
    year: string;
  };
  expirationDate: {
    month: string;
    year: string;
  };
  notes: string;
}

const BankAcoount = () => {
  const [formData, setFormData] = useState<PaymentCardFormData>({
    name: "",
    folder: "",
    nameOnCard: "",
    type: "",
    number: "",
    securityCode: "",
    startDate: {
      month: "",
      year: "",
    },
    expirationDate: {
      month: "",
      year: "",
    },
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      //   const [parent, child] = name.split('.');
      //   setFormData(prev => ({
      //     ...prev,
      //     [parent]: {
      //       ...prev[parent as keyof PaymentCardFormData],
      //       [child]: value
      //     }
      //   }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    // <div
    //   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    //   onClick={(e) => e.stopPropagation()}
    // >
    <div
      style={{ border: "2px solid white" }}
      className=" bg-white shadow-lg rounded-lg w-4xl mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {/* Header */}
      <div className="bg-[#1c1c1c] text-white px-4 py-3 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center space-x-2">
          <button className="hover:bg-red-700 p-1 rounded">
            <ChevronDown className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-medium">Add bank account</h2>
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
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
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

          {/* Right Column - Card Details */}
          <div className="grid grid-cols-1 gap-4 overflow-y-auto  h-[500px] p-4 rounded">
            {/* Name on Card */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Bank Name{" "}
              </label>
              <input
                type="text"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Card Type */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Account Type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Card Number */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Security Code */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                SWIFT Code
              </label>
              <input
                type="text"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Start Date */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                IBAN Number
              </label>
              <input
                type="text"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Pin no */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                PIN Number
              </label>
              <input
                type="text"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/*Branch Address */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Branch Address
              </label>
              <input
                type="text"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/*Branch Phone */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Branch Phone
              </label>
              <input
                type="text"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6">
          <div className="flex items-center space-x-2">
            <button type="button" className="text-gray-600 hover:text-gray-800">
              <Star className="h-6 w-6" />
            </button>
            {/* <button
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
              </button> */}
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
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded cursor-pointer"
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

export default BankAcoount;
