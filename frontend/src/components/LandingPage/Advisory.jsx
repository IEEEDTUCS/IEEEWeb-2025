import React from "react";
import { motion } from "framer-motion";
import Cards from "./Cards";

export default function Advisory() {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 ring-1 ring-gray-200
      px-6 md:px-16 lg:px-24 py-24 overflow-hidden relative rounded-[2rem] shadow-2xl"
    >
      {/* Decorative Background Blobs */}
      <div className="absolute -top-28 -left-28 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="my-10 w-full max-w-4xl text-center"
      >
        <p className="text-xl md:text-2xl text-indigo-800 font-medium tracking-wider uppercase">
          Support System
        </p>
        <h1
          className="mt-3 text-4xl md:text-6xl font-extrabold 
          bg-gradient-to-r from-gray-900 via-indigo-900 to-blue-700 
          bg-clip-text text-transparent drop-shadow-lg"
        >
          Meet Our Advisory Faculty
        </h1>

        <div
          className="mx-auto mt-6 h-1.5 w-2/3
          bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 
          rounded-full shadow-md"
        ></div>
      </motion.div>

      {/* Top Section (Left card + Description) */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-14 mt-14 w-full max-w-7xl">
        {/* Left Image Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Cards
            image="./images/Advisory/JPSIR.png"
            name="Prof. Jeebananda Panda"
            desc="Branch Counsellor"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl space-y-6 text-center lg:text-left leading-relaxed"
        >
          <p className="font-medium text-lg md:text-xl text-gray-700">
            IEEE DTU’s core purpose is to foster technological innovation and
            excellence for the benefit of humanity.
          </p>
          <p className="font-medium text-lg md:text-xl text-gray-700">
            IEEE DTU and its members inspire a global community through its
            highly cited publications, conferences, technology standards, and
            professional activities. We aim to inspire and motivate the genius,
            to blossom into a societal revolution.
          </p>
          <p className="font-medium text-lg md:text-xl text-gray-700">
            IEEE DTU will be essential to the global technical community and be
            universally recognized for the contributions of technology and
            professionals in improving global conditions.
          </p>
        </motion.div>
      </div>

      {/* Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative mt-20 w-full max-w-7xl"
      >
        {/* Decorative Blur Background */}
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-2/3 h-40 bg-gradient-to-r from-blue-200/30 via-indigo-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="transform transition duration-300 hover:shadow-2xl hover:shadow-indigo-200 rounded-2xl"
          >
            <Cards
              image="/images/Advisory/img1.jpg"
              name="Prof. Rahul Kataria"
              desc="Professor, Computer Engineering Department DTU, IEEE DTU, CS chapter faculty advisor"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="transform transition duration-300 hover:shadow-2xl hover:shadow-indigo-200 rounded-2xl"
          >
            <Cards
              image="/images/Advisory/img2.png"
              name="Prof. Rachna Garg"
              desc="Chair, IEEE Delhi Section Faculty advisor, IEEE DTU PES-IAS Student Chapter"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="transform transition duration-300 hover:shadow-2xl hover:shadow-indigo-200 rounded-2xl"
          >
            <Cards
              image="/images/Advisory/img3.jpg"
              name="Dr. Sonam Rewari"
              desc="Asst Professor, ECE Department faculty advisor, IEEE DTU WIE"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
