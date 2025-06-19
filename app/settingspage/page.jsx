"use client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import PaymentCard from "../components/modules/PaymentCard";
import { useUser } from "../context/UserContext";
import axios from "axios";

export default function PaymentInfoManager() {
  const [hoveredIndex, setHoverIndex] = useState(null);
  const [visible, setVisible] = useState(null);
  const { user } = useUser();

  // const [lastName, setLastName] = useState('Patel');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [firstName, setFirstName] = useState(user?.name || "");
  const [email,setEmail] = useState(user?.email || "");
  useEffect(() => {
    // This runs only on the client side
    const userString = localStorage.getItem("user");
    const userObject = userString ? JSON.parse(userString) : null;

    if (userObject?.name !== firstName ||userObject?.email !== email ) {
      setFirstName(userObject.name);
      setEmail(userObject.email);
    } else {
      setFirstName(userObject.name);
       setEmail(userObject.email);
    }
  }, []);

  const changeName = async () => {
    const response = await axios.put("/api/profile/editData", {
      name: firstName,
      email:email
    });
    console.log(response);
    if(response.status === 200){
      window.location.href = "/login";
    }
    console.log(response);
    const userString = localStorage.getItem("user");
    const userObject = userString ? JSON.parse(userString) : {};

    userObject.name = firstName;
    userObject.email = email;
    console.log(userObject.name);
    console.log(userObject.email);
    window.location.reload();
    localStorage.setItem("user", JSON.stringify(userObject));
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
                Account Settings
              </h2>
            </div>

            <div
              // style={{
              //   backgroundColor: "var(--cardContainer)",
              //   border: "1px solid #2b2b2b",
              // }}
              className=" rounded-lg shadow p-4 flex flex-col gap-5"
            >
              {/* Personal Information Section */}
              <div className=" border border-[#2e2e2e] rounded-lg p-6 m-[auto] w-[650px]">
                <h2 className="text-xl font-medium mb-6 text-[#dedede]">
                  Personal information
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm mb-2 text-[#949494] font-medium">
                      First name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full  border-2 border-[#2e2e2e] rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                  {/* <div>
              <label className="block text-sm text-[#949494] mb-2 font-medium">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full  border-2 border-[#2e2e2e] rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
              />
            </div> */}
                </div>

                {/* <button
                  onClick={changeName}
                  className=" cursor-pointer font-medium bg-zinc-600 hover:bg-zinc-300 px-4 py-2 rounded text-sm transition-colors"
                >
                  Save
                </button> */}

                <div className="mt-8 ">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-[#949494] font-medium">
                      Email
                    </label>
                    {/* <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                      Change email
                    </button> */}
                  </div>
                  
                                      <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full  border-2 border-[#2e2e2e] rounded px-3 py-2 text-zinc-500 focus:outline-none focus:border-zinc-500"
                    />
{/* 
                  <div className="w-full  border-2 border-[#2e2e2e] rounded px-3 py-2  focus:outline-none focus:border-zinc-500">
                    {email}
                  </div> */}
                  
                  <button
                  onClick={changeName}
                  className="mt-5 cursor-pointer font-medium bg-zinc-600 hover:bg-zinc-300 px-4 py-2 rounded text-sm transition-colors"
                >
                  Save
                </button>

                </div>
              </div>

              {/* Sign-in Methods Section */}
              <div className=" border border-[#2e2e2e] rounded-lg p-6 m-[auto] w-[650px]">
                <h2 className="text-xl font-medium mb-6 text-[#dedede]">
                  Sign-in methods
                </h2>

                <div className="flex items-center justify-between border-2 border-[#2e2e2e] rounded px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-blue-600">G</span>
                    </div>
                    <span className="text-sm text-[#dedede]">{email}</span>
                  </div>
                  <button className="text-zinc-400 hover:text-white">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Set Password Section */}
              <div className="border border-[#2e2e2e] rounded-lg p-6 m-[auto] w-[650px]">
                <h2 className="text-xl font-medium mb-6 text-[#dedede]">
                  Set password
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#949494]  mb-2 font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full  border-2 border-[#2e2e2e] rounded px-3 py-2 pr-10 text-white focus:outline-none focus:border-zinc-500"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {showPassword ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#949494]  mb-2 font-medium">
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full  border-2 border-[#2e2e2e]  rounded px-3 py-2 pr-10 text-white focus:outline-none focus:border-zinc-500"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {showConfirmPassword ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>

                  <button className="cursor-pointer bg-white hover:bg-zinc-400 px-6 py-2 rounded text-black font-medium transition-colors">
                    Set Password
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
