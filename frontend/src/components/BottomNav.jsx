// src/components/BottomNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, AlertTriangle, Search, HandHeart, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";


const BottomNav = () => {
  const location = useLocation();
    const {user} = useAuth();
    
  const navItems = [
  { path: "/", label: "Home", icon: <Home size={20} /> },
  { path: "/disaster-alerts", label: "Alerts", icon: <AlertTriangle size={20} /> },
  { path: "/seek-resources", label: "Seek", icon: <Search size={20} /> },
  { path: "/provide-resources", label: "Help", icon: <HandHeart size={20} /> },
  ...(user ? [{ path: "/profile", label: "Profile", icon: <User size={20} /> }] : []),
];


  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-inner border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center text-xs font-medium ${
              location.pathname === item.path
                ? "text-red-500"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
