import { Lightbulb, DollarSign, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ContributeAndEarn = () => {
  return (
    <motion.div
      className="bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800 border border-yellow-300 dark:border-yellow-600 rounded-2xl shadow-lg p-6 md:p-8 mt-10 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full shadow-md">
          <Star className="text-white w-6 h-6" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
          Contribute & Earn!
        </h2>
      </div>

      <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-4">
        Help communities by reporting local disasters, sharing ideas, or suggesting improvements — and earn rewards for your valuable contributions!
      </p>

      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
        <li className="flex items-center gap-2">
          <Lightbulb className="text-yellow-500 w-5 h-5" /> Share your unique ideas & features
        </li>
        <li className="flex items-center gap-2">
          <DollarSign className="text-green-600 w-5 h-5" /> Earn for verified local disaster alerts
        </li>
        <li className="flex items-center gap-2">
          <Star className="text-orange-500 w-5 h-5" /> Get featured as a top contributor!
        </li>
      </ul>

      <div className="flex justify-center">
        <Link to="/provide-resources"> {/* ✅ Wrap button inside Link */}
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-md hover:scale-105 transition">
            Start Contributing
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ContributeAndEarn;
