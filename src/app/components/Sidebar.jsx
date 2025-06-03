import Link from 'next/link';
import { useState } from "react";

export default function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState("all-items");

  const sidebarItems = [
    // { id: "start", label: "Start & Explore", icon: "🚀" },
    {
      id: "all-items",
      label: "All Items",
      icon: "📋",
      img: "/images/vault-solid.svg",
    },
    // { id: "sharing", label: "Sharing Center", icon: "👥" },
    {
      id: "passwords",
      label: "Passwords",
      icon: "🔑",
      img: "/images/lock-password-line.svg",
    },
    { id: "notes", label: "Notes", icon: "📝", img: "/images/pages-line.svg" },
    {
      id: "addresses",
      label: "Addresses",
      icon: "📍",
      img: "/images/address.svg",
    },
    {
      id: "payment",
      label: "Payment Cards",
      icon: "💳",
      img: "/images/wallet-2-line.svg",
    },
    {
      id: "bank",
      label: "Bank Accounts",
      icon: "🏦",
      img: "/images/bank-line.svg",
    },
    // { id: "security", label: "Security Dashboard", icon: "🛡️" },
    // { id: "emergency", label: "Emergency Access", icon: "🚨" },
    {
      id: "settings",
      label: "Account Settings",
      icon: "⚙️",
      img: "/images/settings-4-fill.svg",
    },
    // { id: "advanced", label: "Advanced Options", icon: "🔧" },
    { id: "help", label: "Help", icon: "❓", img: "/images/question-fill.svg" },
  ];
  return (
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
        <h2 className="text-[#B0B0B0] font-medium text-[12px] mb-4">ACCOUNT</h2>
        {sidebarItems.map((item) => (
          <Link href={"/"+item.id}
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
          </Link>
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
  );
}
