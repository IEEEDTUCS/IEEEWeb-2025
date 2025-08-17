import React from "react";
import { motion } from "framer-motion";
import ChapContent from "./ChapContent";

export default function Chapters() {
  const chapters = [
    {
      image: "./images/Chapters/IEEE_CS.png",
      desc: "The IEEE Computer Society is the premier source for information, inspiration, and collaboration in Computer Science and Engineering. IEEE DTU has become affiliated to the IEEE Computer Society and has established its presence in the ever-expanding world of Computer Science. IEEE DTU Computer Society has organized many flagship events like Microhacks, IEEEXtreme, Vihaan and Bulls N' Bears.",
      link: "#",
    },
    {
      image: "./images/Chapters/PES_IEE.png",
      desc: "The Power & Energy Society (PES) provides the world's largest forum for sharing latest in technological developments in the electric power industry, for developing standards that guide the development and construction of equipment and systems, and for educating members of the industry and the general public. Members of the PES are leaders in this field, and the members gain substantial benefits.",
      link: "#",
    },
    {
      image: "./images/Chapters/IEEE_WIE.png",
      desc: "Women in Engineering (WIE) is a global network of IEEE members devoted to promoting the advancement of women in science and engineering disciplines globally. The vision it holds is that of a vibrant community of women and men collectively using their diverse talents for humanity. IEEE DTU WIE has hosted impactful webinars such as Workplace Environment with Dr. Sharad Kumari.",
      link: "#",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-indigo-50 via-white to-indigo-100 rounded-4xl shadow-inner px-6 md:px-16 lg:px-24 py-20">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
          About Our Chapters
        </h1>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full origin-left"
        />
      </motion.div>

      {/* Chapters */}
      <div className="mt-16 space-y-16 w-full max-w-6xl">
        {chapters.map((ch, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <ChapContent image={ch.image} desc={ch.desc} link={ch.link} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


