"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function allitems() {
  const [cookie, setCookie] = useState("");
  const [hoveredIndex, setHoverIndex] = useState(null);
  const [loding, setLoding] = useState(false);
  const [password, setPasswords] = useState([]);
  const [notes, setNotes] = useState([]);
  const [address, setAddress] = useState([]);
  const [paymentCards, setpaymentCards] = useState([]);
  const [bankAccount, setBankAccount] = useState([]);

  useEffect(() => {
    setLoding(true);
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))
      ?.split("=")[1];
    setCookie(userCookie || "");
  }, []);

  const getNotes = async () => {
    if (cookie) {
      const user = JSON.parse(decodeURIComponent(cookie));
      // console.log("User from cookie:", user);
      const response = await axios.get(
        `/api/notes/fetchnotes?owneremail=${user.email}`
      );
      setNotes(response.data.result);
    }
  };

  const getPasswords = async () => {
    if (cookie) {
      const user = JSON.parse(decodeURIComponent(cookie));
      // console.log("User from cookie:", user);
      const response = await axios.get(
        `/api/passwords/fetchPasswordData?owneremail=${user.email}`
      );
      setPasswords(response.data.result);
    }
  };

  const getAddress = async () => {
    if (cookie) {
      const user = JSON.parse(decodeURIComponent(cookie));
      // console.log("User from cookie:", user);
      const response = await axios.get(
        `/api/address/fetchAddress?owneremail=${user.email}`
      );
      setAddress(response.data.result);
    }
  };

  const getPaymentCard = async () => {
    if (cookie) {
      const user = JSON.parse(decodeURIComponent(cookie));
      // console.log("User from cookie:", user);
      const response = await axios.get(
        `/api/paymentCard/fetchPaymentCard?owneremail=${user.email}`
      );
      setpaymentCards(response.data.result);
    }
  };

  const getBankAccount = async () => {
    if (cookie) {
      const user = JSON.parse(decodeURIComponent(cookie));
      // console.log("User from cookie:", user);
      const response = await axios.get(
        `/api/bankAccount/fetchBankAccount?owneremail=${user.email}`
      );
      setLoding(false);

      setBankAccount(response.data.result);
    }
  };

  useEffect(() => {
    getNotes();
    getPasswords();
    getAddress();
    getPaymentCard();
    getBankAccount();
  }, [cookie]);

  return (
    <div
      className="min-h-screen flex relative"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <Navbar />

        {/* Content */}
        <main className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2
              className="text-[12px] md:text-xl font-semibold text-[#dededb]"
              style={{ fontFamily: "Inter" }}
            >
              All Items
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
            {/* Notes */}
            <div className="flex items-center justify-between  mb-2 md:mb-4">
              <h3 className="text-[10px] font-medium text-[#B0B0B0] md:text-xl">
                Notes{" "}
              </h3>
              {/* <span className="text-sm text-zinc-500">↓</span> */}
            </div>
            {loding ? (
              <h1 className="text-gray-500 font-medium text-center text-[10px] py-2 md:py-4">
                Loding...
              </h1>
            ) : notes.length === 0 ? (
              <h1 className="text-gray-400 font-medium text-center text-[10px] py-2 md:py-4">
                No Notes found.
              </h1>
            ) : (
              <div className="flex flex-wrap flex-row md:grid md:grid-cols-4 gap-2 md:gap-4">
                {/* Sample Items */}
                {notes.map((data, index) => (
                  <div
                    key={index}
                    onMouseLeave={() => setHoverIndex(null)}
                    onMouseEnter={() => setHoverIndex(index)}
                    className="w-20 p-2 md:w-full md:p-4 relative cursor-pointer bg-[#222] border border-[#2e2e2e] rounded-md md:rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <img
                          src="/images/notes.svg"
                          alt="notes"
                          className="w-2 md:w-4 text-[#b0b0b0] "
                        />
                        <h4 className=" line-clamp-1 mt-2 font-medium w-full text-[10px] md:text-lg text-[#B0B0B0]">
                          {data.name}
                        </h4>
                        {/* <p className="text-sm text-[#B0B0B0]">harshpatel2641</p> */}
                      </div>
                    </div>
                    {/* {hoveredIndex === index && (
                    <div className="bg-transparent border border-[#2e2e2e] rounded-lg p-2 hover:shadow-md transition w-full h-full absolute top-0 left-0 flex justify-end items-start">
                      <div className="flex flex-col space-y-2">
                        <button className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded shadow-sm transition">
                          Edit
                        </button>
                        <button className="text-sm font-semibold bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded shadow-sm transition">
                          Delete
                        </button>
                      </div>
                    </div>
                  )} */}
                  </div>
                ))}
              </div>
            )}

            {/* Passowrds */}
            <div className="flex items-center justify-between mt-4 mb-2 md:mb-4">
              <h3 className="text-[10px] font-medium text-[#B0B0B0] md:text-xl">
                Passwords{" "}
              </h3>
              {/* <span className="text-sm text-zinc-500">↓</span> */}
            </div>
            {loding ? (
              <h1 className="text-gray-500 font-medium text-center text-[10px] py-2 md:py-4">
                Loding...
              </h1>
            ) : password.length === 0 ? (
              <h1 className="text-gray-400 font-medium text-center text-[10px] py-2 md:py-4">
                No Passwords found.
              </h1>
            ) : (
              <div className="flex flex-wrap flex-row md:grid md:grid-cols-4 gap-2 md:gap-4">
                {password.map((data, index) => (
                  <div
                    key={data.id || index}
                    // onClick={() => console.log(data.id)}
                    // onMouseLeave={() => setHoverIndex(null)}
                    // onMouseEnter={() => setHoverIndex(index)}
                    className="w-20 p-2 md:w-full md:p-4 relative cursor-pointer bg-[#222] border border-[#2e2e2e] rounded-md md:rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <h4 className="font-medium text-[10px] md:text-lg text-[#B0B0B0]">
                          {data.name}
                        </h4>
                        <p className=" line-clamp-1 text-[8px] md:text-sm text-[#B0B0B0]">
                          {data.username}
                        </p>
                      </div>
                    </div>
                    {hoveredIndex === index && (
                      <div className="bg-transparent border border-[#2e2e2e] rounded-lg p-2 hover:shadow-md transition w-full h-full absolute top-0 left-0 flex justify-end items-start">
                        <div className="flex flex-col space-y-2">
                          {/* <button
                          // onClick={(e) => {
                          //   e.stopPropagation();
                          //   setIsEditing(true);
                          //   setVisible(true);
                          //   handleEdit(data.id);
                          // }}
                          className=" cursor-pointer text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded shadow-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          // onClick={(e) => {
                          //   e.stopPropagation();
                          //   handleDelete(data.id);
                          // }}
                          className=" cursor-pointer text-sm font-semibold bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded shadow-sm transition"
                        >
                          Delete
                        </button> */}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Address */}
            <div className="flex items-center justify-between mt-4 mb-2 md:mb-4">
              <h3 className="text-[10px] font-medium text-[#B0B0B0] md:text-xl">
                Address{" "}
              </h3>
              {/* <span className="text-sm text-zinc-500">↓</span> */}
            </div>
            {loding ? (
              <h1 className="text-gray-500 font-medium text-center text-[10px] py-2 md:py-4">
                Loding...
              </h1>
            ) : address.length === 0 ? (
              <h1 className="text-gray-400 font-medium text-center text-[10px] py-2 md:py-4">
                No Address found.
              </h1>
            ) : (
              <div className="flex flex-wrap flex-row md:grid md:grid-cols-4 gap-4">
                {address.map((data, index) => (
                  <div
                    key={index}
                    // onMouseLeave={() => setHoverIndex(null)}
                    // onMouseEnter={() => setHoverIndex(index)}
                    className="w-20 p-2 md:w-full md:p-4 relative cursor-pointer bg-[#222] border border-[#2e2e2e]  rounded-md md:rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-3">
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
                        <div className="flex flex-col space-y-2">
                          {/* <button
                          //   onClick={(e) => {
                          //   e.stopPropagation();
                          //   setIsEditing(true);
                          //   setVisible(true);
                          //   handleEdit(data.id);
                          // }}
                          className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded shadow-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          //   onClick={(e) => {
                          //   e.stopPropagation();
                          //   handleDelete(data.id);
                          // }}
                          className="text-sm font-semibold bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded shadow-sm transition"
                        >
                          Delete
                        </button> */}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Payment Cards */}
            <div className="flex items-center justify-between mt-4 mb-2 md:mb-4">
              <h3 className="text-[10px] font-medium text-[#B0B0B0] md:text-xl">
                Payment Cards{" "}
              </h3>
              {/* <span className="text-sm text-zinc-500">↓</span> */}
            </div>
            {loding ? (
              <h1 className="text-gray-500 font-medium text-center text-[10px] py-2 md:py-4">
                Loding...
              </h1>
            ) : paymentCards.length === 0 ? (
              <h1 className="text-gray-400 font-medium text-center text-[10px] py-2 md:py-4">
                No Notes found.
              </h1>
            ) : (
              <div className="flex flex-wrap flex-row md:grid md:grid-cols-4 gap-4">
                {paymentCards.map((data, index) => (
                  <div
                    key={index}
                    // onMouseLeave={() => setHoverIndex(null)}
                    // onMouseEnter={() => setHoverIndex(index)}
                    className="w-20 p-2 md:w-full md:p-4 relative cursor-pointer bg-[#222] border border-[#2e2e2e] rounded-md md:rounded-lg  hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <h4 className="font-medium text-[10px] md:text-lg text-[#B0B0B0]">
                          {data.name}
                        </h4>
                        <p className="text-[8px] md:text-sm text-[#B0B0B0]">
                          {data.nameoncard}
                        </p>
                        <p className="text-[8px] md:text-sm text-[#B0B0B0]">
                          {data.number}
                        </p>
                      </div>
                    </div>
                    {hoveredIndex === index && (
                      <div className="bg-transparent border border-[#2e2e2e] rounded-lg p-2 hover:shadow-md transition w-full h-full absolute top-0 left-0 flex justify-end items-start">
                        <div className="flex flex-col space-y-2">
                          {/* <button
                          // onClick={(e) => {
                          //   e.stopPropagation();
                          //   setIsEditing(true);
                          //   setVisible(true);
                          //   handleEdit(data.id);
                          // }}
                          className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded shadow-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          // onClick={(e) => {
                          //   e.stopPropagation();
                          //   handleDelete(data.id);
                          // }}
                          className="text-sm font-semibold bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded shadow-sm transition"
                        >
                          Delete
                        </button> */}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Bank Account */}
            <div className="flex items-center justify-between mt-4 mb-2 md:mb-4">
              <h3 className="text-[10px] font-medium text-[#B0B0B0] md:text-xl">
                Bank Account{" "}
              </h3>
              {/* <span className="text-sm text-zinc-500">↓</span> */}
            </div>
            {loding ? (
              <h1 className="text-gray-500 font-medium text-[10px] text-center py-2 md:py-4">
                Loding...
              </h1>
            ) : bankAccount.length === 0 ? (
              <h1 className="text-gray-400 font-medium text-[10px] text-center py-2 md:py-4">
                No Notes found.
              </h1>
            ) : (
              <div className="flex flex-wrap flex-row md:grid md:grid-cols-4 gap-2 md:gap-4">
                {bankAccount.map((data, index) => (
                  <div
                    key={index}
                    // onMouseLeave={() => setHoverIndex(null)}
                    // onMouseEnter={() => setHoverIndex(index)}
                    className="w-20 p-2 md:w-full md:p-4 relative cursor-pointer bg-[#222] border border-[#2e2e2e] rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <h4 className="font-medium text-[10px] md:text-lg text-[#B0B0B0]">
                          {data.name}
                        </h4>
                        <p className="line-clamp-1 text-[8px] md:text-sm text-[#B0B0B0]">
                          {data.bankname}
                        </p>
                      </div>
                    </div>
                    {hoveredIndex === index && (
                      <div className="bg-transparent border border-[#2e2e2e] rounded-lg p-2 hover:shadow-md transition w-full h-full absolute top-0 left-0 flex justify-end items-start">
                        <div className="flex flex-col space-y-2">
                          {/* <button
                              //   onClick={(e) => {
                              //   e.stopPropagation();
                              //   setIsEditing(true);
                              //   setVisible(true);
                              //   handleEdit(data.id);
                              // }}
                          className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded shadow-sm transition">
                            Edit
                          </button>
                          <button 
                                //   onClick={(e) => {
                                //   e.stopPropagation();
                                //   handleDelete(data.id);
                                // }}
                          className="text-sm font-semibold bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded shadow-sm transition">
                            Delete
                          </button> */}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Button */}
      {/* <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-red-600 transition">
        +
      </button> */}
      {/* <Password/> */}
    </div>
  );
}

export default allitems;
