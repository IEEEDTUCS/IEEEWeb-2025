
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Example data (replace with your real testimonials)
const testimonials = [
  {
    id: "1",
    url: "/images/Harsh_Kumar.jpg", // put your image path in public folder
    title: "Harsh Kumar",
    designation: "Batch of 2024 (Treasurer)",
    description:
      "IEEE DTU has been one of the most transformative journeys of my college life. From starting as a Core Member to taking on the role of Treasurer, every step has been a learning curve. Handling sponsorships, financial planning, and corporate relations gave me real-world exposure beyond textbooks. You get to know more about real-world panorama. Kehte hain na, seekhna band toh jeetna band—and IEEE ensured I kept learning and growing. \n Invictus DTU was another exciting chapter where I got to lead corporate partnerships and sponsorships, working with an incredible team.Whether it was late- night Yapp meetings or pulling off large - scale events, every moment was worth it. More than anything, it gave me a strong network of mentors, friends, and juniors who made this journey unforgettable.Yahan sirf society nahi, ek solid family milti hai! To all juniors: grab every opportunity, make a Yaadgaar college journey for you.",
  },
  {
    id: "2",
    url: "/images/Ansh_Anurag.jpg",
    title: "Ansh Anurag",
    designation: "Batch of 2024 (Chairperson)",
    description: "Taking on the role of Chairperson at IEEE DTU has been nothing short of a rollercoaster ride—one filled with brainstorms, crazy deadlines, and, of course, some unforgettable wins! From doubling our student membership to executing North India's largest hackathon (with 1300+ brilliant minds coming together!), every step has been about pushing boundaries and making things bigger, better, and bolder. Vihaan007 was more than just an event; it was proof of what passionate collaboration can achieve.Initiatives like WIEvek, Bootstrap, and Tinkercase weren't just ideas on paper—they turned into platforms that brought people together, created impact, and, most importantly, gave students the confidence to dream bigger.Shoutout to the incredible team that made it all happen! Without them, this journey wouldn’t have been that amazing.And to all the future IEEE leaders—bhaiyo aur behno, keep the fire alive because the best is yet to come!",
  },
  {
    id: "3",
    url: "/images/Sidakpreet_Singh.jpg",
    title: "Sidakpreet Singh",
    designation: "Batch of 2024 (Chairperson PES IEEE DTU)",
    description: "For me IEEE has always been more than just an organisation—it’s a movement, a community of passionate individuals who believe in pushing the boundaries of technology and innovation. Being a part of this incredible network has shown me the power of collective effort, where every small initiative counts. As the Chairperson of PES- IEEE DTU, I had the privilege of witnessing this firsthand.It wasn’t just about leading; it was about creating opportunities, fostering a culture of learning, and ensuring that every student who walked through our doors found a space to grow.It was a step - by - step growth from conducting SIG’s to bringing industry experts to our platform, every initiative was driven by the goal of empowering the next generation of engineers.But beyond the projects and events, what truly made this journey special were the people—the ones who stood by each other during any kind of situation, who celebrated small victories together, and who reminded me every day why IEEE was a cherishable part of my journey in DTU.",
  },
  {
    id: "4",
    url: "/images/Shreya.jpg", // put your image path in public folder
    title: "Shreya",
    designation: "Unversity of Southern California",
    description:
      "My journey with IEEE started in 2013 and I have been a part of IEEE for four years up until I graduated. I dabbled with a lot of things in IEEE such as programming, website designing, LFRs, Mac- Bots, publications, corporate affairs and so on.That's where I found my calling and built a career around it. Through IEEE I learnt a lot of things such as how to talk to people. I met the best set of people including seniors who inspired and guided me, my batchmates who stood with me, and juniors who looked up to me. I gained a lot of technical experience from working on IEEE projects such asTroika and other fests.But more than that, I gained friends. I gained a way to talk to people, give interviews, ask questions and make contacts, which that is something that takes you a long way in life, and IEEE was a major contributing factor in everything. I am where I am because of all my experiences as an IEEE member, being with my friends and coworkers.I really hope that a few years down the line, you all will be the ones encouraging more juniors with your journey as an IEEE member.",
  },
  
];

import { CardContainer, CardBody, CardItem } from '@/components/Council/Card3D'; // adjust path

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
                  ? "w-[320px] sm:w-[600px] md:w-[850px] lg:w-[950px] h-[500px] sm:h-[560px] md:h-[620px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-center gap-8"
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
    <CardItem translateZ={20} className="text-left order-2 md:order-1 flex-1 relative">
      <div className="pr-3">
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
    <div className="relative py-20 mb-10">
      <h3 className="text-center font-heading font-bold text-lg uppercase mb-0" style={{
    fontweight: 600,
    fontSize: "1rem",    
    letterSpacing: "0.25rem",
        color: "#70a6e3",
        margin: 0,
        padding: 0,
  }}>PROUD TO PRESENT</h3>
      <h1
        className="text-center font-heading mb-8 text-5xl leading-[1.255] font-sans font-bold my-6 mt-0"
        style={{ color: "#000000" }}
      >
        Testimonials
      </h1>
      {/* <h2 className="text-center text-3xl font-bold my-6">Testimonials</h2> */}

      <Gallery items={testimonials} index={index} setIndex={setIndex} setOpen={setOpen} />

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
