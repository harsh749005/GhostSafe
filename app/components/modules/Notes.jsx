import { useEffect, useState } from "react";
import { Star, X, ChevronDown } from "lucide-react";
import { useUser } from "../../context/UserContext";
import axios, { isAxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";

const SecureNote = ({ refreshData, modelData }) => {
  const { user, visible, setVisible, isEditing, setIsEditing } = useUser();
  const [editId, setEditId] = useState(null);

  const notify = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "dark",
    });
  };

  useEffect(() => {
    if (modelData.length > 0 && user?.email && isEditing) {
      setIsEditing(true);
      setFormData({
        name: modelData[0].name,
        notes: modelData[0].notes,
        owneremail: user.email,
        userkey: user.userKey,
      });
      setEditId(modelData[0].id);
    }
  }, [modelData, user]);

  const [formData, setFormData] = useState({
    name: "",
    notes: "",
    owneremail: user?.email,
    userkey: user.userKey,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);

    if (!isEditing) {
      try {
        const response = await axios.post("/api/notes/savenotes", { formData });
        setFormData((prev) => ({
          ...prev,
          name: "",
          notes: "",
        }));
        if (response.status === 200) {
          notify("Notes added");
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response && error.response.status === 409) {
            notify("Data already exists");
          } else {
            notify(error.response?.data?.message || "Something went wrong");
          }
        }
      }
    } else {
      try {
        const response = await axios.put("/api/notes/editnotes", {
          id: editId,
          ...formData,
        });
        setFormData((prev) => ({
          ...prev,
          name: "",
          notes: "",
        }));
        if (response) {
          notify("Updated Successfully");
          refreshData();
        }
        // console.log(response);
        // console.log("Form submitted:", formData);
      } catch (error) {
        if (isAxiosError(error)) {
          notify(error.response?.data?.message || "Something went wrong");
        }
      }
    }
  };

  const emptyForm = () => {
    setFormData({
      name: "",
      notes: "",
    });
  };

  return (
    <>
      {visible && (
        <div
          style={{ border: "2px solid white" }}
          className=" bg-white shadow-lg rounded-lg w-4xl mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
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
              <button
                className="hover:bg-red-700 p-1 rounded"
                onClick={() => setVisible(false)}
              >
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
              </div>

              {/* Right Column - Notes */}
              <div className="space-y-1">
                <textarea
                  style={{
                    width: "100%",
                    height: "150px",
                    resize: "none",
                    boxSizing: "border-box",
                    marginBottom: "1rem",
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
              </div>
              <div className="space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisible(false);
                    setIsEditing(false);
                    emptyForm();
                  }}
                  type="button"
                  className="px-4 py-2 text-gray-700 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Cancel
                </button>

                {isEditing ? (
                  <button
                    onClick={() =>
                      setTimeout(() => {
                        setFormData({
                          name: modelData.name,
                          owneremail: modelData.email,
                          userkey: modelData.userKey,
                        });
                        setEditId(modelData.id);
                        refreshData();
                        setVisible(false);
                      }, 2000)
                    }
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        refreshData();
                        setVisible(false);
                      }, 2000);
                    }}
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 cursor-pointer hover:bg-blue-600 rounded"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SecureNote;
