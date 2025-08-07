"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useRef, useEffect, useContext } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import DisasterAlerts from "./pages/DisasterAlerts"
import SeekResources from "./pages/SeekResources"
import ProvideResources from "./pages/ProvideResources"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import Navbar from "./components/Navbar"
import MapIcon from "./components/MapIcon"
import { AuthProvider } from "./context/AuthContext"
import { NotificationProvider } from "./components/NotificationContext" // ✅ Fix spelling if needed
import Profile from "./pages/Profile"
import { io } from "socket.io-client";
import LocationPermissionChecker from "./hooks/LocationPermissionChecker"
import useGeoTracker from "./hooks/useGeoTracker";
import { GeoProvider, GeoContext } from "./context/GeoContext";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext"

const App = () => {
  const [language, setLanguage] = useState("en")

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
  }

  const GeoTrackerWrapper = () => {
    const pathFromHook = useGeoTracker();
    const { setPath } = useContext(GeoContext);

    useEffect(() => {
      setPath(pathFromHook);
    }, [pathFromHook, setPath]);

    return null; // UI nahi dikhana
  };


  const socketRef = useRef(null);

  useEffect(() => {
    // Socket connection create karo yaha
    socketRef.current = io("https://dm-backend-auge.onrender.com", {
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected with ID:", socketRef.current.id);
    });

    socketRef.current.on("newAlert", (alert) => {
      console.log("New alert received:", alert);
      // Yahan apne alert state update kar sakte ho ya notification dikha sakte ho
    });

    // Cleanup on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);


  return (
    <AuthProvider>
      <NotificationProvider>
        <GeoProvider>
          <ThemeProvider>
            <GeoTrackerWrapper /> {/* Ye hook se tracking kar ke context me store karega */}
            <Router>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen">
                {/* <ModernNavbar onLanguageChange={handleLanguageChange} /> */}
                <Navbar />
                <LocationPermissionChecker />
                <div className="flex-grow pt-16">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/disaster-alerts" element={<DisasterAlerts />} />
                    <Route path="/seek-resources" element={<SeekResources />} />
                    <Route path="/provide-resources" element={<ProvideResources />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                  <MapIcon />
                </div>
                <Footer language={language} />
              </div>
            </Router>
          </ThemeProvider>
        </GeoProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
