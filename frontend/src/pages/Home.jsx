import React, { useState, useEffect } from "react";
import { AlertTriangle, MapPin, Wind, Users } from "lucide-react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import SearchBar from "../components/SearchBar";

Modal.setAppElement("#root");

const Home = () => {
  const [disasters, setDisasters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Location state as countryName only
  const [countryName, setCountryName] = useState("");  // Will hold country name from search input
  const [locationDetails, setLocationDetails] = useState("");

  // Handle location found from SearchBar (here just treat input as countryName)
  const handleLocationFound = (input) => {
    // Set locationDetails for showing search text below search bar
    setLocationDetails(input);
    setCountryName(input);
  };

  // Fetch disasters filtered by countryName (only if countryName exists)
  const [invalidCountry, setInvalidCountry] = useState(false);

  useEffect(() => {
    const fetchDisasters = async () => {
      setIsLoading(true);
      setInvalidCountry(false);  // reset on every fetch
      try {
        const baseUrl = "https://api.reliefweb.int/v1/disasters";
        const params = new URLSearchParams({
          limit: 10,
          sort: "date:desc",
          profile: "full",
          appname: "disasteralert",
        });

        if (countryName) {
          params.append("filter[field]", "country.name");
          params.append("filter[value]", countryName);
        }

        const url = `${baseUrl}?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        // Agar API se data nahi aaya ya empty array
        if (!data.data || data.data.length === 0) {
          if (countryName) {
            // Invalid ya no disasters for this country
            setInvalidCountry(true);
          }
          setDisasters([]);
          setIsLoading(false);
          return;
        }

        const parsed = data.data.map((item) => {
          const fields = item.fields;
          return {
            id: item.id,
            name: fields.name,
            country: fields.country?.[0]?.name || "Unknown",
            date: fields.date ? new Date(fields.date).toLocaleDateString() : "N/A",
            rawDate: fields.date || "N/A",
            type: fields.primary_type?.name || "Unknown",
            description: fields.description || "No description available",
            status: fields.status || "N/A",
          };
        });

        setDisasters(parsed);
      } catch (error) {
        console.error("Error fetching disasters:", error);
        setDisasters([]);
        setInvalidCountry(true);  // Treat error as invalid input here (optional)
      } finally {
        setIsLoading(false);
      }
    };

    fetchDisasters();
  }, [countryName]);



  const features = [
    {
      icon: <AlertTriangle className="h-10 w-10 text-red-500" />,
      title: "Real-time Alerts",
      description: "Get instant notifications about disasters in your area.",
    },
    {
      icon: <MapPin className="h-10 w-10 text-green-600" />,
      title: "Safe Zone Mapping",
      description: "Locate nearest safe zones during emergencies.",
    },
    {
      icon: <Wind className="h-10 w-10 text-blue-500" />,
      title: "Weather Monitoring",
      description: "Track weather conditions leading to disasters.",
    },
    {
      icon: <Users className="h-10 w-10 text-purple-600" />,
      title: "Community Support",
      description: "Connect with others during crisis situations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-6"
        >
          DisasterAlert – Stay Aware. Stay Safe.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-gray-400 mb-12 text-lg"
        >
          Empowering you with real-time alerts and safety insights to tackle emergencies effectively.
        </motion.p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* SearchBar and location details */}
        <div>
          <SearchBar onLocationFound={handleLocationFound} />
        </div>

        {/* Disaster Cards */}
        <h2 className="text-2xl font-semibold mb-4">
          {countryName
            ? `Recent Disasters in ${countryName}`
            : "Recent Global Disasters"}
        </h2>


        {isLoading ? (
          <p className="text-gray-400 text-center">Loading latest updates...</p>
        ) : invalidCountry ? (
          <p className="text-red-500 text-center font-semibold">
            Invalid country name or no disasters found for "{countryName}"
          </p>
        ) : disasters.length === 0 ? (
          <p className="text-gray-400 text-center">No disaster data found.</p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {disasters.slice(0, 6).map((disaster) => (
                <motion.div
                  key={disaster.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-md relative"
                >
                  <div className="text-xs text-gray-400 absolute top-2 right-4">
                    {disaster.date}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm bg-red-600 px-2 py-1 rounded-full">
                      {disaster.status}
                    </span>
                    <span className="text-sm text-blue-300">{disaster.type}</span>
                  </div>
                  <h3 className="text-lg font-bold text-red-400 mb-1">
                    {disaster.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-1">
                    <strong>Location:</strong> {disaster.country}
                  </p>
                  <p className="text-sm text-gray-400 italic">
                    {disaster.description.slice(0, 150)}...
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => setModalIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition"
              >
                View All Disasters
              </button>
            </div>
          </>
        )}

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="All Disasters Data"
          className="bg-gray-800 max-w-4xl mx-auto mt-20 p-6 rounded-lg outline-none text-white"
          overlayClassName="fixed inset-0 bg-black bg-opacity-60 z-50"
        >
          <h2 className="text-2xl font-semibold mb-4">All Recent Disasters</h2>
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-3 right-5 text-red-400 hover:text-red-600 text-xl"
          >
            ✕
          </button>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {disasters.map((disaster) => (
              <div key={disaster.id} className="border-b border-gray-600 pb-3 mb-3">
                <p><strong>Name:</strong> {disaster.name}</p>
                <p><strong>Type:</strong> {disaster.type}</p>
                <p><strong>Status:</strong> {disaster.status}</p>
                <p><strong>Country:</strong> {disaster.country}</p>
                <p><strong>Date:</strong> {disaster.date}</p>
                <p className="text-sm text-gray-300 mt-1">{disaster.description}</p>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
