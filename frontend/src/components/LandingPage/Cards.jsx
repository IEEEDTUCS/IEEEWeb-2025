import React from "react";
import { motion } from "framer-motion";

export default function Cards({ image, name, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="w-80 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
    >
      <div className="w-full h-72 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="mt-2 text-gray-600">{desc}</p>
      </div>
    </motion.div>
  );
}


