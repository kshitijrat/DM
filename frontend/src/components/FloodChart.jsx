import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ReliefWebFloodChart = ({ language, latitude, longitude }) => {
  const [floodEvents, setFloodEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Translations
  const translations = {
    en: {
      title: "Recent Flood Alerts",
      noData: "No recent flood alerts nearby.",
      loading: "Loading flood data...",
      error: "Failed to fetch flood data.",
      location: "Location",
      date: "Date",
      severity: "Severity",
      source: "Source",
    },
    hi: {
      title: "हाल की बाढ़ की सूचनाएँ",
      noData: "नजदीक हाल की बाढ़ सूचनाएँ उपलब्ध नहीं हैं।",
      loading: "बाढ़ डेटा लोड हो रहा है...",
      error: "बाढ़ डेटा प्राप्त करने में विफल।",
      location: "स्थान",
      date: "तारीख",
      severity: "तीव्रता",
      source: "स्रोत",
    },
  };

  const t = translations[language] || translations.en;

  useEffect(() => {
    setLoading(true);
    setError(null);

    // ReliefWeb API search for flood events near location (within 200km)
    const query = {
      query: {
        bool: {
          must: [
            { term: { "fields.type": "Flood" } },
            { range: { "fields.date": { gte: "now-30d/d" } } },
            {
              geo_distance: {
                distance: "200km",
                location: { lat: latitude, lon: longitude },
              },
            },
          ],
        },
      },
      size: 10,
      sort: [{ "fields.date": { order: "desc" } }],
      fields: ["id", "fields.title", "fields.date", "fields.place", "fields.severity", "fields.source.name"],
    };

    fetch("https://api.reliefweb.int/v1/disasters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setFloodEvents(data.data);
        } else {
          setFloodEvents([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, [latitude, longitude]);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">{t.title}</h2>

      {loading && <p className="text-gray-500">{t.loading}</p>}
      {error && <p className="text-red-500">{t.error}: {error}</p>}

      {!loading && !error && floodEvents.length === 0 && (
        <p className="text-gray-500">{t.noData}</p>
      )}

      <ul className="space-y-4 max-h-72 overflow-y-auto">
        {floodEvents.map((event) => {
          const { id, fields } = event;
          return (
            <li key={id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
              <h3 className="font-semibold text-lg">{fields.title}</h3>
              <p><strong>{t.location}:</strong> {fields.place || "N/A"}</p>
              <p><strong>{t.date}:</strong> {new Date(fields.date).toLocaleDateString()}</p>
              <p><strong>{t.severity}:</strong> {fields.severity || "N/A"}</p>
              <p><strong>{t.source}:</strong> {fields.source?.name || "N/A"}</p>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default ReliefWebFloodChart;
