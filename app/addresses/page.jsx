"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Address from "../components/modules/Address";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function AddressManager() {
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
  const notifyError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });
  };

  const [hoveredIndex, setHoverIndex] = useState(null);
  const { user, visible, setVisible, isEditing, setIsEditing } = useUser();
  const [loding, setLoding] = useState(false);
  const [data, setData] = useState([]);
  const [mdata, setMdata] = useState([]); //data from model Address ,no request made to fetch data when edit request is made

  const fetchData = async () => {
    setLoding(true);
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))
      ?.split("=")[1];

    if (userCookie) {
      const user = JSON.parse(decodeURIComponent(userCookie));
      // console.log("User from cookie:", user);

      try {
        const response = await axios.get(
          `/api/address/fetchAddress?owneremail=${user.email}`
        );
        setData(response.data.result);
      } catch (err) {
        notifyError("Something went wrong, please try again later.");
        // console.error("Error fetching data:", err);
      } finally {
        setTimeout(() => {
          setLoding(false); // Stop loading (in both success or error)
        }, 1000);
      }
    } else {
      notifyError("Something went wrong, please try again later.");
      // console.warn("User cookie not found");
      setLoding(false);
    }
  };
  useEffect(() => {
    fetchData(); // Call the function
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`api/address/deleteAddress?id=${id}`);
      setData((prev) => prev.filter((data) => data.id !== id));
      if (response) {
        notify("Deleted");
      }
    } catch (err) {
      notifyError("Something went wrong, please try again later.");
      // console.error("Error deleting item:", err);
    }
  };

  const handleEdit = async (id) => {
    try {
      setMdata(data.filter((item) => item.id === id));
    } catch (err) {
      notifyError("Something went wrong, please try again later.");
      // console.error("Error deleting item:", err);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex relative"
        style={{ backgroundColor: "var(--background)" }}
      >
        <Sidebar />
        <div
          className="flex-1 overflow-hidden"
          onClick={() => {
            setVisible(false);
          }}
        >
          <Navbar />
          {/* Content */}
          <main className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-[12px] md:text-xl font-semibold text-[#dededb]"
                style={{ fontFamily: "Inter" }}
              >
                Addresses
              </h2>
              {/* <div className="flex items-center space-x-2">
                <select
                  className="px-3 py-2  rounded-lg text-sm font-medium"
                  style={{
                    border: "1px solid #2e2e2e",
                    color: "#B0B0B0",
                    fontFamily: "Inter",
                  }}
                >
                  <option>Folder (a-z)</option>
                </select>
              </div> */}
            </div>

            <div
              style={{
                backgroundColor: "var(--cardContainer)",
                border: "1px solid #2b2b2b",
              }}
              className="p-2 rounded-lg shadow md:p-4"
            >
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <h3 className="text-[10px] font-medium text-[#B0B0B0] md:text-2xl">
                  Social{" "}
                </h3>
                {/* <span className="text-sm text-zinc-500">↓</span> */}
              </div>

              <div className="flex flex-wrap flex-row md:grid md:grid-cols-4 gap-2 md:gap-4">
                {/* Sample Items */}
                {loding ? (
                  data.map((item, index) => (
                    <Stack key={item.id} spacing={1}>
                      <Skeleton
                        variant="rounded"
                        width={"100%"}
                        height={80}
                        sx={{ backgroundColor: "#2a2a2a" }}
                      />
                    </Stack>
                  ))
                ) : data.length === 0 ? (
                  <h1 className="text-gray-400 font-medium text-center text-[10px] py-2 md:py-4">
                    No Address entries found.
                  </h1>
                ) : (
                  data.map((data, index) => (
                    <div
                      key={index}
                      onMouseLeave={() => setHoverIndex(null)}
                      onMouseEnter={() => setHoverIndex(index)}
                      className="w-full p-2 md:w-full md:p-4 relative cursor-pointer bg-[#222] border border-[#2e2e2e] rounded-md md:rounded-lg  hover:shadow-md transition"
                    >
                      <div className="flex items-center space-x-3">
                        {/* <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-zinc-200">
                      <img
                        src="https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico"
                        alt="Instagram"
                        className="w-6 h-6"
                      />
                    </div> */}
                        <div>
                          <h4 className="font-medium text-[10px] md:text-lg text-[#B0B0B0]">
                            {data.name}
                          </h4>
                          <p className="line-clamp-1 text-[8px] md:text-sm text-[#B0B0B0]">
                            {data.username}
                          </p>
                        </div>
                      </div>
                      {hoveredIndex === index && (
                        <div className="bg-transparent border border-[#2e2e2e] rounded-lg p-2 hover:shadow-md transition w-full h-full absolute top-0 left-0 flex justify-end items-start">
                          <div className="flex md:flex-col gap-2 md:gap-0 md:space-y-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(true);
                                setVisible(true);
                                handleEdit(data.id);
                              }}
                              className=" cursor-pointer text-[8px] md:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 md:py-1 rounded-[2px] md:rounded shadow-sm transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(data.id);
                              }}
                              className=" cursor-pointer text-[8px] md:text-sm font-semibold bg-red-600 hover:bg-red-500 text-white px-2 py-[2px] md:py-1 md:px-3  rounded-[2px] md:rounded shadow-sm transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
        {/* Add Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(false);
            alert(isEditing);
            setVisible(true);
          }}
          className="fixed cursor-pointer bottom-6 right-6 w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-red-600 transition"
        >
          +
        </button>
        {visible && <Address refreshData={fetchData} modelData={mdata} />}
      </div>
      <ToastContainer />
    </>
  );
}
