"use client";

import { useEffect, useState, } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Coins,
  MapPin,
  Bell,
  LogOut,
  HandHeart,
  PlusCircle,
  AlertTriangle,
  Star,
} from "lucide-react";

const Profile = () => {

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [coinCount, setCoinCount] = useState(0);
  const [location, setLocation] = useState({ city: "Loading...", region: "", country: "" });
  const [notifEnabled, setNotifEnabled] = useState(true);


    // Redirect if not logged in
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        if (user?.email) {
          const res = await fetch(`https://dm-backend-auge.onrender.com/api/coin/get-coins/${user.email}`);
          const data = await res.json();
          setCoinCount(data.coins || 0);
          console.log("username: ",user.name)
        } else {
          const guestCoins = localStorage.getItem("guestCoins");
          if (guestCoins) setCoinCount(Number(guestCoins));
        }
      } catch (err) {
        console.error("Failed to fetch coins:", err);
      }
    };

    if(user) fetchCoins();
  }, [user]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
            .then((res) => res.json())
            .then((data) => {
              setLocation({
                city: data.city || "Unknown",
                region: data.region || "",
                country: data.country || "",
              });
            })
            .catch(() => {
              setLocation({ city: "Unknown", region: "", country: "" });
            });
        },
        () => {
          setLocation({ city: "Location Denied", region: "", country: "" });
        }
      );
    } else {
      setLocation({ city: "Geolocation Not Supported", region: "", country: "" });
    }
  }, []);

  const toggleNotifications = () => {
    setNotifEnabled(!notifEnabled);
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/login");  // logout ke baad bhi login page redirect
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Agar user null hai to koi UI render mat karo (ya spinner laga sakte ho)
  if (!user) return null;
  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-br bg-gray-50 dark:bg-[#0d1117] py-10 px-2 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Side Glow Circles */}
      <div className="absolute top-0 left-[-10px] w-60 h-60 bg-orange-500 opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-[0px] w-60 h-60 bg-yellow-400 opacity-20 rounded-full blur-3xl" />

      <div className="dark:bg-transparent bg-opacity-90 rounded-2xl p-10 max-w-3xl w-full shadow-2xl border border-yellow-600 space-y-10 z-10">

        {/* User Info */}
        <section className="flex items-center space-x-6 md:space-x-10">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full w-24 h-24 flex items-center justify-center text-black text-5xl font-bold shadow-md">
            {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl dark:text-yellow-400 font-bold">{user?.name}</h2>
            <p className="text-orange-500 dark:text-yellow-300 text-sm mt-1">{user?.email || "guest@example.com"}</p>
            <div className="flex items-center mt-2 text-orange-500 dark:text-yellow-200 text-sm">
              <MapPin size={18} />
              <span className="ml-2">{location.city}, {location.region} {location.country}</span>
            </div>
          </div>
        </section>

        {/* Coin Wallet */}
        <section className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between shadow-lg border border-yellow-300 gap-4">
          <div className="flex items-center gap-4">
            <Coins size={40} className="text-black" />
            <div>
              <p className="text-4xl font-extrabold text-black">{coinCount}</p>
              <p className="uppercase text-sm font-semibold text-black">Coins Earned</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 text-orange-500 bg-white dark:bg-black dark: dark:text-yellow-400 dark:hover:bg-yellow-400 hover:text-black px-5 py-3 rounded-lg font-semibold transition"
            onClick={() => alert("Feature coming soon!")}
          >
            <PlusCircle size={20} /> Add Coins
          </button>
        </section>

        {/* Notifications */}
        <section className="flex items-center justify-between shadow-lg dark:bg-[#363636] rounded-xl p-5 border border-yellow-700">
          <div className="flex items-center space-x-4">
            <Bell size={24} className=" dark:text-yellow-400" />
            <div>
              <h3 className="text-xl font-semibold text-orange-500 dark:text-yellow-400">Notifications</h3>
              <p className="text-sm text-orange-300 dark:text-yellow-400">
                {notifEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notifEnabled}
              onChange={toggleNotifications}
            />
            <div className="w-10 h-6 bg-gray-800 border-green peer-focus:outline-none rounded-full peer peer-checked:bg-yellow-400 transition-all"></div>
            <span className="ml-1 text-sm font-medium  dark:text-yellow-200">
              {notifEnabled ? "ON" : "OFF"}
            </span>
          </label>
        </section>

        {/* Contribute Section */}
        <section className="shadow-xlg textbg-[#292929] rounded-xl p-6 dark:text-yellow-400 border border-yellow-700 space-y-4">
          <div className="flex items-center space-x-3">
            <HandHeart size={28} className="text-yellow-500 dark:text-yellow-400" />
            <h2 className="text-2xl font-bold">Contribute & Earn Coins</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-orange-100 dark:bg-yellow-100 bg-opacity-10 p-4 rounded-lg flex items-center gap-3">
              <AlertTriangle className="text-orange-400" />
              <span>Report verified local disasters</span>
            </div>
            <div className="bg-orange-100 dark:bg-yellow-100 bg-opacity-10 p-4 rounded-lg flex items-center gap-3">
              <HandHeart className="text-pink-400" />
              <span>Help by providing useful resources</span>
            </div>
            <div className="bg-orange-100 dark:bg-yellow-100 bg-opacity-10 p-4 rounded-lg flex items-center gap-3">
              <Coins className="text-green-400" />
              <span>Earn coins & unlock features</span>
            </div>
            <div className="bg-orange-100 dark:bg-yellow-100 bg-opacity-10 p-4 rounded-lg flex items-center gap-3">
              <Star className="text-yellow-300" />
              <span>Get recognized on leaderboard</span>
            </div>
          </div>

          <button
            onClick={() => window.location.assign("/provide-resources")}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md px-6 py-3 shadow-md"
          >
            Go to Provide Resources
          </button>
        </section>

        {/* Logout */}
        {user && (
          <section>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-yellow-200 font-bold py-3 rounded-md shadow-md"
            >
              <LogOut size={20} />
              Logout
            </button>
          </section>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
