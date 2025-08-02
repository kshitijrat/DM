"use client";

import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Home, Utensils, Pill, Bus, Trash } from "lucide-react";
import { toast } from "../components/ui/Toaster";
import CountryCodePicker from "../components/CountryCodePicker";
import { useAuth } from "../context/AuthContext";
import SignupPromptDialog from "../components/ui/SignupPromptDialog";


const ProvideResources = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    resourceType: "shelter",
    quantity: "",
    availability: "immediate",
    description: "",
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("provide");
  const [seekData, setSeekData] = useState([]);

  const { user } = useAuth() // null if not logged in

  const [showDialog, setShowDialog] = useState(false);

  const iconMap = {
    shelter: Home,
    food: Utensils,
    medical: Pill,
    transport: Bus,
    other: Home,
  };

  const fetchSeekResources = async () => {
    try {
      const res = await axios.get("https://dm-backend-auge.onrender.com/api/seek/seek-resource");
      setSeekData(res.data || []);
    } catch (error) {
      console.error("Failed to fetch seek resources:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "requests") {
      fetchSeekResources();
    }
  }, [activeTab]);

  const isValidPhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, "");
    const countryCodeLength = countryCode.replace(/\D/g, "").length;
    const localNumber = digitsOnly.slice(countryCodeLength);
    return localNumber.length === 10 && /^\+\d{1,4}[0-9]+$/.test(phone);
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullPhone = `${countryCode}${formData.phone}`;

    if (!isValidPhone(fullPhone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone must have exactly 10 digits after country code.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/provide/add-resource", {
        ...formData,
        phone: fullPhone,
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        resourceType: "shelter",
        quantity: "",
        availability: "immediate",
        description: "",
      });

      toast({
        title: "Offer Submitted!",
        description: "Your offer has been submitted successfully.",
        action: {
          label: "Okay",
          onClick: () => console.log("Okay!"),
        },
      });

      if (!user) {
        setShowDialog(true); // 👈 Show dialog if user is NOT authenticated
      }

    } catch (err) {
      console.error(err);
      alert("error: ",{err});
      toast({
        title: "Submission Failed",
        description: err.response?.data?.error || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTrash = async (id) => {
    let admin_id = prompt("Enter Admin Id");
    if (admin_id == 111) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/seek/delete-resource/${id}`);
        alert(response.data.message);
        alert("Deleted successfully");
      } catch (error) {
        alert("Failed to delete resource");
        console.error(error);
      }
    } else {
      alert("Invalid Admin Id");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] py-12 px-4 overflow-x-hidden">
        <h1 className="text-3xl dark:text-white font-bold text-center mb-2">Provide Resources</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
          Help others by offering food, shelter, and medical aid during emergencies.
        </p>

        <div className="flex justify-center mb-10">
          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === "provide"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
              } mr-4`}
            onClick={() => setActiveTab("provide")}
          >
            Provide Resources
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === "requests"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
              }`}
            onClick={() => setActiveTab("requests")}
          >
            View Requests
          </button>
        </div>

        {activeTab === "provide" ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto  p-8 rounded-xl border shadow-2xl space-y-6"
          >
            <h2 className="text-xl font-semibold text-center dark:text-white mb-2">
              Resource Contribution Form
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-transparent dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
                required
              />

              <div className="flex gap-2 w-full">
                <div className="w-1/2 border border-gray-300 dark:border-gray-600 rounded px-4 py-2">
                  <CountryCodePicker
                    onSelect={(country) => setCountryCode(country.dial_code)}
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })
                  }
                  className="w-1/2 bg-transparent dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2"
                  required
                />
              </div>

              <input
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-transparent dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Enter the resource location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-transparent dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.resourceType}
                onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                className="bg-transparent dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
                required
              >
                <option value="shelter" className="dark:bg-gray-900">Shelter</option>
                <option value="food" className="dark:bg-gray-900">Food & Water</option>
                <option value="medical" className="dark:bg-gray-900">Medical Aid</option>
                <option value="transport" className="dark:bg-gray-900">Transportation</option>
              </select>

              <input
                type="text"
                placeholder="e.g., 10 meals, space for 5 people"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="bg-transparent dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
                required
              />
            </div>

            <select
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="bg-transparent dark:text-white border border-gray-400 dark:border-gray-600 rounded px-4 py-2 w-full"
            >
              <option value="immediate" className="dark:bg-gray-900">Immediate</option>
              <option value="within24" className="dark:bg-gray-900">Within 24 hours</option>
              <option value="within48" className="dark:bg-gray-900">Within 48 hours</option>
              <option value="flexible" className="dark:bg-gray-900">Flexible</option>
            </select>

            <textarea
              placeholder="Additional info about your resource..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-transparent dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full"
              rows={4}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${loading ? "bg-gray-400 dark:bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Processing..." : "Submit Offer"}
            </button>
          </form>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Current Requests</h2>
            {seekData.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400">No requests found.</p>
            ) : (
              seekData.map((req, index) => {
                const Icon = iconMap[req.resourceType] || Home;
                return (
                  <div
                    key={req._id || index}
                    className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-lg font-semibold dark:text-gray-300">{req.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{req.location}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {req.n_people} people — {req.urgency} urgency
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {req.description || "No notes"}
                    </p>
                    <Trash
                      onClick={() => handleTrash(req._id)}
                      className="w-8 h-8 text-red-500 cursor-pointer"
                      title="Delete Resource"
                    />
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <SignupPromptDialog open={showDialog} onClose={() => setShowDialog(false)} />


    </motion.div>


  );
};

export default ProvideResources;
