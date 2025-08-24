import React, { useRef, useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { motion } from "framer-motion";

function useCounter(target, step, speed, start) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || count >= target) return;
    const interval = setInterval(() => {
      setCount((prev) => (prev + step > target ? target : prev + step));
    }, speed);

    return () => clearInterval(interval);
  }, [start, count, target, step, speed]);

  return count;
}

export default function AboutIEEE() {
  const ref = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStartCount(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  const years = useCounter(40, 1, 50, startCount);
  const alumni = useCounter(2500, 25, 10, startCount);

  const carouselItems = [
    { img: "./images/AboutUs/IEEE23.jpg" },
    { img: "./images/AboutUs/IMG_7113.jpg" },
    { img: "./images/AboutUs/IMG_4391.jpg" },
    { img: "./images/AboutUs/IMG_5056.jpg" },
    { img: "./images/AboutUs/IMG_7345.jpg" },
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex flex-col items-center 
                 bg-gradient-to-br from-gray-950 via-gray-900 to-black
                 px-6 md:px-16 lg:px-24 py-16
                 shadow-xl ring-1 ring-gray-800"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-300 drop-shadow-lg">
          ABOUT IEEE DTU
        </h1>
        <div className="mx-auto mt-3 h-1 w-32 bg-indigo-500/70 blur-sm rounded-full"></div>

      </motion.div>

      {/* Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Left Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="px-6 py-8 rounded-2xl ring-1 ring-gray-600 shadow-xl 
                     bg-gradient-to-br from-gray-900/70 via-indigo-950/60 to-purple-950/60 
                     backdrop-blur-xl hover:shadow-[0_0_40px_rgba(167,139,250,0.5)] 
                     transition-all"
        >
          <p className="text-base md:text-lg text-gray-200 leading-relaxed text-justify">
            <span className="font-semibold text-indigo-300">IEEE DTU Student Branch</span>, established in 1983,
            is the oldest and largest society at DTU. With a legacy of four decades, our branch has become one of
            the most vibrant student organizations fostering <span className="text-pink-300">innovation, research, and leadership</span>.
            <br /><br />
            Under the guidance of <span className="italic text-purple-300">Dr. J. Panda</span>, we organize
            impactful events including Orientation, IEEE Day, Tech Week, TROIKA, and 
            <span className="font-medium text-pink-300"> Vihaan – India’s largest student-run hackathon</span>.
            <br /><br />
            IEEE DTU hosts four specialized chapters—CS, WIE, PES-IAS, and CASS—ensuring diverse technical exposure. 
            We are also known for publications like <span className="text-indigo-200">ECHO</span>, 
            <span className="text-indigo-200"> TRIGGER</span>, and <span className="text-indigo-200">IOTA</span>.
            <br /><br />
            With strong alumni connections at Microsoft, Google and other leading companies, IEEE DTU 
            continues to empower students through mentorship and opportunities.
          </p>
        </motion.div>

        {/* Right Carousel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="flex items-center justify-center rounded-2xl shadow-xl 
                     bg-gray-900/50 backdrop-blur-xl ring-1 ring-gray-700 
                     hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all"
        >
          <Carousel
            animation="fade"
            navButtonsAlwaysVisible
            autoPlay
            interval={4000}
            indicators
            navButtonsProps={{
              style: { backgroundColor: "rgba(99,102,241,0.7)", borderRadius: "50%" },
            }}
            indicatorContainerProps={{ style: { marginTop: "12px" } }}
            indicatorIconButtonProps={{ style: { color: "rgba(199,210,254,0.4)" } }}
            activeIndicatorIconButtonProps={{ style: { color: "#a78bfa" } }}
            className="w-full md:w-[500px] lg:w-[550px] rounded-2xl overflow-hidden"
          >
            {carouselItems.map((item, idx) => (
              <img
                key={idx}
                src={item.img}
                alt={`IEEE Event ${idx + 1}`}
                className="w-full h-[400px] object-cover rounded-2xl 
                           hover:scale-105 transition-transform duration-500"
              />
            ))}
          </Carousel>
        </motion.div>

        {/* Counter Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:col-span-2 bg-gradient-to-r from-gray-950 via-gray-900 to-black
                     text-white mt-12 py-10 border-t border-b border-gray-700 flex 
                     justify-center items-center gap-16 flex-wrap"
        >
          {/* Years */}
          <div className="text-center hover:drop-shadow-[0_0_15px_#38bdf8] transition">
            <h2 className="text-6xl font-extrabold">{years}+</h2>
            <p className="text-blue-400 mt-2 tracking-wider font-semibold">YEARS OF EXISTENCE</p>
          </div>
          {/* Alumni */}
          <div className="text-center hover:drop-shadow-[0_0_15px_#38bdf8] transition">
            <h2 className="text-6xl font-extrabold">{alumni}+</h2>
            <p className="text-blue-400 mt-2 tracking-wider font-semibold">IEEE DTU ALUMNI</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
