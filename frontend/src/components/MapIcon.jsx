import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkedAlt, FaTimesCircle } from 'react-icons/fa';
import NavigationMap from './NavigationMap';

const MapIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMap = () => setIsOpen(prev => !prev);

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={toggleMap}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-20 right-2 z-[60] p-3 rounded-full shadow-xl text-white transition-all ${
          isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        title={isOpen ? 'Close Map' : 'Open Map'}
      >
        {isOpen ? <FaTimesCircle size={22} /> : <FaMapMarkedAlt size={22} />}
      </motion.button>

      {/* Floating Map Display with NavigationMap (Live tracking) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="map"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-[105px] right-6 z-[45] shadow-2xl rounded-xl border overflow-hidden bg-white"
            style={{
              width: '280px',
              height: '200px',
              maxWidth: '90vw',
              maxHeight: '60vh',
            }}
          >
            <NavigationMap />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MapIcon;
