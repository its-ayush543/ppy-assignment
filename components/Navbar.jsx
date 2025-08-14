"use client";
import { Search, Bell, User, LogOut } from "lucide-react";

const menuItems = [
  "CRM",
  "Utilities",
  "Insurance",
  "Assets",
  "Mutual",
  "Research",
  "Transact Online",
  "Goal GPS",
  "Financial Planning",
  "Wealth Report",
  "Other",
];

export default function Navbar() {
  return (
    <nav className="bg-[#e53935] shadow flex items-center px-4 py-2 justify-between">
      {/* Logo and search */}
      <div className="flex items-center gap-6">
        <img src="/file.svg" alt="Wealth Elite" className="h-8" />
        <div className="relative">
          <input
            type="text"
            placeholder="ex: Live portfolio"
            className="pl-10 pr-4 py-1 rounded-full bg-white text-gray-700 text-sm border border-gray-200 focus:outline-none"
            style={{ width: 180 }}
          />
          <Search className="absolute left-2 top-1.5 text-gray-400" size={16} />
        </div>
      </div>
      {/* Menu */}
      <div className="flex gap-2 flex-1 justify-center">
        {menuItems.map((item) => (
          <button
            key={item}
            className="text-white font-semibold px-3 py-1 rounded hover:bg-[#d32f2f] transition whitespace-nowrap text-xs"
          >
            {item}
          </button>
        ))}
      </div>
      {/* Icons and user */}
      <div className="flex items-center gap-4">
        <Bell className="text-white" size={18} />
        <User className="text-white" size={18} />
        <LogOut className="text-white" size={18} />
      </div>
    </nav>
  );
}
