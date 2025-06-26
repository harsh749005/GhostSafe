"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import {useUser} from '../context/UserContext'
export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [visibility,setVisibility] = useState(false);
    const {user } = useUser();
    const handleLogOut = async () =>{
      const response = await axios.get("/api/logout");
      console.log(response);
      window.location.href = "/login";
    }
    // useEffect(()=>{
    //   console.log(user);
    // },[user])

  return (
    <header
      className=" border-b p-3 md:p-4"
      style={{
        backgroundColor: "var(--background)",
        borderBottom: "2px solid #2b2b2b",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 max-w-2xl">
          <h1 className="text-[#dededb] text-[12px] md:text-xl font-bold mr-8">GhostSafe</h1>
          {/* <div className="flex-1 relative">
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
            <img
              src="/images/search-2-line.svg"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 "
            />
          </div> */}
        </div>
        {/* Profile pic */}
        <div className="flex items-center space-x-4">
          {/* <button className="p-2 hover:bg-zinc-100 rounded-lg">
                <span className="text-zinc-600">🔄</span>
              </button> */}
          <div
            onMouseEnter={() => setVisibility(true)}
            className=" w-6 h-6 md:w-10 md:h-10 object-cover  md:rounded-lg"
          >
            <img
              src="/images/nature.png"
              alt=""
              className="w-full h-full md:rounded-lg rounded-[5px]"
            />
            {/* <span className="text-zinc-600">👤</span> */}

            {/* more options */}
            {visibility && (
              <div
                onMouseEnter={() => setVisibility(true)}
                onMouseLeave={() => setVisibility(false)}
                style={{ backgroundColor: "var(--background)" }}
                className="absolute right-4 mt-2 w-64 rounded-md shadow-lg  ring-1 ring-[#2b2b2b] ring-opacity-5 text-[#B0B0B0] z-50"
              >
                <div className="px-4 py-3 border-b border-zinc-700">
                  <p className="text-sm font-semibold">{user ? user.name :"Harsh Patel"}</p>
                  <p className="text-sm text-zinc-400">
                    {
                    user ? (user.email):"patelharsh749005@gmail.com"
                  }
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
                  <button onClick={handleLogOut} className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-800 text-red-400 font-medium cursor-pointer">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
