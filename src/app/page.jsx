"use client";
import { useState } from "react";
import logo from "../../public/images/nature.png";
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all-items");

  const sidebarItems = [
    // { id: "start", label: "Start & Explore", icon: "🚀" },
    { id: "all-items", label: "All Items", icon: "📋",img:"/images/vault-solid.svg" },
    // { id: "sharing", label: "Sharing Center", icon: "👥" },
    { id: "passwords", label: "Passwords", icon: "🔑",img:"/images/lock-password-line.svg" },
    { id: "notes", label: "Notes", icon: "📝",img:"/images/pages-line.svg" },
    { id: "addresses", label: "Addresses", icon: "📍",img:"/images/address.svg" },
    { id: "payment", label: "Payment Cards", icon: "💳",img:"/images/wallet-2-line.svg" },
    { id: "bank", label: "Bank Accounts", icon: "🏦",img:"/images/bank-line.svg" },
    // { id: "security", label: "Security Dashboard", icon: "🛡️" },
    // { id: "emergency", label: "Emergency Access", icon: "🚨" },
    { id: "settings", label: "Account Settings", icon: "⚙️",img:"/images/settings-4-fill.svg" },
    // { id: "advanced", label: "Advanced Options", icon: "🔧" },
    { id: "help", label: "Help", icon: "❓",img:"/images/question-fill.svg" },
  ];
  const [hoveredIndex, setHoverIndex] = useState(null);
  const [visibility,setVisibility] = useState(false);
  return (
    <div onMouseLeave={()=>setVisibility(false)}
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Sidebar */}
      <div
        className="w-64  text-white p-4 flex flex-col"
        style={{
          backgroundColor: "var(--sidebar)",
          borderRight: "2px solid #2b2b2b",
        }}
      >
        <div className="flex items-center mb-8">
          <button className="text-sm text-zinc-300 hover:text-white flex items-center">
            {/* <span className="mr-2">←</span> Collapse */}
          </button>
        </div>

        <nav className="flex-1 ">
          <h2 className="text-[#B0B0B0] font-medium text-[12px] mb-4">
            ACCOUNT
          </h2>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}
              className={`w-full text-left px-4 py-2 rounded-lg mb-1 flex items-center font-medium ${
                selectedCategory === item.id
                  ? "bg-[#2a2929] text-white"
                  : "text-zinc-300 hover:bg-zinc-700/50"
              }`}
            >
              <img className="w-4 h-4 mr-2" src={item.img} alt="" />
              {/* <span className="mr-3">{item.icon}</span> */}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-zinc-700">
          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>27 days left in trial</span>
            <button className="px-3 py-1 bg-zinc-700 rounded-full hover:bg-zinc-600 text-white">
              Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header
          className=" border-b  p-4"
          style={{
            backgroundColor: "var(--background)",
            borderBottom: "2px solid #2b2b2b",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 max-w-2xl">
              <h1 className="text-[#dededb] text-xl font-bold mr-8">
                GhostSafe
              </h1>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="search my vault"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-zinc-300"
                  style={{
                    backgroundColor: "var(--background)",
                    border: "2px solid #2b2b2b",
                    color: "#dededb",
                  }}
                />
                <img src="/images/search-2-line.svg" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 "/>
               
              </div>
            </div>
{/* Profile pic */}
            <div className="flex items-center space-x-4">
              {/* <button className="p-2 hover:bg-zinc-100 rounded-lg">
                <span className="text-zinc-600">🔄</span>
              </button> */}
              <div onMouseEnter={()=>setVisibility(true)}   className=" w-10 h-10 object-cover rounded-lg">
                <img
                  src="/images/nature.png"
                  alt=""
                  className="w-full h-full rounded-lg"
                  />
                {/* <span className="text-zinc-600">👤</span> */}
                
                  {/* more options */}
                  {
                    visibility &&(

                <div onMouseEnter={()=>setVisibility(true)} onMouseLeave={()=>setVisibility(false)}
                  style={{ backgroundColor: "var(--background)" }}
                  className="absolute right-4 mt-2 w-64 rounded-md shadow-lg  ring-1 ring-[#2b2b2b] ring-opacity-5 text-[#B0B0B0] z-50"
                >
                  <div className="px-4 py-3 border-b border-zinc-700">
                    <p className="text-sm font-semibold">Harsh Patel</p>
                    <p className="text-sm text-zinc-400">
                      patelharsh749005@gmail.com
                    </p>
                  </div>

                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-800">
                      Account settings
                    </button>
                    <div className="relative group">
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-800">
                        Theme: <span className="text-zinc-400">System</span>
                      </button>
                      {/* Optional submenu */}
                      {/* <div className="absolute left-full top-0 mt-0 hidden group-hover:block">
                ...
              </div> */}
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-800 text-red-400 font-medium cursor-pointer">
                      Logout
                    </button>
                  </div>
                </div>
                    )
                  }
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-xl font-semibold text-[#dededb]"
              style={{ fontFamily: "Inter" }}
            >
              All Items
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
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
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
                        Instagram
                      </h4>
                      <p className="text-sm text-[#B0B0B0]">harshpatel2641</p>
                    </div>
                  </div>
                  {hoveredIndex === index && (
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
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Add Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-red-600 transition">
        +
      </button>
    </div>
  );
}

export default App;
