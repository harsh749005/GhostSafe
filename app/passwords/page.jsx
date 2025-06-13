"use client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Password from "../components/modules/Password";
import { useUser } from "../context/UserContext";
import axios from "axios";
export default function PasswordManager() {
  const [hoveredIndex, setHoverIndex] = useState(null);
  const { visible, setVisible,setIsEditing } = useUser();
  const [loding, setLoding] = useState(false);
  const [data, setData] = useState([]);
  const [mdata, setMdata] = useState([]);  //data from model Passwords ,no request made 

  // FetchData Handler
  const fetchData = async () => {
    setLoding(true);
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))
      ?.split("=")[1];

    if (userCookie) {
      const user = JSON.parse(decodeURIComponent(userCookie));
      console.log("User from cookie:", user);

      try {
        const response = await axios.get(
          `/api/passwords/fetchPasswordData?owneremail=${user.email}`
        );
        setData(response.data.result);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setTimeout(() => {
          setLoding(false); // Stop loading (in both success or error)
        }, 1000);
      }
    } else {
      console.warn("User cookie not found");
      setLoding(false);
    }
  };
  useEffect(() => {
    fetchData(); // Call the function
  }, []);
  // Delete Handler
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `api/passwords/deletepasswords?id=${id}`
      );
      setData((prev) => prev.filter((data) => data.id !== id));
      if (response) {
        alert("deleted");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };
  // Edit Handler 
  const handleEdit = async (id) => {
    try {
      setMdata(data.filter((item) => item.id === id));
      console.log("ha ho gyaa");
    } catch (err) {
      console.error("Error deleting item:", err);
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
          <main className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-semibold text-[#dededb]"
                style={{ fontFamily: "Inter" }}
              >
                Passwords
              </h2>
              <div className="flex items-center space-x-2">
                {/* <button className="p-2 hover:bg-zinc-100 rounded-lg">
                <span className="text-zinc-600">🔍</span>
              </button>
              <button className="p-2 hover:bg-zinc-100 rounded-lg">
                <span className="text-zinc-600">📋</span>
              </button> */}
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
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--cardContainer)",
                border: "1px solid #2b2b2b",
              }}
              className=" rounded-lg shadow p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-[#B0B0B0] text-2xl">Social </h3>
                {/* <span className="text-sm text-zinc-500">↓</span> */}
              </div>

              <div className="grid grid-cols-4 gap-4">
                {/* Sample Items */}
                {loding ? (
                  <h1 className="text-gray-500 font-medium text-center py-4">
                    Loding...
                  </h1>
                ) : data.length === 0 ? (
                  <h1 className="text-gray-400 font-medium text-center py-4">
                    No password entries found.
                  </h1>
                ) : (
                  data.map((data, index) => (
                    <div
                      key={data.id || index}
                      onClick={() => console.log(data.id)}
                      onMouseLeave={() => setHoverIndex(null)}
                      onMouseEnter={() => setHoverIndex(index)}
                      className="relative cursor-pointer bg-[#222] border border-[#2e2e2e] rounded-lg p-4 hover:shadow-md transition"
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
                          <h4 className="font-medium text-lg text-[#B0B0B0]">
                            {data.name}
                          </h4>
                          <p className="text-sm text-[#B0B0B0]">
                            {data.username}
                          </p>
                        </div>
                      </div>
                      {hoveredIndex === index && (
                        <div className="bg-transparent border border-[#2e2e2e] rounded-lg p-2 hover:shadow-md transition w-full h-full absolute top-0 left-0 flex justify-end items-start">
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(true);
                                setVisible(true);
                                handleEdit(data.id);
                              }}
                              className=" cursor-pointer text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded shadow-sm transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(data.id);
                              }}
                              className=" cursor-pointer text-sm font-semibold bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded shadow-sm transition"
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
            setVisible(true);
          }}
          className="fixed cursor-pointer bottom-6 right-6 w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-red-600 transition"
        >
          +
        </button>
        {visible && <Password refreshData={fetchData} modelData={mdata} />}
      </div>
    </>
  );
}
