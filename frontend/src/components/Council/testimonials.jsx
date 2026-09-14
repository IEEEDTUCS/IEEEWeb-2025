"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from '@/components/Council/card3d';

// Only first 2 testimonials: Ketan Shankar and Khobaib Akmal
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

function Gallery({ items, setIndex, setOpen, index }) {
  return (
    <div className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth justify-center items-stretch gap-6 py-4 px-4">
      {items.map((item, i) => (
        <CardContainer key={item.id} className="snap-center flex-shrink-0" containerClassName="py-0">
          <motion.div
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIndex(i)}
            onClick={() => { setIndex(i); setOpen(true); }}
            className="cursor-pointer"
          >
            <CardBody
              className={`bg-zinc-950/90 rounded-2xl shadow-2xl shadow-black/80 border border-zinc-800/80 hover:border-blue-500/40 overflow-hidden transition-[width,height] duration-500 ease-in-out backdrop-blur-md
                ${index === i
                  ? "w-[320px] sm:w-[600px] md:w-[850px] lg:w-[950px] h-[500px] sm:h-[560px] md:h-[620px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-center gap-8"
                  : "w-24 sm:w-28 md:w-36 h-[300px] sm:h-[360px] md:h-[420px] flex flex-col items-center justify-end"
                }`}
            >
              {index !== i ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-xl opacity-70 hover:opacity-100 transition-opacity"
                />
              ) : (
                <>
                  <CardItem translateZ={20} className="text-left order-2 md:order-1 flex-1 relative">
                    <div className="pr-3 overflow-y-auto max-h-[380px] sm:max-h-[440px] scrollbar-thin scrollbar-thumb-zinc-700">
                      <p className="text-base md:text-lg text-zinc-300 font-sans leading-relaxed whitespace-pre-line">
                        {item.description}
                      </p>
                    </div>
                  </CardItem>
                  <CardItem translateZ={20} className="flex flex-col items-center order-1 md:order-2 shrink-0">
                    <img src={item.url} alt={item.title} className="w-32 h-36 sm:w-40 sm:h-44 object-cover rounded-xl shadow-lg border border-zinc-800" />
                    <h3 className="text-lg font-heading font-bold mt-3 text-white">{item.title}</h3>
                    <p className="text-sm font-medium text-blue-400 font-nav mt-0.5">{item.designation}</p>
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
    <div className="relative bg-black py-20 pb-32 text-white overflow-hidden">
      <h3 className="text-center font-heading font-semibold text-sm md:text-base tracking-[0.25rem] text-blue-400 uppercase mb-2">
        PROUD TO PRESENT
      </h3>
      <h1 className="text-center font-heading text-4xl sm:text-5xl font-extrabold text-white mb-10">
        Testimonials
      </h1>

      <Gallery items={testimonials} index={index} setIndex={setIndex} setOpen={setOpen} />

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="overlay"
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 backdrop-blur-md px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div 
              layoutId={activeTestimonial.id}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-xl max-h-[85vh] overflow-y-auto relative text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold p-1 rounded-lg hover:bg-zinc-900 transition-colors"
              >
                ✕
              </button>
              <Image 
                src={activeTestimonial.url}
                width={150}
                height={150}
                alt={activeTestimonial.title}
                className="rounded-2xl object-cover mx-auto md:w-36 md:h-36 w-28 h-28 border border-zinc-800 shadow-lg"
              />
              <article className="mt-5 text-center"> 
                <h2 className="text-2xl font-heading font-bold text-white">
                  {activeTestimonial.title}
                </h2>
                <p className="text-sm font-semibold text-blue-400 mt-1 font-nav">
                  {activeTestimonial.designation}
                </p>
                <p className="text-base text-zinc-300 leading-relaxed py-4 font-sans text-left whitespace-pre-line border-t border-zinc-800/80 mt-4">
                  {activeTestimonial.description}
                </p>
              </article>
            </motion.div>
          </motion.div>
        )} 
      </AnimatePresence>
    </div>
  );
}
