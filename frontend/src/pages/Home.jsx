import React, { useState, useEffect } from "react";
import { AlertTriangle, MapPin, Wind, Users } from "lucide-react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import SearchBar from "../components/SearchBar";
import ContributeAndEarn from "../components/ContributeAndEarn";
import DisasterFeed from "../components/DisasterFeed";


Modal.setAppElement("#root");

const Home = () => {
  const [disasters, setDisasters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [locationDetails, setLocationDetails] = useState("");
  const [invalidCountry, setInvalidCountry] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  const handleLocationFound = (input) => {
    setLocationDetails(input);
    setCountryName(input);
  };

  useEffect(() => {
    const fetchDisasters = async () => {
      setIsLoading(true);
      setInvalidCountry(false);
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

        if (!data.data || data.data.length === 0) {
          if (countryName) setInvalidCountry(true);
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
        setInvalidCountry(true);
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white"
        >
          DisasterAlert – Stay Aware. Stay Safe.
        </motion.h1>

      {/* Disaster Feed 
      <DisasterFeed /> */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-gray-600 dark:text-gray-400 mb-10 text-lg"
        >
          Real-time alerts and reliable safety insights during emergencies.
        </motion.p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg p-5 transition duration-200"
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>


        {/* Search */}
        <SearchBar onLocationFound={handleLocationFound} />

        {/* Disaster Section */}
        <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-800 dark:text-white">
          {countryName ? `Recent Disasters in ${countryName}` : "Recent Global Disasters"}
        </h2>

        {/* Conditional States */}
        {isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading latest updates...</p>
        ) : invalidCountry ? (
          <p className="text-red-600 font-medium text-center">
            Invalid country name or no disasters found for "{countryName}"
          </p>
        ) : disasters.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No disaster data found.</p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {disasters.slice(0, 6).map((disaster) => (
                <motion.div
                  key={disaster.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition relative"
                >
                  <div className="absolute top-3 right-5 text-xs text-gray-500 dark:text-gray-400">
                    {disaster.date}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                      {disaster.status}
                    </span>
                    <span className="text-sm text-red-600 dark:text-blue-400">
                      {disaster.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {disaster.name}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    <strong>Location:</strong> {disaster.country}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">
                    {disaster.description.slice(0, 150)}...
                  </p>
                  <button
                    onClick={() => setSelectedDisaster(disaster)}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read More
                  </button>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-6">
              <button
                onClick={() => setModalIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full transition"
              >
                View All Disasters
              </button>
            </div>
            {/* Contribution Section */}
<div className="p-2">
  <ContributeAndEarn />
</div>

          </>
        )}

        {/* Disaster Details Modal */}
        <Modal
  isOpen={!!selectedDisaster}
  onRequestClose={() => setSelectedDisaster(null)}
  contentLabel="Disaster Details"
  className="bg-[#fefcf8] dark:bg-[#10111b] font-sans leading-relaxed max-w-2xl mx-auto mt-20 p-0 rounded-sm outline-none text-gray-800 dark:text-gray-200 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] border border-gray-300 dark:border-gray-700 relative max-h-[80vh] overflow-y-auto"
  overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
>
  {selectedDisaster && (
    <div className="p-8">
      {/* Close Button */}
      <button
        onClick={() => setSelectedDisaster(null)}
        className="absolute top-3 right-5 text-red-500 hover:text-red-700 text-xl"
      >
        ✕
      </button>

      {/* Content */}
      <h2 className="text-3xl font-bold  mb-4">
        {selectedDisaster.name}
      </h2>
      <p className="mb-2"><strong>Type:</strong> {selectedDisaster.type}</p>
      <p className="mb-2"><strong>Status:</strong> {selectedDisaster.status}</p>
      <p className="mb-2"><strong>Country:</strong> {selectedDisaster.country}</p>
      <p className="mb-2"><strong>Date:</strong> {selectedDisaster.date}</p>
      <p className="mt-4 text-justify text-sm text-gray-700 dark:text-gray-300">
        {selectedDisaster.description}
      </p>
    </div>
  )}
</Modal>


        {/* All Disasters Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="All Disasters"
          className="bg-[#fefcf8] dark:bg-[#10111b] font-sans leading-relaxed max-w-2xl mx-auto mt-20 p-8 rounded-sm outline-none text-gray-800 dark:text-gray-200 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] border border-gray-300 dark:border-gray-700 relative"
          overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm  z-50"
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
              <div
                key={disaster.id}
                className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4"
              >
                <p><strong>Name:</strong> {disaster.name}</p>
                <p><strong>Type:</strong> {disaster.type}</p>
                <p><strong>Status:</strong> {disaster.status}</p>
                <p><strong>Country:</strong> {disaster.country}</p>
                <p><strong>Date:</strong> {disaster.date}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{disaster.description}</p>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
