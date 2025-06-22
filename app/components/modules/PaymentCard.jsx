import {  useEffect,useState } from "react";
import { Star, X, Maximize2, ChevronDown } from "lucide-react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
const PaymentCard = ({ refreshData,modelData }) => {
  const { user, visible, setVisible, isEditing, setIsEditing } = useUser();
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (modelData.length > 0 && user?.email && isEditing) {
      setIsEditing(true);
      const data = modelData[0];
      console.log(data);
      // const [year, month] = data.startdate;
      // const [expyear, expmonth] = data.expirationdate;
      console.log(data)
      setFormData({
        name:data.name,
        nameoncard: data.nameoncard,
        type: data.type,
        number: data.number,
        securitycode: data.securitycode,
        startdate: {
          month:data.startmonth,
          year:data.startyear,
        },
        expirationdate: {
          month:data.expirationmonth,
          year:data.expirationyear,
        },
        notes: data.notes,
        owneremail: user.email,
        userkey:user.userKey
      });
      setEditId(modelData[0].id);
    }
  }, [modelData, user]);
console.log(modelData)
  const [formData, setFormData] = useState({
    name: "",
    nameoncard: "",
    type: "",
    number: "",
    securitycode: "",
    startdate: {
      month: "",
      year: "",
    },
    expirationdate: {
      month: "",
      year: "",
    },
    notes: "",
    owneremail: user.email,
    userkey:user.userKey
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
    console.log("Form submitted:", formData);

    if (!isEditing) {
      try {
        // Clear form before sending (optional — can be after as well)
        setFormData((prev) => ({
          ...prev,
          name: "",
          nameoncard: "",
          type: "",
          number: "",
          securitycode: "",
          startdate: {
            month: "",
            year: "",
          },
          expirationdate: {
            month: "",
            year: "",
          },
          notes: "",
          owneremail: user.email,
          userkey:user.userKey
        }));

        const response = await axios.post("/api/paymentCard/storePaymentCard", {
          formData,
        });

        // Clear form again after successful submission
        setFormData((prev) => ({
          ...prev,
          name: "",
          nameoncard: "",
          type: "",
          number: "",
          securitycode: "",
          startdate: {
            month: "",
            year: "",
          },
          expirationdate: {
            month: "",
            year: "",
          },
          notes: "",
          owneremail: user.email,
          userkey:user.userKey
        }));

        if (response.status === 200) {
          alert("Data inserted");
          // refreshData(); // Uncomment if needed
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
        const response = await axios.put("/api/paymentCard/editPaymentCard", {
          id: editId,
          ...formData,
        });
        setFormData((prev) => ({
          ...prev,
          name: "",
          nameoncard: "",
          type: "",
          number: "",
          securitycode: "",
          startdate: {
            month: "",
            year: "",
          },
          expirationdate: {
            month: "",
            year: "",
          },
          notes: "",
          owneremail: user.email,
          userkey:user.userKey
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
      name:"",
      nameoncard: "",
      type: "",
      number: "",
      securitycode: "",
      startdate: {
        month: "",
        year: "",
      },
      expirationdate: {
        month: "",
        year: "",
      },
      notes: "",
      owneremail: user.email || "",
      userkey:user.userKey
    });
  };


  return (
    // <div
    //   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    //   onClick={(e) => e.stopPropagation()}
    // >
    <>
      {visible && (
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
              <h2 className="text-lg font-medium">Add payment card</h2>
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

              </div>

              {/* Right Column - Card Details */}
              <div className="grid grid-cols-1 gap-4 overflow-y-auto  h-[500px] p-4 rounded">
                {/* Name on Card */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="nameoncard"
                    value={formData.nameoncard}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Card Type */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Type
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
                    Number
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
                    Security Code
                  </label>
                  <input
                    type="password"
                    name="securitycode"
                    value={formData.securitycode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Start Date */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="startdate.month"
                      value={formData.startdate.month}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                          <option
                            key={month}
                            value={month.toString().padStart(2, "0")}
                          >
                            {month.toString().padStart(2, "0")}
                          </option>
                        )
                      )}
                    </select>
                    <input
                      type="text"
                      name="startdate.year"
                      placeholder="Year"
                      value={formData.startdate.year}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Expiration Date */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Expiration Date
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="expirationdate.month"
                      value={formData.expirationdate.month}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                          <option
                            key={month}
                            value={month.toString().padStart(2, "0")}
                          >
                            {month.toString().padStart(2, "0")}
                          </option>
                        )
                      )}
                    </select>
                    <input
                      type="text"
                      name="expirationdate.year"
                      placeholder="Year"
                      value={formData.expirationdate.year}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Notes */}
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
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Cancel
                </button>
                {isEditing ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const month = modelData.startmonth;
                      const year = modelData.startyear;
                      const expmonth = modelData.expirationmonth;
                      const expyear = modelData.expirationyear;
                      setTimeout(() => {
                        setFormData({
                          name:modelData.name,
                          nameoncard: modelData.nameoncard,
                          type: modelData.type,
                          number: modelData.number,
                          securitycode: modelData.securitycode,
                          startdate: {
                            month,
                            year,
                          },
                          expirationdate:{
                            expyear,
                            expmonth                            
                          },
                          
                          notes: modelData.notes,
                          owneremail: modelData.owneremail,
                        });
                        setEditId(modelData.id);
                        refreshData();
                        setVisible(false);
                      }, 2000);
                    }}
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTimeout(() => {
                        refreshData();
                        setVisible(false);
                      }, 2000);
                    }}
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded cursor-pointer"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
    // </div>
  );
};

export default PaymentCard;
