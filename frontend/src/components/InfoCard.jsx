"use client"

import { motion } from "framer-motion"

const InfoCard = ({ title, value, icon: Icon, color = "red" }) => {
  const getGradient = () => {
    switch (color) {
      case "red":
        return "from-red-500 to-orange-500"
      case "blue":
        return "from-blue-500 to-cyan-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      case "yellow":
        return "from-yellow-500 to-amber-500"
      default:
        return "from-red-500 to-orange-500"
    }
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getGradient()}`}></div>
      <div className="flex items-center justify-center mb-3">
        {Icon && (
          <div className={`p-3 rounded-full bg-${color}-50 dark:bg-${color}-900/20`}>
            <Icon className={`w-6 h-6 text-${color}-500 dark:text-${color}-400`} />
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-2">{value}</h2>
    </motion.div>
  )
}

export default InfoCard
