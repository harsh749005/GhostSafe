"use client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function PasswordManager() {
  return (
    <>
      <div
        className="min-h-screen flex relative"
        style={{ backgroundColor: "var(--background)" }}
      >
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Navbar />
        </div>
      </div>
    </>
  );
}
