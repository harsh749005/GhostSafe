"use client";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
function App() {

  useEffect(()=>{
    window.location.href = "/allitems";
  },[])
  return (
    <div 
      className="min-h-screen flex relative"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Sidebar */}
      <Sidebar/>


      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
       <Navbar/>

        {/* Content */}
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-xl font-semibold text-[#dededb]"
              style={{ fontFamily: "Inter" }}
            >
              All Items
            </h2>
            {/* <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-zinc-100 rounded-lg">
                <span className="text-zinc-600">🔍</span>
              </button>
              <button className="p-2 hover:bg-zinc-100 rounded-lg">
                <span className="text-zinc-600">📋</span>
              </button>
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
            className=" rounded-lg shadow p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#B0B0B0] text-2xl">Social </h3>
              {/* <span className="text-sm text-zinc-500">↓</span> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
