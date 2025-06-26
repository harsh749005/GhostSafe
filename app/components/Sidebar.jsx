import Link from 'next/link';
import { useState } from "react";

export default function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState("all-items");

  const sidebarItems = [
    // { id: "start", label: "Start & Explore", icon: "🚀" },
    {
      id: "allitems",
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
      id: "paymentinfo",
      label: "Payment Cards",
      icon: "💳",
      img: "/images/wallet-2-line.svg",
    },
    {
      id: "bankaccountinfo",
      label: "Bank Accounts",
      icon: "🏦",
      img: "/images/bank-line.svg",
    },
    // { id: "security", label: "Security Dashboard", icon: "🛡️" },
    // { id: "emergency", label: "Emergency Access", icon: "🚨" },
    {
      id: "settingspage",
      label: "Account Settings",
      icon: "⚙️",
      img: "/images/settings-4-fill.svg",
    },
    // { id: "advanced", label: "Advanced Options", icon: "🔧" },
    // { id: "help", label: "Help", icon: "❓", img: "/images/question-fill.svg" },
  ];
  return (
    <div
      className="w-28 md:w-64  text-white p-4 flex flex-col"
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
        <h2 className="text-[#B0B0B0] font-medium text-[10px] md:text-[16px] mb-4  ">ACCOUNT</h2>
        {sidebarItems.map((item) => (
          <Link href={"/"+item.id}
            key={item.id}
            onClick={() => setSelectedCategory(item.id)}
            className={`text-[8px] py-1 px-1  md:text-[16px] w-full text-left md:px-4 md:py-2 rounded-sm md:rounded-lg mb-1 flex items-center font-medium ${
              selectedCategory === item.id
                ? "bg-[#2a2929] text-white"
                : "text-zinc-300 hover:bg-zinc-700/50"
            }`}
          >
            <img className="w-2 h-2 mr-1 md:w-4 md:h-4 md:mr-2" src={item.img} alt="" />
            {/* <span className="mr-3">{item.icon}</span> */}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-2 md:pt-4 border-t border-zinc-700">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between text-[8px] md:text-sm text-zinc-400">
          <span>27 days left in trial</span>
          <button className="px-3 py-1 bg-zinc-700 rounded-full hover:bg-zinc-600 text-white">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
