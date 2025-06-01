"use client"
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all-items');

  const sidebarItems = [
    { id: 'start', label: 'Start & Explore', icon: '🚀' },
    { id: 'all-items', label: 'All Items', icon: '📋' },
    { id: 'sharing', label: 'Sharing Center', icon: '👥' },
    { id: 'passwords', label: 'Passwords', icon: '🔑' },
    { id: 'notes', label: 'Notes', icon: '📝' },
    { id: 'addresses', label: 'Addresses', icon: '📍' },
    { id: 'payment', label: 'Payment Cards', icon: '💳' },
    { id: 'bank', label: 'Bank Accounts', icon: '🏦' },
    { id: 'security', label: 'Security Dashboard', icon: '🛡️' },
    { id: 'emergency', label: 'Emergency Access', icon: '🚨' },
    { id: 'settings', label: 'Account Settings', icon: '⚙️' },
    { id: 'advanced', label: 'Advanced Options', icon: '🔧' },
    { id: 'help', label: 'Help', icon: '❓' },
  ];

  return (
    <div className="min-h-screen flex" style={{backgroundColor:"var(--background)"}}>
      {/* Sidebar */}
      <div className="w-64  text-white p-4 flex flex-col" style={{backgroundColor:"var(--sidebar)"}}>
        <div className="flex items-center mb-8">
          <button className="text-sm text-zinc-300 hover:text-white flex items-center">
            <span className="mr-2">←</span> Collapse
          </button>
        </div>

        <nav className="flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}
              className={`w-full text-left px-4 py-2 rounded-lg mb-1 flex items-center ${
                selectedCategory === item.id
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-300 hover:bg-zinc-700/50'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
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
        <header className="bg-white border-b border-zinc-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 max-w-2xl">
              <h1 className="text-red-500 text-xl font-bold mr-8">LastPass</h1>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="search my vault"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-50 rounded-lg border border-zinc-200 focus:outline-none focus:border-zinc-300"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  🔍
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-zinc-100 rounded-lg">
                <span className="text-zinc-600">🔄</span>
              </button>
              <button className="p-2 hover:bg-zinc-100 rounded-lg">
                <span className="text-zinc-600">👤</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">All Items</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-zinc-100 rounded-lg">
                <span className="text-zinc-600">🔍</span>
              </button>
              <button className="p-2 hover:bg-zinc-100 rounded-lg">
                <span className="text-zinc-600">📋</span>
              </button>
              <select className="px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm">
                <option>Folder (a-z)</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Social (2)</h3>
              <span className="text-sm text-zinc-500">↓</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Sample Items */}
              <div className="border border-zinc-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                    🔒
                  </div>
                  <div>
                    <h4 className="font-medium">harsh</h4>
                    <p className="text-sm text-zinc-500">xyz</p>
                  </div>
                </div>
              </div>

              <div className="border border-zinc-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-zinc-200">
                    <img
                      src="https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico"
                      alt="Instagram"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Instagram</h4>
                    <p className="text-sm text-zinc-500">harshpatel2641</p>
                  </div>
                </div>
              </div>
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