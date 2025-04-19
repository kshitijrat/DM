"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Card = ({ image, title, description, restricted, link, icon: Icon }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:shadow-2xl w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
        </div>
        {Icon && (
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md">
            <Icon className="w-6 h-6 text-red-500" />
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
        <Link
          to={link}
          className={`mt-4 inline-block px-4 py-2 rounded-lg text-white w-full text-center transition-all duration-300 ${
            restricted
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
          }`}
        >
          {restricted ? "Login Required" : "Explore"}
        </Link>
      </div>
    </motion.div>
  )
}

export default Card
