
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Example data (replace with your real testimonials)
const testimonials = [
  {
    id: "1",
    url: "/images/Ketan_Shankar.jpg",
    title: "Ketan Shankar",
    designation: "Batch of 2026 (Vice Chairperson)",
    description:
      "IEEE DTU has been much more than just a student chapter for me, it has been one of the defining parts of my college journey. Some of my fondest memories were made while planning events, navigating last-minute challenges, brainstorming ideas, and making countless memories along the way with an incredible group of people. Every experience pushed me to grow, not just as an engineering student, but as an individual.\n\nWhat I cherish the most is the community that IEEE DTU fostered. It introduced me to some of the finest seniors I could have asked for, peers I feel incredibly fortunate to have learned alongside, and juniors I'll always be grateful for. It gave me the confidence to take initiative, embrace responsibility, and learn from both successes and setbacks.\n\nIf there's one thing I'd say to anyone at DTU, it's this: if you're looking for a place to truly grow, both as a person and as a professional, I don't think there's a better place than IEEE DTU. And I say that not out of bias, but because I've experienced firsthand the kind of opportunities, friendships, and sense of belonging this community offers.\n\nLooking back, I feel incredibly fortunate to have been a part of this journey, and I know the lessons, memories, and people of IEEE DTU will stay with me for years to come.",
  },
  {
    id: "2",
    url: "/images/Khobaib_Akmal.jpg",
    title: "Khobaib Akmal",
    designation: "Batch of 2026 (Treasurer)",
    description:
      "In your college life, there will come a moment where you get the chance to join IEEE. You must. That's a canon event.\n\nI couldn't really say that I was convinced that I should join a paid society. I was told to do it by my hostel roommate and I'm glad he told me. He moved on from IEEE in two years, I stuck around and ended up becoming Treasurer.\n\nOnce I was afraid of talking. However, as time went on and I developed these skills, I was given the opportunity to manage several events and even to represent DTU's Technical Council to the dignitaries and external attendees. These moments definitely reshape and develop you to be a better self.\n\nMy seniors and peers put their faith in me without ever trying to barge in. They made me feel better on my back foot because of their point of view. And my juniors, they've been my biggest source of motivation. I can still recall those OAT meetings that happened prior to each fest. They all showed up. For us, for IEEE.\n\nI take away a lot of memories, many deep connections and a better method on how to speak, stand up to and cooperate as a team, and as I learnt, \"Control the controllables\".\n\nThis side, Khobaib Akmal, KBN, IEEE.",
  },
];

import { CardContainer, CardBody, CardItem } from '@/components/Council/card3d';

function Gallery({ items, setIndex, setOpen, index }) {
  return (
    <div className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth justify-center items-stretch gap-4 py-4 px-4">
      {items.map((item, i) => (
        <CardContainer key={item.id} className="snap-center flex-shrink-0" containerClassName="py-0">
          <motion.div
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIndex(i)}
            onClick={() => { setIndex(i); setOpen(true); }}
            className="cursor-pointer"
          >
            <CardBody
              className={`bg-white rounded-2xl shadow-lg shadow-black/20 border border-neutral-200 overflow-hidden transition-[width,height] duration-500 ease-in-out
                ${index === i
                  ? "w-[320px] sm:w-[600px] md:w-[850px] lg:w-[950px] h-auto min-h-[500px] sm:min-h-[560px] md:min-h-[620px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-center gap-8"
                  : "w-16 sm:w-20 md:w-28 h-[280px] sm:h-[340px] md:h-[400px] flex flex-col items-center justify-end"
                }`}
            >
              {index !== i ? (
  // collapsed: photo fills the whole card now, not a small padded thumbnail
<img
    src={item.url}
    alt={item.title}
    className="w-full h-full object-cover"
  />
) : (
  <>
    <CardItem translateZ={20} className="text-left order-2 md:order-1 flex-1 relative w-full">
      <div className="pr-3 max-h-[70vh] overflow-y-auto scrollbar-hide">
        <p className="text-base md:text-lg text-neutral-700 font-serif leading-relaxed whitespace-pre-line">
          {item.description}
        </p>
      </div>
    </CardItem>
    <CardItem translateZ={20} className="flex flex-col items-center order-1 md:order-2 shrink-0">
      <img src={item.url} alt={item.title} className="w-32 h-36 sm:w-40 sm:h-44 object-cover rounded-xl shadow-md" />
      <h3 className="text-lg font-semibold mt-3 text-neutral-800">{item.title}</h3>
      <p className="text-sm text-neutral-500">{item.designation}</p>
    </CardItem>
  </>
)}
            </CardBody>
          </motion.div>
        </CardContainer>
      ))}
    </div>
  );
}
 
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const activeIndex = Math.min(Math.max(index, 0), testimonials.length - 1);
  const activeTestimonial = testimonials[activeIndex];

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="relative py-20 mb-10 overflow-hidden bg-gradient-to-b from-[#f5f7fb] via-white to-[#eef2f9]">
      {/* subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(112,166,227,0.10) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse at 50% 0%, black 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 0%, black 35%, transparent 80%)",
        }}
      />
      <h3 className="relative text-center font-heading font-bold text-lg uppercase mb-0" style={{
    fontweight: 600,
    fontSize: "1rem",    
    letterSpacing: "0.25rem",
        color: "#70a6e3",
        margin: 0,
        padding: 0,
  }}>PROUD TO PRESENT</h3>
      <h1
        className="relative text-center font-heading mb-8 text-5xl leading-[1.255] font-sans font-bold my-6 mt-0"
        style={{ color: "#000000" }}
      >
        Testimonials
      </h1>
      {/* <h2 className="text-center text-3xl font-bold my-6">Testimonials</h2> */}

      <div className="relative z-10">
        <Gallery items={testimonials} index={index} setIndex={setIndex} setOpen={setOpen} />
      </div>

      <AnimatePresence>
        {open && (
        
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="overlay"
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm px-2"
            onClick={() => setOpen(false)}
          >
         <motion.div 
              layoutId={activeTestimonial.id}
              className="bg-white rounded-xl shadow-lg p-4 w-auto /12 max-w-xl max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
              >
                ✕
              </motion.button>
             <Image 
                src={activeTestimonial.url}
                width={150}
                height={150}
                alt={activeTestimonial.title}
                className="rounded-full  object-cover mx-auto md:w-40 md:h-40 w-24 h-24"
              />
              <article className="p-2 mt-4 text-center"> 
                <motion.h1 
                  initial={{ scaleY: 0.2 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="text-xl font-semibold font-[montserrat-semibold] "
                >
                   {activeTestimonial.title}
                 </motion.h1>
                 <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="text-xl md:text-base leading-relaxed py-2 font-serif "
                  style={{ color: "#555555" }}
                >
                  {activeTestimonial.description}
                 </motion.p>
             </article>
             </motion.div>
          </motion.div>
         )} 
      </AnimatePresence>
    </div>
  );
}
