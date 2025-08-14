"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

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

  return (
    <nav className="bg-white dark:bg-zinc-800 shadow p-4 flex items-center justify-between">
      <div className="flex gap-6 overflow-x-auto">
        {menuItems.map((item) => (
          <button
            key={item}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 whitespace-nowrap"
          >
            {item}
          </button>
        ))}
      </div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full bg-gray-200 dark:bg-zinc-700"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
}
