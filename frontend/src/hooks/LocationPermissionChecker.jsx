import { useEffect, useState } from "react";

const LocationPermissionChecker = () => {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      if (navigator.permissions) {
        try {
          const result = await navigator.permissions.query({ name: "geolocation" });
          if (result.state === "denied") {
            setShowDialog(true);
          } else {
            setShowDialog(false);
          }

          // Listen to permission changes
          result.onchange = () => {
            if (result.state === "denied") {
              setShowDialog(true);
            } else {
              setShowDialog(false);
            }
          };
        } catch (err) {
          console.error("Permission check error:", err);
        }
      } else {
        console.log("Permissions API not supported");
      }
    };

    checkPermission();

    // Keep checking every 200 seconds
    const interval = setInterval(checkPermission, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-80 z-50">
          <div className="bg-white dark:bg-black p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold mb-2 text-white">Location Permission Denied</h2>
            <p className="text-sm mb-4 text-gray-700 dark:text-gray-400">
              Please allow location access in your browser settings to get real time updates.
            </p>
            <button
              onClick={() => setShowDialog(false)}
              className="bg-red-300 text-red-800 px-2 py-1 rounded-lg border-1 border-red-600 hover:bg-red-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationPermissionChecker;
