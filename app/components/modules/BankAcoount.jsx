import { useEffect, useState } from "react";
import {X} from "lucide-react";
import { useUser } from "../../context/UserContext";

import axios from "axios";
const BankAcoount = ({ refreshData, modelData }) => {
  const { user, visible, setVisible, isEditing, setIsEditing } = useUser();
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    if (modelData.length > 0 && user?.email && isEditing) {
      setIsEditing(true);
      const data = modelData[0];
      setFormData({
        name: data.name,
        bankname: data.bankname,
        type: data.type,
        number: data.number,
        swiftcode: data.swiftcode,
        ibannumber: data.ibannumber,
        branchname: data.branchname,
        branchaddress: data.branchaddress,
        pinnumber: data.pinnumber,
        notes: data.notes,
        owneremail: user.email,
        userkey: user.userKey,
      });
      setEditId(data.id);
    }
  }, [modelData, user]);

  const [formData, setFormData] = useState({
    name: "",
    bankname: "",
    type: "",
    number: "",
    swiftcode: "",
    ibannumber: "",
    branchname: "",
    branchaddress: "",
    pinnumber: "",
    notes: "",
    owneremail: user.email,
    userkey: user.userKey,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing) {
      try {
        const response = await axios.post("/api/bankAccount/storeBankAccount", {
          formData,
        });
        setFormData((prev) => ({
          ...prev,
          name: "",
          bankname: "",
          type: "",
          number: "",
          swiftcode: "",
          ibannumber: "",
          branchname: "",
          branchaddress: "",
          pinnumber: "",
          notes: "",
        }));
        if (response.status === 200) {
          alert("Data Stored");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("Data already exists");
        } else {
          alert(error.response?.data?.message || "Something went wrong");
        }
      }
    } else {
      try {
        const response = await axios.put("/api/bankAccount/editBankAccount", {
          id: editId,
          ...formData,
        });
        setFormData((prev) => ({
          ...prev,
          name: "",
          bankname: "",
          type: "",
          number: "",
          swiftcode: "",
          ibannumber: "",
          branchname: "",
          branchaddress: "",
          pinnumber: "",
          notes: "",
        }));
        if (response.status === 200) {
          alert("Updated Successfully");
          refreshData();
        }
      } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const emptyForm = () => {
    setFormData({
      ...prev,
      name: "",
      bankname: "",
      type: "",
      number: "",
      swiftcode: "",
      ibannumber: "",
      branchname: "",
      branchaddress: "",
      pinnumber: "",
      notes: "",
    });
  };
  return (
    // <div
    //   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    //   onClick={(e) => e.stopPropagation()}
    // >
    <div
      style={{ border: "2px solid white" }}
      className=" bg-white shadow-lg rounded-lg w-80 md:w-2xl h-96 lg:h-[500px] xl:h-max xl:overflow-hidden overflow-scroll lg:w-4xl  mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {/* Header */}
      <div className="bg-[#1c1c1c] px-4 py-3 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center space-x-2">
          {/* <button className="hover:bg-red-700 p-1 rounded">
            <ChevronDown className="h-5 w-5" />
          </button> */}
          <h2 className="text-lg font-medium text-[#b0b0b0]">
            Add bank account
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          {/* <button className="hover:bg-red-700 p-1 rounded">
            <Maximize2 className="h-5 w-5" />
          </button> */}
          <button
            onClick={() => setVisible(false)}
            className="hover:bg-red-700 p-1 rounded text-white bg-red-500"
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
                name="bankname"
                value={formData.bankname}
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
                name="swiftcode"
                value={formData.swiftcode}
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
                name="ibannumber"
                value={formData.ibannumber}
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
                name="pinnumber"
                value={formData.pinnumber}
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
                name="branchaddress"
                value={formData.branchaddress}
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
                name="branchname"
                value={formData.branchname}
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
              {/* <Star className="h-6 w-6" /> */}
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
              onClick={(e) => {
                e.stopPropagation();
                setVisible(false);
                setIsEditing(false);
                emptyForm();
              }}
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Cancel
            </button>
            {isEditing ? (
              <button
                onClick={() =>
                  setTimeout(() => {
                    setFormData({
                      name: modelData.name,
                      bankname: modelData.bankname,
                      type: modelData.type,
                      number: modelData.number,
                      swiftcode: modelData.swiftcode,
                      ibannumber: modelData.ibannumber,
                      branchname: modelData.branchname,
                      branchaddress: modelData.branchaddress,
                      pinnumber: modelData.pinnumber,
                      notes: modelData.notes,
                      // owneremail:user.email
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
                className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded cursor-pointer"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default BankAcoount;
