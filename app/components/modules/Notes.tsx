import { useState } from 'react';
import { Star, X, ChevronDown } from 'lucide-react';

interface Attachment {
  id: string;
  name: string;
}

const SecureNote = () => {
  const [formData, setFormData] = useState({
    name: '',
    folder: '',
    notes: '',
  });

  const [attachments, setAttachments] = useState<Attachment[]>([
    { id: 'e72cd8bd', name: 'e72cd8bd-a191-4c7a-9e9... .png' },
    { id: 'fb7e5700', name: 'fb7e5700-6ccc-11e9-83fe-... .png' },
    { id: 'whatsapp', name: 'WhatsApp Image 2025-06-... .jpg' }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  return (
    // <div 
    //   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    //   onClick={(e) => e.stopPropagation()}
    // >
      <div style={{border: "2px solid white"}} className=" bg-white shadow-lg rounded-lg w-4xl mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Header */}
        <div className="bg-[#212121] text-[#b0b0b0] px-4 py-3 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center space-x-2">
            <button className="hover:bg-red-700 p-1 rounded">
              <ChevronDown className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-medium">Edit secure note</h2>
          </div>
          <div className="flex items-center space-x-2">
            {/* <button className="hover:bg-red-700 p-1 rounded">
              <Maximize2 className="h-5 w-5" />
            </button> */}
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

              {/* Attachments */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Attachments:</label>
                <div className="space-y-2">
                  {attachments.map(attachment => (
                    <div key={attachment.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                      <span className="text-gray-600">📎</span>
                      <span className="text-sm text-gray-700 flex-1">{attachment.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(attachment.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    <span>📎</span>
                    <span>Add Attachment</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Notes */}
            <div className="space-y-1">
              <textarea
                style={{
                        width: "100%",
    height: "150px",
    resize: "none",
    boxSizing: "border-box",
    marginBottom: "1rem"

  }}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={20}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your secure note here..."
              />
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
              {/* <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded"
              >
                👥
              </button> */}
              {/* <button
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
              className="px-4 py-2 text-white bg-blue-500 cursor-pointer hover:bg-blue-600 rounded"
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

export default SecureNote;